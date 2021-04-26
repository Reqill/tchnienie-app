import * as React from 'react'
import EmotionName from '../constants/EmotionName';
import dateNames from "../constants/CalendarNames"
import { Text, } from 'react-native'

export default function MoodLog(props: any) {
    console.log(props[1]);
    return (
        <Text>{props[1]}</Text>
    );
}