import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabFourScreen from '../screens/TabFourScreen';
import NavBar from './NavBar'
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, BackHandler, Alert } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Fontisto } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import BasicContainer from '../components/BasicContainer'
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';

interface IProps {

}
interface IState {
    activeTabIdx: Number;
    activityDaysInRow: Number;
    currentScreen: JSX.Element;
    tabHistory: any
}

function Icon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string }) {
    return <Feather size={30} style={{ marginTop: 8, marginRight: 0 }}{...props} />;
}

export default class NavigationHandler extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeTabIdx: 0,
            activityDaysInRow: 2,
            currentScreen: <TabOneScreen />,
            tabHistory: [0],
        };
        this.changeTabIdx = this.changeTabIdx.bind(this)
    }

    changeTabIdx = (idx: number) => {
        const screens = [<TabOneScreen />, <TabTwoScreen />, <TabThreeScreen />, <TabFourScreen />]
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
        const screens = [<TabOneScreen />, <TabTwoScreen />, <TabThreeScreen />, <TabFourScreen />]
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

        return true;
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    render() {
        return (
            <View>
                <View style={styles.background}>
                    <View style={styles.appHeaderBar}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <View style={styles.flexTopBar}>
                                <Text style={styles.appHeaderText}>tchnienie</Text>
                                <View>
                                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginTop: 2 }}>
                                        <Text
                                            style={{ marginTop: 12, marginRight: 14, fontSize: 15, color: Colors.white, fontFamily: "Poppins_500Medium" }}>
                                            🔥 {this.state.activityDaysInRow} dni
                                    </Text>
                                        <TouchableOpacity>
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
                            {this.state.currentScreen}
                        </ScrollView>
                    </View>
                    <LinearGradient
                        colors={["transparent", Colors.backgroundColor]}
                        style={{ zIndex: 998, position: "absolute", bottom: 0, width: "100%", height: 35 }}
                    />
                </View >
                <NavBar visible={true} changeTabIdx={this.changeTabIdx} activeIdx={this.state.activeTabIdx} />
            </View >
        );
    }
}


const styles = StyleSheet.create({
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

