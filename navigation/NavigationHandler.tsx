import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import NavBar from './NavBar'
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, BackHandler, Alert, FlatList, LayoutAnimation, Platform, UIManager } from 'react-native'
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MoodLog from '../screens/MoodLog';
import Settings from '../screens/Settings'
import AudioPlayer from "../screens/AudioPlayer"
import CustomElementStyles from '../constants/CustomElementStyles';
import DailyMood from '../screens/DailyMood'

const getJSONData = async (storageKey: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(storageKey)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(`Data read error: ${e}`)
    }
}
interface IProps {

}
interface IState {
    activeTabIdx: Number;
    activityDaysInRow: Number;
    currentScreen: JSX.Element | null;
    backBtn: JSX.Element;
    tabHistory: any;
    navBarVisible: boolean;
    activeMoodLog: boolean;
    moodLog: JSX.Element;
    activeSettings: boolean;
    activeCourse: boolean;
    activeAudio: Array<any>;
    activeDailyMood: boolean;
}

function Icon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string }) {
    return <Feather size={30} style={{ marginTop: 8, marginRight: 0 }}{...props} />;
}



export default class NavigationHandler extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeTabIdx: 0,
            activityDaysInRow: 69, //TODO: check from app memory/load, and increment idx on audio play on each day 
            currentScreen: null,
            moodLog: <View />,
            backBtn: <View />,
            tabHistory: [0],
            navBarVisible: true,
            activeMoodLog: false,
            activeSettings: false,
            activeCourse: false,
            activeDailyMood: false,
            activeAudio: [],
        };
        this.changeTabIdx = this.changeTabIdx.bind(this)
        this.toggleNavBar = this.toggleNavBar.bind(this)

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    checkDay = () => {
        const date = new Date();
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        let lastDay;
        AsyncStorage.getItem("LastDayOpen").then((res) => {
            lastDay = Number(res);
            if (lastDay !== dayOfYear) {
                this.toggleNavBar("TOGGLE_DAILY_MOOD")
            }
        })
    }



    toggleNavBar = (e?: any, audioPath?: Array<any>) => {
        if (e === "TOGGLE_MOOD_LOG") {
            this.setState({ activeMoodLog: true })
            let foo: any = [];
            getJSONData("moodWholeData").then((res) => {
                const tmp = res;
                foo = Object.values(tmp);
                if ((typeof foo[0]) === undefined) {
                    this.setState({ moodLog: <Text>No activity</Text> });
                    // TO-DO: Dodać wiadomość gdy nie ma historii (co nie powinno się wydarzyć tho XD)
                } else {
                    this.setState({
                        moodLog: <FlatList
                            data={foo}
                            renderItem={MoodLog}
                            keyExtractor={(item) => item[2].fulldate}
                        />
                    });
                }
            })
        }
        if (e === "TOGGLE_COURSE") {
            this.setState({ activeCourse: true })
            this.setState({ activeAudio: audioPath })
        }
        if (e === "TOGGLE_DAILY_MOOD") {
            this.setState({ activeDailyMood: true })
        }
        if (e !== "TOGGLE_SETTINGS") {
            this.setState({ navBarVisible: !this.state.navBarVisible }, () => {
                if (!this.state.navBarVisible) {
                    this.setState({
                        backBtn:
                            <TouchableOpacity onPress={(e) => this.toggleNavBar()}>
                                <Icon name="arrow-left" color={Colors.white} style={{ marginTop: 20, marginRight: 6 }} />
                            </TouchableOpacity>
                    })
                } else {
                    this.setState({ activeMoodLog: false })
                    this.setState({ activeSettings: false })
                    this.setState({ activeCourse: false })
                    this.setState({ activeDailyMood: false })
                    this.setState({ backBtn: <View /> })
                }
            })
        } else {
            if (!this.state.activeSettings) {
                this.setState({
                    backBtn:
                        <TouchableOpacity onPress={(e) => this.toggleNavBar()}>
                            <Icon name="arrow-left" color={Colors.white} style={{ marginTop: 20, marginRight: 6 }} />
                        </TouchableOpacity>
                })
                this.setState({ activeMoodLog: false })
                this.setState({ activeSettings: true })
                this.setState({ navBarVisible: false })
                this.setState({ activeCourse: false })
                this.setState({ activeDailyMood: false })
            } else {
                this.setState({ activeSettings: false })
                this.setState({ activeMoodLog: false })
                this.setState({ navBarVisible: true })
                this.setState({ activeDailyMood: false })
                this.setState({ activeCourse: false })
                this.setState({ backBtn: <View /> })
            }

        }
    }

    changeTabIdx = (idx: number) => {
        const screens = [
            <TabOneScreen tabView={this.state.navBarVisible} toggleNavBar={this.toggleNavBar} changeTab={this.changeTabIdx} />,
            <TabTwoScreen tabView={this.state.navBarVisible} active={this.state.activeTabIdx} toggleNavBar={this.toggleNavBar} />,
            <TabThreeScreen tabView={this.state.navBarVisible} toggleNavBar={this.toggleNavBar} />,
            // <TabFourScreen tabView={this.state.navBarVisible} />
        ]
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ activeTabIdx: idx, currentScreen: screens[idx] },
            () => {
                const oldHistory = this.state.tabHistory;
                const newHistory = this.state.activeTabIdx;
                oldHistory.unshift(newHistory);
                const combinedHistory = oldHistory;
                if (combinedHistory.length > 25) {
                    combinedHistory.pop()
                };
                this.setState({ tabHistory: combinedHistory });
            });
    }

    backAction = () => {
        const screens = [
            <TabOneScreen tabView={this.state.navBarVisible} toggleNavBar={this.toggleNavBar} changeTab={this.changeTabIdx} />,
            <TabTwoScreen active={this.state.activeTabIdx} toggleNavBar={this.toggleNavBar} />,
            <TabThreeScreen toggleNavBar={this.toggleNavBar} />,
            // <TabFourScreen />
        ]

        if (this.state.activeSettings) {
            this.toggleNavBar("TOGGLE_SETTINGS")
            return true
        }

        if (!this.state.navBarVisible) {
            this.toggleNavBar();
        } else {
            if (this.state.tabHistory.length === 1) {
                Alert.alert("Hej!", "Czy na pewno kończymy na dziś?", [
                    {
                        text: "Nie",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "TAK", onPress: () => BackHandler.exitApp() }
                ]);
            } else {
                const tmp = this.state.tabHistory;
                tmp.shift();
                this.setState({ tabHistory: tmp },
                    () => {
                        this.setState({ activeTabIdx: this.state.tabHistory[0], currentScreen: screens[this.state.tabHistory[0]] })
                    });
            }
        }


        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        this.checkDay();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    returnScreen(e) {
        if (e === null) {
            return (<TabOneScreen
                tabView={this.state.navBarVisible} toggleNavBar={this.toggleNavBar}
                changeTab={this.changeTabIdx}
            />);
        } else {
            return e;
        }
    }

    render() {
        return (
            <View>
                {/* <Text style={{ position: "absolute", opacity: 0 }}>{this.state.navBarVisible}</Text> */}
                <View style={styles.background}>
                    <View style={styles.appHeaderBar}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <View style={styles.flexTopBar}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    {this.state.backBtn}
                                    <Text style={CustomElementStyles.appHeaderText}>tchnienie</Text>
                                </View>
                                <View>
                                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginTop: 2 }}>
                                        <Text
                                            style={{ marginTop: 12, marginRight: 14, fontSize: 15, color: Colors.white, fontFamily: "Poppins_500Medium" }}>
                                            🔥 {this.state.activityDaysInRow} dni
                                    </Text>
                                        <TouchableOpacity onPress={() => this.toggleNavBar("TOGGLE_SETTINGS")}>
                                            <Icon name="settings" color={Colors.whiteOff} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.screenContainer}>
                        <LinearGradient
                            colors={[Colors.backgroundColor, "transparent"]}
                            style={{ zIndex: 998, position: "absolute", top: 0, width: "100%", height: 10 }}
                        />
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            {this.returnScreen(this.state.currentScreen)}
                        </ScrollView>

                        <View style={[styles.hiddenScreen, { height: this.state.activeMoodLog ? "100%" : "0%", }]}>
                            {this.state.moodLog}
                        </View>
                        <View style={[styles.hiddenScreen, { height: this.state.activeSettings ? "100%" : "0%", }]}>
                            <Settings />
                        </View>
                        <View style={[styles.hiddenScreen, {
                            height: this.state.activeDailyMood ? "100%" : "0%",
                            zIndex: this.state.activeDailyMood ? 997 : -999,
                            opacity: this.state.activeDailyMood ? 1 : 0
                        }]}>
                            <DailyMood toggleNavBar={this.toggleNavBar} />
                        </View>
                        <View style={{ height: this.state.activeCourse ? "100%" : "0%", backgroundColor: Colors.backgroundColor, width: "100%", zIndex: 101, position: "absolute", bottom: 0, maxHeight: "100%", maxWidth: "100%" }}>
                            <AudioPlayer activeAudio={this.state.activeAudio} />
                        </View>
                    </View>
                    <LinearGradient
                        colors={["transparent", Colors.backgroundColor]}
                        style={{ zIndex: 998, position: "absolute", bottom: 0, width: "100%", height: 35 }}
                    />
                </View >
                <NavBar visible={this.state.navBarVisible} changeTabIdx={this.changeTabIdx} activeIdx={this.state.activeTabIdx} />
            </View >
        );
    }
}


const styles = StyleSheet.create({
    hiddenScreen: {
        position: "absolute",
        width: "100%",
        maxWidth: "100%",
        zIndex: 997,
        maxHeight: "100%",
        bottom: 0,
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: Colors.backgroundColor
    },
    appHeaderText: {
        fontFamily: "Pacifico_400Regular",
        fontSize: 32,
        color: Colors.white,
        letterSpacing: 2,
    },
    appHeaderBar: {
        width: "100%",
        paddingVertical: 7,
        height: 75,
        justifyContent: "space-between",
    },
    flexTopBar: {
        flex: 1,
        height: 32,
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    background: {
        paddingTop: 18,
        height: "100%",
        width: "100%",
        // paddingHorizontal: 20,
        backgroundColor: Colors.backgroundColor,
        // flex: 1,
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center"
    },
    screenContainer: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "rgba(255,255,255,.2)",
        marginTop: -7.5,
        // paddingTop: 8,
    }
});

