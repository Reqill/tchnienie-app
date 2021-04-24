import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabFourScreen from '../screens/TabFourScreen';
import NavBar from './NavBar'
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Fontisto } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

interface IProps {

}
interface IState {
    activeTabIdx: number;
    activityDaysInRow: number;
    currentScreen?: any;
}

function Icon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string }) {
    return <Feather size={30} style={{ marginTop: 8, marginRight: 0 }}{...props} />;
}

export default class NavigationHandler extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeTabIdx: 0,
            activityDaysInRow: 0,
            currentScreen: <TabOneScreen />,
        };
        this.changeTabIdx = this.changeTabIdx.bind(this)
    }

    changeTabIdx = (idx: number) => {
        const screens = [<TabOneScreen />, <TabTwoScreen />, <TabThreeScreen />, <TabFourScreen />]
        this.setState({ activeTabIdx: idx, currentScreen: screens[idx] }, () => console.log(this.state.activeTabIdx))
    }

    render() {
        return (
            <View>
                <View style={styles.background}>
                    <View style={styles.appHeaderBar}>
                        <View style={styles.flexTopBar}>
                            <Text style={styles.appHeaderText}>tchnienie</Text>
                            <View>
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginTop: 2 }}>
                                    <Text style={{ marginTop: 12, marginRight: 14, fontSize: 15, color: Colors.white, fontFamily: "Poppins_500Medium" }}>🔥 4 dni</Text>
                                    <TouchableOpacity>
                                        <Icon name="settings" color={Colors.whiteOff} />
                                    </TouchableOpacity>
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
                <NavBar visible={true} changeTabIdx={this.changeTabIdx} />
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
        flexDirection: "row",
        justifyContent: "space-between",
    },
    background: {
        paddingTop: 18,
        height: "100%",
        width: "100%",
        paddingHorizontal: 20,
        backgroundColor: Colors.backgroundColor,
        // flex: 1,
        // flexDirection: "column", 
        // justifyContent: "center",
        // alignItems: "center"
    },
    screenContainer: {
        width: "100%",
        backgroundColor: "rgba(255,255,255,.2)",
        marginTop: -5,
        paddingTop: 8,
    }
});

