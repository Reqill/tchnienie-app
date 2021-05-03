import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, Touchable, LayoutAnimation, Platform, UIManager, Image, StyleSheet, ScrollView } from 'react-native'
import App from "../App"
import AsyncStorage from '@react-native-async-storage/async-storage';
import CourseList from '../constants/CourseList'
import MusicList from '../constants/MusicList'
import Colors from '../constants/Colors';
import CustomElementStyles from '../constants/CustomElementStyles';
import Emotion from '../constants/EmotionEmoji'
import EmotionName from '../constants/EmotionName'
import { saveCurrMood } from '../components/SaveMenage'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationHandler from '../navigation/NavigationHandler'

export default function DailyMood(props: { toggleNavBar: Function }) {
    const [activeMoodIdx, setActiveMoodIdx] = useState(null)
    const [done, setDone] = useState(false);

    const changeMoodIdx = useCallback((newidx: number) => {
        setActiveMoodIdx(newidx);
    }, [])

    const endActions = () => {
        saveCurrMood(activeMoodIdx);
        const date = new Date();
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        AsyncStorage.setItem("LastDayOpen", String(dayOfYear))
        props.toggleNavBar()
    }

    const generateFeelings = () => {
        return Emotion.map((el, i) => <EmotionCard emotionImg={el} currIdx={i} moodIdx={activeMoodIdx} key={i * 2 + "emocjaopytanieglowne"} changeMoodIdx={changeMoodIdx} />)
    }


    return (
        <View style={{ width: "100%", maxHeight: "100%", height: "100%", backgroundColor: Colors.backgroundColor, flex: 1, alignItems: "center" }}>
            {/* <Text style={[CustomElementStyles.appHeaderText, { position: "absolute", top: -2, left: "5%" }]}>tchnienie</Text> */}
            <View style={{ flex: 1, flexDirection: "column", alignItems: "center", width: "100%", marginTop: "-120%" }}>
                <View style={{
                    maxWidth: "100%", width: "100%", flex: 1, alignItems: "center"
                }}>
                    <Image source={require("../assets/images/introduction-4.png")} style={{ width: "100%", resizeMode: "contain" }} />
                </View>
                <View style={{
                    maxWidth: "100%", width: "100%", flex: 1, alignItems: "center", marginTop: "120%"
                }}>
                    <View style={{ width: "100%", flex: 1, alignItems: "center", marginTop: "20%" }}>
                        <Text style={{
                            width: "100%", textAlign: "left", fontFamily: "Poppins_600SemiBold", color: Colors.white, fontSize: 24, paddingLeft: "4%"
                        }}
                        >
                            Jak się dzisiaj czujesz?
                    </Text>
                        <View style={{ height: 110 }}>
                            <ScrollView fadingEdgeLength={30} horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={{ flex: 1, width: "100%", maxWidth: "100%", flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 8, justifyContent: "space-between" }}>
                                    {generateFeelings()}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ width: "90%", flex: 1, flexDirection: "row", justifyContent: "space-between", position: "absolute", bottom: 30 }}>
                <TouchableOpacity activeOpacity={.5}>
                    <View style={{ flex: 1, flexWrap: "nowrap", flexDirection: "row" }}>
                        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 18, color: Colors.white, letterSpacing: .2 }}>
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => endActions()} activeOpacity={.5} disabled={(activeMoodIdx === null) ? true : false}>
                    <View style={{ flex: 1, flexWrap: "nowrap", flexDirection: "row", opacity: (activeMoodIdx === null) ? .35 : 1 }}>
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 18, color: Colors.tintColor, letterSpacing: .2 }}>
                            Zapisz i kontynuuj
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const EmotionCard = (props: { emotionImg: any, changeMoodIdx: Function, moodIdx: number, currIdx: number }) => {
    if (EmotionName[props.currIdx] === "Podekstytowana/y") {
        return null;
    }
    return (
        <TouchableOpacity onPress={() => props.changeMoodIdx(props.currIdx)} style={{ margin: 7, paddingHorizontal: 3, maxWidth: 100, opacity: 1 }} activeOpacity={.7}>
            <Image source={props.emotionImg} style={{ width: 65, height: 65, alignSelf: "center", opacity: .95 }} />
            <Text style={{
                textAlign: "center", fontFamily: "Poppins_400Regular",
                color: (props.moodIdx === props.currIdx) ? Colors.tintColor : Colors.whiteOff, fontSize: 12, marginTop: 5
            }}
            >
                {EmotionName[props.currIdx]}
            </Text>
        </TouchableOpacity>
    );
}