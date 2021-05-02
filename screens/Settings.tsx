import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import CustomElementStyles from '../constants/CustomElementStyles';
import { Text, View, Image, TouchableOpacity, Alert, Button, Touchable } from 'react-native'
import Colors from "../constants/Colors"
import AsyncStorage from '@react-native-async-storage/async-storage';
import CourseList from '../constants/CourseList'
import MusicList from '../constants/MusicList'
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';


const moodDataBlank = null;
const streakDataBlank = null;

const storeJSON = async (storageKey: string, value: JSON | Array<any>) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(storageKey, jsonValue)
    } catch (e) {
        console.log(`Course data save error: ${e}`)
    }
}

export default function Settings() {

    const wipeCourseData = () => {
        const courseDataBlank = {
            isWatched: false,
            isLiked: false,
            isCompleted: false,
            isActive: false,
            watchedEpisodes: 0,
        }
        storeJSON(`course-${CourseList[0].name}-${CourseList[0].id}`, courseDataBlank)
        storeJSON(`course-${CourseList[1].name}-${CourseList[1].id}`, courseDataBlank)
        storeJSON(`course-${CourseList[2].name}-${CourseList[2].id}`, courseDataBlank)
        storeJSON(`course-${CourseList[3].name}-${CourseList[3].id}`, courseDataBlank)
    }

    const wipeMusicData = () => {
        const musicDataBlank = {
            isLiked: false,
        }
        storeJSON(`music-${MusicList[0].title}-${MusicList[0].id}`, musicDataBlank);
        storeJSON(`music-${MusicList[1].title}-${MusicList[1].id}`, musicDataBlank);
        storeJSON(`music-${MusicList[2].title}-${MusicList[2].id}`, musicDataBlank);
        storeJSON(`music-${MusicList[3].title}-${MusicList[3].id}`, musicDataBlank);
        storeJSON(`music-${MusicList[4].title}-${MusicList[4].id}`, musicDataBlank);
        storeJSON(`music-${MusicList[5].title}-${MusicList[5].id}`, musicDataBlank);
        storeJSON(`music-${MusicList[6].title}-${MusicList[6].id}`, musicDataBlank);
    }

    const wipeAppData = () => {
        storeJSON(`moodWholeData`, moodDataBlank);
        storeJSON(`dailyStreakSeries`, streakDataBlank);
        wipeMusicData();
        wipeCourseData();
    }


    const reportBug = () => {
        console.log("Zgłoś błąd")
    }

    const rateApp = () => {
        console.log("Oceń aplikacje")
    }

    const fillForm = () => {
        console.log("Wypełnij ankietę")
    }

    const authorsAndProject = () => {
        console.log("Twórcy i projekt")
    }

    const partners = () => {
        console.log("Partnerzy")
    }

    return (

        <View style={{ width: "100%" }}>
            <ScrollView>
                <View style={{ marginLeft: "5%", paddingBottom: 85 }}>
                    <Text style={CustomElementStyles.settingsIndicator}>OGÓLNE</Text>
                    <SettingBar iconName="x-square" buttonText="Usuń dane o kursach" handleClick={wipeCourseData} />
                    <SettingBar iconName="x-square" buttonText="Usuń dane o muzyce" handleClick={wipeMusicData} />
                    <SettingBar iconName="x-square" buttonText="Usuń dane aplikacji" handleClick={wipeAppData} />
                    <Text style={CustomElementStyles.settingsIndicator}>DANE</Text>
                    <SettingBar iconName="x-square" buttonText="Usuń dane o kursach" handleClick={wipeCourseData} />
                    <SettingBar iconName="x-square" buttonText="Usuń dane o muzyce" handleClick={wipeMusicData} />
                    <SettingBar iconName="x-square" buttonText="Usuń dane aplikacji" handleClick={wipeAppData} />
                    <Text style={CustomElementStyles.settingsIndicator}>INNE</Text>
                    <SettingBar iconName="flag" buttonText="Zgłoś błąd" handleClick={reportBug} />
                    <SettingBar iconName="thumbs-up" buttonText="Oceń aplikacje" handleClick={rateApp} />
                    <SettingBar iconName="check-square" buttonText="Wypełnij ankietę" handleClick={fillForm} />
                    <SettingBar iconName="info" buttonText="Twórcy i projekt" handleClick={authorsAndProject} />
                    <SettingBar iconName="info" buttonText="Partnerzy" handleClick={partners} />
                </View>
            </ScrollView>
        </View>


    );
}


const SettingBar = (props: { iconName: React.ComponentProps<typeof Feather>['name'], buttonText: string, handleClick: Function }) => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => props.handleClick()}
                style={{ flex: 1, flexDirection: "row", alignItems: "center", marginBottom: 18, marginLeft: 6, marginTop: 1 }}
            >
                <Icon name={props.iconName} color={Colors.whiteOff} size={30} />
                <Text
                    style={{
                        color: Colors.whiteOff, fontSize: 17, marginTop: 3.5,
                        fontFamily: "Poppins_400Regular", marginLeft: 10
                    }}
                >
                    {props.buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

function Icon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string; size: number }) {
    return <Feather style={{ marginTop: .5 }}{...props} />;
}
