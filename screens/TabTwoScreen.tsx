import * as React from 'react';
import { useState, useEffect, createRef, useCallback } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, LayoutAnimation, FlatList, Platform, UIManager } from 'react-native';
import BasicContainer from '../components/BasicContainer';
import Colors from '../constants/Colors';
import CustomElementStyles from '../constants/CustomElementStyles';
import CourseList from "../constants/CourseList";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cover1 from "../assets/images/course1cover.jpg";
import Cover2 from "../assets/images/course2cover.jpg";
import Cover3 from "../assets/images/course3cover.jpg";
import Cover4 from "../assets/images/course4cover.jpg";

const covers = [
    Cover1,
    Cover2,
    Cover3,
    Cover4,
]


export default function TabTwoScreen(props: { toggleNavBar: Function }) {

    const generateCourseList = () => {
        return CourseList.map((el, i) => <CourseCard item={el} key={el.id} courseIdx={i} toggleNavBar={props.toggleNavBar} />)
    }


    return (
        <View style={styles.container}>
            {generateCourseList()}
            <View style={{ height: 85 }} />
        </View>
    );
}

function Icon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string; size: number }) {
    return <Feather style={{ marginTop: .5 }}{...props} />;
}

const EpisodeElement = (props: { elementData, info, idx, storeKey, courseIdx: number, unlockEpisode: Function, toggleNavBar: Function }) => {
    const {
        id,
        title,
        duration,
        trackUrl,
        trackPath
    } = props.elementData;
    const {
        key,
        isWatched,
        isLiked,
        isCompleted,
        watchedEpisodes
    } = props.info;
    const info = props.info
    const idx = props.idx
    const storeKey = props.storeKey
    // info.watchedEpisodes = 0;
    storeCourseInfo(storeKey, info)
    const watchedEpisode = (foo) => {
        props.unlockEpisode(foo)
    }

    const startEpisode = () => {
        if (watchedEpisodes >= idx) {
            if (watchedEpisodes === idx) {
                watchedEpisode(idx)
            }
            props.toggleNavBar("TOGGLE_COURSE", ["COURSE", props.courseIdx, idx])
        } else {
            // console.log("MUSISZ OBEJRZEĆ POPRZEDNIE ABY ROZPOCZĄĆ KOLEJNY")
        }
    }

    return (
        <View style={{
            flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
            paddingVertical: 8, paddingHorizontal: 2.5, opacity: (watchedEpisodes >= idx) ? 1 : .45
        }}>
            <View>
                <Text numberOfLines={1} style={{ fontSize: 16, fontFamily: "Poppins_400Regular", color: Colors.whiteOff, letterSpacing: .25 }}>{id}. {title}</Text>
                <View>
                    <View style={{ flex: 1, flexDirection: "row", }}>
                        <Icon name="clock" size={13} color={Colors.other} style={{ marginTop: -.5 }} />
                        <Text numberOfLines={1} style={{ fontSize: 14, marginTop: -4, fontFamily: "Poppins_400Regular", color: Colors.whiteOff, opacity: .45 }}> {duration} <Text style={{ fontSize: 13 }}>min</Text></Text>
                    </View>
                </View>

            </View>
            <TouchableOpacity style={{ marginRight: -5 }} onPress={() => startEpisode()} activeOpacity={(watchedEpisodes >= idx) ? .2 : 1}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", opacity: .85 }}>
                    <Icon name={(watchedEpisodes >= idx) ? "play" : "lock"} color={Colors.whiteOff} size={26} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const getCourseInfo = async (storageKey: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(storageKey)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(`Course data read error: ${e}`)
    }
}

const storeCourseLevel = async (storageKey: string, value: string | boolean | number) => {
    try {
        await AsyncStorage.setItem(storageKey, value)
    } catch (e) {
        console.log(`Data save error: ${e}`)
    }
}

const getCourseLevel = async (storageKey: string) => {
    try {
        const value = await AsyncStorage.getItem(storageKey)
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log(`Data read error: ${e}`)
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

const CourseCard = (props: { item: any, courseIdx: any, toggleNavBar: Function }) => {
    const [expanded, setExpanded] = useState(false)
    const [courseInfo, setCourseInfo] = useState(null);
    const {
        name,
        type,
        description,
        imgPath,
        episode,
        id
    } = props.item;
    const key = `course-${name}-${id}`
    const courseIdx = props.courseIdx;

    const generateEpisodes = (info) => {
        return episode.map((el, i) => <EpisodeElement elementData={el} key={`${i}${el.title}`} info={info} idx={i} courseIdx={courseIdx} storeKey={key} unlockEpisode={unlockEpisode} toggleNavBar={handleChange} />)
    }

    const handleChange = useCallback((e, path) => {
        setExpanded(false);
        props.toggleNavBar(e, path)
    }, [])

    const likeCourse = () => {
        let tmp = courseInfo;
        tmp.isLiked = !courseInfo.isLiked;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCourseInfo(tmp);
        setExpanded(false);
        storeCourseInfo(key, tmp)
    }

    const unlockEpisode = useCallback((index) => {
        let tmp = courseInfo;
        tmp.watchedEpisodes = index + 1;
        setCourseInfo(tmp);
        storeCourseInfo(key, tmp);
        // getCourseInfo(key).then((res) => console.log(res))
    }, [courseInfo])

    if (courseInfo === null) {
        getCourseInfo(key).then((res) => { setCourseInfo(res) })
        return null;
    } else {
        return (
            <BasicContainer content={
                <View>
                    <TouchableOpacity style={CustomElementStyles.courseContainer} activeOpacity={1} onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setExpanded(!expanded)
                    }}>
                        <View style={{ width: 62, height: 62, borderRadius: 10 }}>
                            <Image source={covers[courseIdx]} style={{ width: 62, height: 62, borderRadius: 10 }} />
                            <View style={{ height: courseInfo.isLiked ? null : 0, overflow: 'hidden', flex: 1, flexDirection: "row", flexWrap: "wrap", zIndex: 99, position: "absolute", right: -7, bottom: -7, width: 28 }}>
                                <View style={[CustomElementStyles.infoIcon, { backgroundColor: Colors.pinkAccent }]}>
                                    <Icon name="heart" size={18} color={Colors.whiteOff} />
                                </View>
                            </View>
                            <View style={{ height: expanded ? null : 0, overflow: 'hidden', flex: 1, flexDirection: "row", flexWrap: "wrap", zIndex: 98, position: "absolute", top: 0 }}>
                                <View
                                    style={{
                                        width: 62, height: 62, borderRadius: 10, backgroundColor: "rgba(0,0,0,.25)",
                                        flex: 1, alignItems: "center", justifyContent: "center"
                                    }}>
                                    <TouchableOpacity style={{ width: "100%", height: "100%", flex: 1, alignItems: "center", justifyContent: "center" }} onPress={() => likeCourse()}>
                                        <Icon name="heart" size={30} color={courseInfo.isLiked ? Colors.pinkAccent : Colors.whiteOff} />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                        <View style={{ width: "90%", paddingLeft: 13, flex: 1, justifyContent: "center", flexDirection: "column", height: "100%" }}>
                            <View style={{ marginBottom: -4 }}>
                                <Text numberOfLines={1} style={CustomElementStyles.courseHeader}>{name}</Text>
                            </View>

                            <View style={{ width: "100%" }}>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                    <View>
                                        <Text numberOfLines={1} style={CustomElementStyles.courseOther}>
                                            {type}
                                        </Text>
                                    </View>
                                    <View >
                                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginRight: -10 }}>
                                            <Icon name="headphones" size={13} color={Colors.other} style={{ marginTop: 3 }} />
                                            <View>
                                                <Text numberOfLines={1} style={CustomElementStyles.courseOther}>
                                                    {" "}{courseInfo.watchedEpisodes}/{episode.length}{" "}
                                                </Text>
                                            </View>
                                            <View>
                                                <Icon name={expanded ? "chevron-up" : "chevron-down"} size={18} color="#8D9199" />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        </View>


                    </TouchableOpacity >
                    <View>
                        <View style={{ height: expanded ? null : 0, overflow: 'hidden', flex: 1, flexDirection: "row", flexWrap: "wrap" }}>

                            <View style={{ flex: 1, flexDirection: "column", marginTop: 20, marginBottom: -10 }}>
                                {/* <Text style={CustomElementStyles.courseDescription}>{description}</Text> */}
                                {/* <View style={CustomElementStyles.spacer} /> */}
                                {generateEpisodes(courseInfo)}
                            </View>

                        </View>
                    </View>
                </View>

            } />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center"
    }
});
