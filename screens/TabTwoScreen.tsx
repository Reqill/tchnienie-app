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

function Icon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string }) {
    return <Feather size={18} style={{ marginTop: .5 }}{...props} />;
}

const CourseCard = (props: any) => {
    // const [expanded, setExpanded] = useState(0)
    const {
        name,
        type,
        description,
        imgPath,
        episode,
    } = props.item;
    return (
        <BasicContainer content={
            <View style={CustomElementStyles.courseContainer}>
                <View style={{ width: 62, height: 62, backgroundColor: "white", borderRadius: 10 }}>

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
                                        <Icon name="chevron-down" color="#8D9199" />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </View >

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
