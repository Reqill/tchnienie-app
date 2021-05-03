import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Touchable, LayoutAnimation, Platform, UIManager, Image, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CourseList from '../constants/CourseList'
import MusicList from '../constants/MusicList'
import Colors from '../constants/Colors';
import CustomElementStyles from '../constants/CustomElementStyles';
import NavigationHandler from '../navigation/NavigationHandler'


export default function FirstLaunch() {
    const [currentScreen, setCurrentScreen] = useState(0);

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const handleClick = (actionName: string) => {
        if (actionName === "NEXT") {
            setCurrentScreen((currentScreen === 3) ? 3 : (currentScreen + 1))
        } else if (actionName === "PREV") {
            setCurrentScreen((currentScreen === 0) ? 0 : (currentScreen - 1))
        }
    }
    const getImage = (screen: number) => {
        if (screen === 0) {
            return <Image source={require("../assets/images/introduction-1.png")} style={{ width: "85%", resizeMode: "contain" }} />
        }
        if (screen === 1) {
            return <Image source={require("../assets/images/introduction-2.png")} style={{ width: "85%", resizeMode: "contain" }} />
        }
        if (screen === 2) {
            return <Image source={require("../assets/images/introduction-3.png")} style={{ width: "85%", resizeMode: "contain" }} />
        }
        return <Text>You really shoulnd't be able to see this.</Text>;
    }
    const getRestContent = (screen: number) => {
        if (screen === 0) {
            return (
                <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
                    <Text style={CustomElementStyles.introductionHeader}>
                        Zacznij medytować
                    </Text>
                    <Text style={CustomElementStyles.introductionText}>
                        Aplikacja posiada do zaoferowania kilkanaście kursów medytacji prowadzonych.
                        Kursy podzielone są na różne poziomy, abyś mógł wygodnie rozpocząć swoją przygodę z medytacją.
                        Celem jest umożliwienie Ci samodzielnej medytacji po ukończeniu kursów.
                    </Text>
                </View>
            );
        }
        if (screen === 1) {
            return (
                <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
                    <Text style={CustomElementStyles.introductionHeader}>
                        Stwórz nawyk
                    </Text>
                    <Text style={CustomElementStyles.introductionText}>
                        Aplikacja śledzi twój postęp. Twoja seria medytacji pojawi się z ikonką 🔥 przy nazwie aplikacji,
                        już w 3 dzień korzystania z niej z rzędu! Licznik może rosnąć w nieskończoność,
                        aby pomóć Ci w regularnym medytowaniu.
                    </Text>
                </View>
            );
        }
        if (screen === 2) {
            return (
                <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
                    <Text style={CustomElementStyles.introductionHeader}>
                        Medytuj samodzielnie
                    </Text>
                    <Text style={CustomElementStyles.introductionText}>
                        W aplikacji znajdziesz gamę utworów, które mogą posłużyć Ci jako podkład do medytacji.
                        Utwory będą ciągle odtwarzane, nawet po wyłączeniu ekranu.
                        Więc nie czekaj i znajdź utwór odpowiadający Twojemu nastrojowi i rozpocznij medytację.
                    </Text>
                </View>
            );
        }
        return <Text>You really shoulnd't be able to see this.</Text>
    }

    if (currentScreen === 3) {
        return (
            <NavigationHandler />
        );
    } else {
        return (
            <View style={{ width: "100%", maxHeight: "100%", height: "100%", backgroundColor: Colors.backgroundColor, flex: 1, alignItems: "center" }}>
                <Text style={[CustomElementStyles.appHeaderText, { position: "absolute", top: 18, left: "5%" }]}>tchnienie</Text>
                <View style={{ flex: 1, flexDirection: "row", width: 50, justifyContent: "space-around", position: "absolute", bottom: 75, alignItems: "center", opacity: (currentScreen < 3) ? 1 : 0 }}>
                    <View style={[
                        CustomElementStyles.dotInactive, {
                            backgroundColor: (currentScreen === 0) ? Colors.tintColor : Colors.other
                        }]}
                    />
                    <View style={[
                        CustomElementStyles.dotInactive, {
                            backgroundColor: (currentScreen === 1) ? Colors.tintColor : Colors.other
                        }]}
                    />
                    <View style={[
                        CustomElementStyles.dotInactive, {
                            backgroundColor: (currentScreen === 2) ? Colors.tintColor : Colors.other
                        }]}
                    />
                </View>

                <View style={{ flex: 1, flexDirection: "column", alignItems: "center", width: "100%", marginTop: "-110%" }}>
                    <View style={{
                        maxWidth: "100%", width: "100%", flex: 1, alignItems: "center"
                    }}>
                        {getImage(currentScreen)}
                    </View>
                    <View style={{
                        maxWidth: "100%", width: "100%", flex: 1, alignItems: "center", marginTop: "120%"
                    }}>
                        {getRestContent(currentScreen)}
                    </View>
                </View>


                <View style={{ width: "80%", flex: 1, flexDirection: "row", justifyContent: "space-between", position: "absolute", bottom: 30 }}>
                    <TouchableOpacity onPress={() => handleClick("PREV")} activeOpacity={.5}>
                        <View style={{ height: (currentScreen > 2) ? 0 : null, flex: 1, flexWrap: "nowrap", flexDirection: "row" }}>
                            <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 18, color: Colors.white, letterSpacing: .2, opacity: (currentScreen > 2) ? 0 : 1 }}>
                                {(currentScreen !== 0) ? "Wróć" : null}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleClick("NEXT")} activeOpacity={.5}>
                        <View style={{ height: (currentScreen > 2) ? 0 : null, flex: 1, flexWrap: "nowrap", flexDirection: "row" }}>
                            <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 18, color: Colors.tintColor, letterSpacing: .2, opacity: (currentScreen > 2) ? 0 : 1 }}>
                                {(currentScreen === 2) ? "Zaczynajmy!" : "Dalej"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}

