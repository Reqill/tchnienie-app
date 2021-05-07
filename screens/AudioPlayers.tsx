import * as React from 'react'
import { useState, useEffect } from 'react'
import Colors from '../constants/Colors';
import CustomElementStyles from '../constants/CustomElementStyles';
import CourseList from "../constants/CourseList";
import BasicContainer from "../components/BasicContainer";
import { Text, View, Image, TouchableOpacity, Alert, Button, ScrollView, Touchable } from 'react-native'
import { Audio } from 'expo-av';
import MusicList from "../constants/MusicList";
import { Feather } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import Cover1 from "../assets/images/course1cover.jpg";
import Cover2 from "../assets/images/course2cover.jpg";
import Cover3 from "../assets/images/course3cover.jpg";
import Cover4 from "../assets/images/course4cover.jpg";
import MusicCover from '../assets/images/music1cover.jpg'

const covers = [
    MusicCover,
    Cover1,
    Cover2,
    Cover3,
    Cover4,
]

const music = [
    [
        [require("../assets/sounds/m0.mp3")],
        [require("../assets/sounds/m1.mp3")],
        [require("../assets/sounds/m2.mp3")],
        [require("../assets/sounds/m3.mp3")],
        [require("../assets/sounds/m4.mp3")],
        [require("../assets/sounds/m5.mp3")],
        [require("../assets/sounds/m6.mp3")],
    ],
    [
        [
            require("../assets/sounds/k0e0.mp3"),
            require("../assets/sounds/k0e1.mp3"),
            require("../assets/sounds/k0e2.mp3"),
            require("../assets/sounds/k0e3.mp3"),
            require("../assets/sounds/k0e4.mp3"),
            require("../assets/sounds/k0e5.mp3"),
        ],
        [
            require("../assets/sounds/k1e0.mp3"),
            require("../assets/sounds/k1e1.mp3"),
            require("../assets/sounds/k1e2.mp3"),
            require("../assets/sounds/k1e3.mp3"),
            require("../assets/sounds/k1e4.mp3"),
            require("../assets/sounds/k1e5.mp3"),
        ],
        [
            require("../assets/sounds/k2e0.mp3"),
            require("../assets/sounds/k2e1.mp3"),
            require("../assets/sounds/k2e2.mp3"),
            require("../assets/sounds/k2e3.mp3"),
            require("../assets/sounds/k2e4.mp3"),
            require("../assets/sounds/k2e5.mp3"),
        ],
        [
            require("../assets/sounds/k3e0.mp3"),
            require("../assets/sounds/k3e1.mp3"),
        ],
    ]
]

function Icon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string; size: number }) {
    return <Feather style={{ marginTop: .5 }}{...props} />;
}

export default function Settings(props) {
    const [sound, setSound] = useState();
    const [currTimeMillisec, setTime] = useState(0);
    const [maxTimeMillisec, setMaxTime] = useState(393044)
    const [coords, setCoords] = useState({ type: 0, course: 0, episode: 0 })

    async function playSound() {
        const playbackObject = new Audio.Sound()
        const { sound } = await playbackObject.loadAsync(
            music[coords.type][coords.course][coords.episode]
        );
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            playThroughEarpieceAndroid: false,
        })

        setSound(sound);
        await sound.playAsync();
    }


    useEffect(() => {
        return sound ? () => sound.unloadAsync() : undefined;
    }, [sound]);


    return (
        <View>
            <LinearGradient
                colors={[Colors.backgroundColor, "transparent"]}
                style={{ zIndex: 998, position: "absolute", top: 0, width: "100%", height: 10 }}
            />
            <ScrollView>
                <BasicContainer content={
                    <View style={{ marginTop: 8 }}>
                        <View style={{ width: "100%", aspectRatio: 1 }}>
                            <Image source={covers[1]} style={{ height: undefined, width: undefined, flex: 1, borderRadius: 10 }} />
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", marginTop: 10, alignItems: "center" }}>
                            <View style={{ width: "auto" }}>
                                <Text style={CustomElementStyles.audioPrimary}>
                                    Odcinek / Tytuł
                                </Text>
                                <Text numberOfLines={1} style={CustomElementStyles.audioSecondary}>
                                    Kurs / Wykonawca
                                </Text>
                            </View>
                            <TouchableOpacity style={{ paddingBottom: 10, paddingRight: 4 }}>
                                <Icon name="heart" color={Colors.whiteOff} size={28} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", marginTop: 10, alignItems: "center" }}>
                            <Text style={CustomElementStyles.onTime}>
                                {
                                    Math.floor((currTimeMillisec / 1000) / 60)
                                }
                                :
                                {
                                    (((Math.floor((currTimeMillisec / 1000))) % 60) < 10) ?
                                        ("0" + String(((Math.floor((currTimeMillisec / 1000))) % 60))) :
                                        String(((Math.floor((currTimeMillisec / 1000))) % 60))
                                }
                            </Text>
                            <Text style={CustomElementStyles.toTime}>
                                {
                                    Math.floor((maxTimeMillisec / 1000) / 60)
                                }
                                :
                                {
                                    (((Math.floor((maxTimeMillisec / 1000))) % 60) < 10) ?
                                        ("0" + String(((Math.floor((maxTimeMillisec / 1000))) % 60))) :
                                        String(((Math.floor((maxTimeMillisec / 1000))) % 60))
                                }
                            </Text>
                        </View>
                        <Slider
                            style={{
                                width: "110%", height: 15, marginHorizontal: "-4.9%",
                                marginTop: -2, opacity: 1
                            }}
                            thumbTintColor={Colors.whiteOff}
                            maximumTrackTintColor={Colors.whiteOff}
                            minimumTrackTintColor="#85888f"
                            minimumValue={0}
                            maximumValue={maxTimeMillisec}
                            value={currTimeMillisec}
                            onValueChange={(es) => setTime(es)}
                            onSlidingComplete={() => playSound()}
                        />
                    </View>
                } />



            </ScrollView>
            <LinearGradient
                colors={["transparent", Colors.backgroundColor]}
                style={{ zIndex: 998, position: "absolute", bottom: 0, width: "100%", height: 35 }}
            />
        </View>




    );
}

