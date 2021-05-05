import * as React from 'react';
import { useState, useEffect, createRef, useCallback } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, LayoutAnimation, Alert, FlatList, Platform, UIManager, Touchable } from 'react-native';
import BasicContainer from '../components/BasicContainer';
import Colors from '../constants/Colors';
import CustomElementStyles from '../constants/CustomElementStyles';
import MusicList from "../constants/MusicList";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import MusicCover from '../assets/images/music1cover.jpg'

export default function TabTwoScreen(props: { toggleNavBar: Function }) {

    const generateMusicList = () => {
        return MusicList.map((el, i) => <MusicCard item={el} key={el.id} musicIdx={i} toggleNavBar={props.toggleNavBar} />)
    }

    return (
        <View>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: 'wrap', justifyContent: "center", width: "100%" }}>
                {generateMusicList()}
                <View style={{ height: 85, width: "100%" }} />
            </View>
        </View>

    );
}

function Icon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string; size: number }) {
    return <Feather style={{ marginTop: .5 }}{...props} />;
}

const getCourseInfo = async (storageKey: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(storageKey)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(`Course data read error: ${e}`)
    }
}

const storeCourseInfo = async (storageKey: string, value: JSON | Array<any>) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(storageKey, jsonValue)
    } catch (e) {
        console.log(`Course data save error: ${e}`)
    }
}

const alertcik = () => {
    Alert.alert("Informacja", "Możliwość kolejkowania utworów będzie dostępna w krótce.", [
        {
            text: "Ok",
            onPress: () => null,
            style: "cancel"
        },
    ]);

}

const MusicCard = (props: { item: any; musicIdx: any; toggleNavBar: Function }) => {
    const [expanded, setExpanded] = useState(false)
    const [musicInfo, setMusicInfo] = useState(null);
    const [isLiked, setIsLiked] = useState(null);
    const {
        title,
        imgPath,
        id,
        duration,
    } = props.item;
    const key = `music-${title}-${id}`
    const musicIdx = props.musicIdx;

    const handleChange = (e: string, path: Array<any>) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(false);
        props.toggleNavBar(e, path)

        const date = new Date();
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        AsyncStorage.setItem('LastDayOnline', String(dayOfYear))
    }
    // console.log(isLiked)

    const likeMusic = () => {
        storeCourseInfo(key, { isLiked: !isLiked })
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsLiked(!isLiked);
    }

    if (isLiked === null) {
        getCourseInfo(key).then((res) => setIsLiked(res.isLiked))
        return null;
    } else {
        return (
            <View style={{ width: "47.5%" }}>
                <View style={{ paddingTop: 10, paddingHorizontal: "3%" }}>
                    <LinearGradient
                        colors={[Colors.blueOne, Colors.blueTwo]}
                        style={CustomElementStyles.basicContainer20}
                        start={{ x: 0.44, y: -.2 }}
                        end={{ x: 0.56, y: 1.2 }}
                    >
                        <View style={CustomElementStyles.borderFix20}>
                            <View>
                                <TouchableOpacity style={CustomElementStyles.musicContainer} activeOpacity={1} onPress={() => {
                                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setExpanded(!expanded)
                                }}>
                                    <View>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                            <View style={{ width: "100%", aspectRatio: 1, borderRadius: 10 }}>

                                                <View style={{ height: isLiked ? null : 0, overflow: 'hidden', flex: 1, flexDirection: "row", flexWrap: "wrap", zIndex: 99, position: "absolute", right: -7, top: -7, width: 28 }}>
                                                    <View style={[CustomElementStyles.infoIcon, { backgroundColor: Colors.pinkAccent }]}>
                                                        <Icon name="heart" size={18} color={Colors.whiteOff} />
                                                    </View>
                                                </View>


                                                <Image source={MusicCover} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
                                            </View>
                                        </View>

                                    </View>

                                    <View style={{ width: "100%", flex: 1, justifyContent: "center", flexDirection: "column", height: "100%", paddingLeft: 1 }}>
                                        <Text style={CustomElementStyles.musicTitleCard} numberOfLines={1}>{title}</Text>
                                        <View>
                                            <View style={{ flex: 1, flexDirection: "row" }}>
                                                {/* <Icon name="clock" size={13} color={Colors.other} style={{ marginTop: -4.8 }} /> */}
                                                <Text style={CustomElementStyles.musicOther}>{duration} <Text style={{ fontSize: 13 }}>min</Text></Text>
                                            </View>
                                        </View>

                                    </View>
                                </TouchableOpacity >
                                <View>
                                    <View style={{ height: expanded ? null : 0, overflow: 'hidden', flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                                        <View style={{ flex: 1, flexDirection: "row", width: "100%", justifyContent: "space-between", marginTop: 10, marginBottom: 0, marginLeft: 5, alignItems: "center", paddingHorizontal: 5 }}>
                                            {/* <Text style={CustomElementStyles.courseDescription}>{description}</Text> */}
                                            {/* <View style={CustomElementStyles.spacer} /> */}
                                            <TouchableOpacity onPress={() => likeMusic()}>
                                                <Icon name="heart" color={isLiked ? Colors.pinkAccent : Colors.whiteOff} size={27} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ marginRight: -7 }} onPress={() => handleChange("TOGGLE_COURSE", ["MUSIC", musicIdx])}>
                                                <Icon name="play" color={Colors.whiteOff} size={28} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => alertcik()} activeOpacity={1} style={{ opacity: .4 }}>
                                                <Icon name="plus" color={Colors.whiteOff} size={29} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </View >
        );
    }
}
