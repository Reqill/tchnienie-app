import * as React from 'react'
import BasicContainer from "./BasicContainer"
import Emotion from "../constants/EmotionEmoji"
import CustomElementStyles from '../constants/CustomElementStyles';
import { Text, View, Image } from 'react-native'
import Colors from "../constants/Colors"

export default function MoodLog(props: any) {
    const MoodCart = () => {
        console.log()
        return (
            <View style={{ marginBottom: -10 }}>
                <View style={CustomElementStyles.mainHeader}>
                    <Text style={CustomElementStyles.mainHeaderText}>{props.item[2].day}. {props.item[2].monthNameFull} {props.item[2].year}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
                    <View style={{ maxWidth: "100%" }}>
                        <Text style={[CustomElementStyles.firstTabDescriptioText, { color: Colors.whiteOff }]}>Wtedy czułam/em się:</Text>
                        <View style={{ marginTop: -4, marginBottom: 7, flex: 1, flexDirection: "row" }}>
                            <Text style={[CustomElementStyles.firstTabDescriptioText, { color: Colors.tintColor }]} >{props.item[1]}</Text>
                        </View>
                    </View>
                    <Image style={{ width: 70, height: 70, marginTop: -30 }} source={Emotion[props.item[0]]} />
                </View>
            </View>
        );
    }
    return (
        <BasicContainer content={<MoodCart />} />
    );
}