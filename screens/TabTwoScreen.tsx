import * as React from 'react';
import { useState, useEffect, createRef } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, LayoutAnimation, FlatList, Platform, UIManager } from 'react-native';
import BasicContainer from '../components/BasicContainer';
import Colors from '../constants/Colors';
import CustomElementStyles from '../constants/CustomElementStyles';
import CourseList from "../constants/CourseList";
import { Feather } from '@expo/vector-icons';

export default function TabTwoScreen() {

    const generateCourseList = () => {
        return CourseList.map((el, i) => <CourseCard item={el} key={el.id} />)
    }

    return (
        <View style={styles.container}>
            {generateCourseList()}
        </View>
    );
}

function Icon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string; size: number }) {
    return <Feather style={{ marginTop: .5 }}{...props} />;
}

const EpisodeElement = ({ elementData }: any) => {
    const {
        id,
        title,
        duration,
        trackUrl,
        trackPath
    } = elementData;
    return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8, paddingHorizontal: 2.5 }}>
            <View>
                <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular", color: Colors.whiteOff, letterSpacing: .25 }}>{id}. {title}</Text>
                <Text style={{ fontSize: 14, marginTop: -4, fontFamily: "Poppins_400Regular", color: Colors.whiteOff, opacity: .45 }}>{duration} min</Text>
            </View>
            <TouchableOpacity style={{ marginRight: -5 }}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", opacity: .85 }}>
                    <Icon name="play" color={Colors.whiteOff} size={26} />
                </View>

            </TouchableOpacity>
        </View>
    );
}

const CourseCard = (props: any) => {
    const [expanded, setExpanded] = useState(false)
    const {
        name,
        type,
        description,
        imgPath,
        episode,
    } = props.item;

    const generateEpisodes = () => {
        return episode.map((el, i) => <EpisodeElement elementData={el} key={`${i}${el.title}`} />)
    }

    return (
        <BasicContainer content={
            <View>
                <TouchableOpacity style={CustomElementStyles.courseContainer} activeOpacity={1} onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setExpanded(!expanded)
                }}>
                    <View style={{ width: 62, height: 62, backgroundColor: "white", borderRadius: 10 }}>
                        {/* grafika */}
                    </View>
                    <View style={{ width: "90%", paddingLeft: 13, flex: 1, justifyContent: "center", flexDirection: "column", height: "100%" }}>
                        <View style={{ marginBottom: -4 }}>
                            <Text style={CustomElementStyles.courseHeader}>{name}</Text>
                        </View>

                        <View style={{ width: "100%" }}>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                <View>
                                    <Text style={CustomElementStyles.courseOther}>
                                        {type}
                                    </Text>
                                </View>
                                <View >
                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginRight: -10 }}>
                                        <View>
                                            <Text style={CustomElementStyles.courseOther}>
                                                0/{episode.length}{" "}

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
                            {generateEpisodes()}
                        </View>

                    </View>
                </View>
            </View>

        } />
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center"
    }
});
