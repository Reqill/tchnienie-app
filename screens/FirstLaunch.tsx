import React, { useState, useEffect } from 'react';
import { Text } from 'react-native'
import App from "../App"
import AsyncStorage from '@react-native-async-storage/async-storage';
import CourseList from '../constants/CourseList'
import MusicList from '../constants/MusicList'

export default function FirstLaunch() {

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

    return (
        <Text>pierwsze odpalenie</Text>
    );
}

const storeJSON = async (storageKey: string, value: JSON | Array<any>) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(storageKey, jsonValue)
    } catch (e) {
        console.log(`Course data save error: ${e}`)
    }
}