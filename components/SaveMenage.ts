import * as React from 'react'
import EmotionName from '../constants/EmotionName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dateNames from "../constants/CalendarNames"

export const getCurrDate = (moodIdx?: number) => {
    const date = new Date();
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
        fulldate: `${day}-${month}-${year}`,
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
    };
    // const dayKey = `${now.day}/${now.month}/${now.year}`;
    // const weekKey = `${now.week}/${now.year}`;
    // getJSONData(weekKey).then((e) => {

    // });
    const moodKey = `moodWholeData`;
    getJSONData(moodKey).then((response) => {
        // const newMoodWhole: Array<any> = [];
        const newMoodWhole = response;
        // response.map((el: any) => newMoodWhole.push(el));
        if (newMoodWhole === null) {
            storeJSONData(moodKey, [Object.values(todayMoodInfo)]);
        } else {
            const tmp = Object.values(newMoodWhole);
            const boo = Object.values(todayMoodInfo);
            const foo = tmp.pop();
            if (
                foo[2].dayOfYear === todayMoodInfo.dayInfo.dayOfYear
                && foo[2].year === todayMoodInfo.dayInfo.year
            ) {
                tmp.push(boo);
                // console.log(tmp)
                storeJSONData(moodKey, tmp)
            }
            else {
                tmp.push(foo);
                tmp.push(boo);
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
