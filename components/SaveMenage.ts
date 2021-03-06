import * as React from 'react'
import EmotionName from '../constants/EmotionName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dateNames from "../constants/CalendarNames"

export const getCurrDate = (moodIdx?: number) => {
    const date = new Date();
    // const hour = date.getHours();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dayofWeek = date.getDay();
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const week = Math.floor(dayOfYear / 7);

    const output = {
        fulldate: `${day}/${month}/${year}`,
        day: day,
        month: month,
        monthNameFull: dateNames.monthNameFull[month - 1],
        monthNameShort: dateNames.monthNameShort[month - 1],
        year: year,
        dayOfYear: dayOfYear,
        week: week,
        dayofWeek: dayofWeek,
        dayOfWeekNameFull: dateNames.dayNameFull[dayofWeek],
        dayOfWeekNameShort: dateNames.dayNameShort[dayofWeek],
    }
    return output;
}

export const saveCurrMood = (moodIdx: number) => {
    const now = getCurrDate();
    const todayMoodInfo = {
        moodIdx: moodIdx,
        moodName: EmotionName[moodIdx],
        dayInfo: now,
    }
    const moodKey = `moodWholeData`;
    getJSONData(moodKey).then((response) => {
        const newMoodWhole = response;
        // console.log(response)
        if (newMoodWhole === null) {
            storeJSONData(moodKey, [Object.values(todayMoodInfo)]);
        } else {
            const tmp = Object.values(newMoodWhole);
            const boo = Object.values(todayMoodInfo);
            const foo = tmp.shift();
            if (
                foo[2].dayOfYear === todayMoodInfo.dayInfo.dayOfYear
                && foo[2].year === todayMoodInfo.dayInfo.year
            ) {
                tmp.unshift(boo);
                // console.log(tmp)
                storeJSONData(moodKey, tmp)
            }
            else {
                tmp.unshift(foo);
                tmp.unshift(boo);
                // console.log(tmp)
                storeJSONData(moodKey, tmp)
            }
        }
    });
}


const storeVariableData = async (storageKey: string, value: string | boolean | number) => {
    try {
        await AsyncStorage.setItem(storageKey, value)
    } catch (e) {
        console.log(`Data save error: ${e}`)
    }
}

const storeJSONData = async (storageKey: string, value: JSON | Array<any>) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(storageKey, jsonValue)
    } catch (e) {
        console.log(`Data save error: ${e}`)
    }
}

const getVariableData = async (storageKey: string) => {
    try {
        const value = await AsyncStorage.getItem(storageKey)
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log(`Data read error: ${e}`)
    }
}

const getJSONData = async (storageKey: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(storageKey)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(`Data read error: ${e}`)
    }
}