const storeJSON = async (storageKey: string, value: JSON | Array<any>) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(storageKey, jsonValue)
    } catch (e) {
        console.log(`Course data save error: ${e}`)
    }
}

const FirstIntroduction = () => {

}

const hardReset = () => {

    const courseDataBlank = {
        isWatched: false,
        isLiked: false,
        isCompleted: false,
        isActive: false,
        watchedEpisodes: 0,
    }

    const musicDataBlank = {
        isWatched: false,
        isLiked: false,
    }

    const moodDataBlank = null;
    const streakDataBlank = null;

    storeJSON(`course-${CourseList[0].name}-${CourseList[0].id}`, courseDataBlank);
    storeJSON(`course-${CourseList[1].name}-${CourseList[1].id}`, courseDataBlank);
    storeJSON(`course-${CourseList[2].name}-${CourseList[2].id}`, courseDataBlank);
    storeJSON(`course-${CourseList[3].name}-${CourseList[3].id}`, courseDataBlank);

    storeJSON(`moodWholeData`, moodDataBlank);
    storeJSON(`dailyStreakSeries`, streakDataBlank);

    storeJSON(`music-${MusicList[0].title}-${MusicList[0].id}`, musicDataBlank);
    storeJSON(`music-${MusicList[1].title}-${MusicList[1].id}`, musicDataBlank);
    storeJSON(`music-${MusicList[2].title}-${MusicList[2].id}`, musicDataBlank);
    storeJSON(`music-${MusicList[3].title}-${MusicList[3].id}`, musicDataBlank);
    storeJSON(`music-${MusicList[4].title}-${MusicList[4].id}`, musicDataBlank);
    storeJSON(`music-${MusicList[5].title}-${MusicList[5].id}`, musicDataBlank);
    storeJSON(`music-${MusicList[6].title}-${MusicList[6].id}`, musicDataBlank);
}
