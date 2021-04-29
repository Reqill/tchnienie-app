import * as React from 'react'
import { useState, useEffect } from 'react'
import CustomElementStyles from '../constants/CustomElementStyles';
import { Text, View, Image, TouchableOpacity, Alert, Button } from 'react-native'
import Colors from "../constants/Colors"
import AsyncStorage from '@react-native-async-storage/async-storage';
import CourseList from '../constants/CourseList'
import MusicList from '../constants/MusicList'

const courseDataBlank = {
    isWatched: false,
    isLiked: false,
    isCompleted: false,
    isActive: false,
    watchedEpisodes: 0,
}
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

const blankMusicData = () => {
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

export default function Settings() {
    return (
        <View>
            <Text>Ustawienia</Text>
            <Button title={"Reset Kurs 1"} onPress={() => storeJSON(`course-${CourseList[0].name}-${CourseList[0].id}`, courseDataBlank)} />
            <Button title={"Reset Kurs 2"} onPress={() => storeJSON(`course-${CourseList[1].name}-${CourseList[1].id}`, courseDataBlank)} />
            <Button title={"Reset Kurs 3"} onPress={() => storeJSON(`course-${CourseList[2].name}-${CourseList[2].id}`, courseDataBlank)} />
            <Button title={"Reset Kurs 4"} onPress={() => storeJSON(`course-${CourseList[3].name}-${CourseList[3].id}`, courseDataBlank)} />
            <Button title={"Reset Music"} onPress={() => blankMusicData()} />
            <Button title={"Reset Mood Log"} onPress={() => storeJSON(`moodWholeData`, moodDataBlank)} />
            <Button title={"Reset Streak Log"} onPress={() => storeJSON(`dailyStreakSeries`, streakDataBlank)} />
        </View>
    );
}

