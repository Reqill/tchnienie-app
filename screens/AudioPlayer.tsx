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

export default class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playbackObj: null,
            soundObj: null,
            icon: "play",
            currentAudio: null,
        }
    }


    UNSAFE_componentWillReceiveProps(newProps: any) {
        // console.log(this.props + "\n\n" + newProps)
        if (this.props.activeAudio[0] !== undefined && this.props !== newProps) {
            this.playSound(
                music
                [this.props.activeAudio[0] === "MUSIC" ? 0 : 1]
                [this.props.activeAudio[1]]
                [this.props.activeAudio[0] === "MUSIC" ? 0 : this.props.activeAudio[2]],
                "FIRST"
            )
        }
    }



    playSound = async (audio: any, action) => {
        //using play btn
        if (action === "PLAY") {
            //playing for the first time
            if (this.state.soundObj === null) {
                const playbackObject = new Audio.Sound()
                const status = await playbackObject.loadAsync(
                    audio,
                    {
                        shouldPlay: true
                    });
                return this.setState({ ...this.state, playbackObj: playbackObject, soundObj: status, currentAudio: audio, icon: "pause" })
            }

            // pause audio
            if (this.state.soundObj.isLoaded && this.state.soundObj.isPlaying) {
                const status = await this.state.playbackObj.setStatusAsync({ shouldPlay: false })
                return this.setState({ ...this.status, soundObj: status, icon: "play" })
            }

            // resume audio
            if (this.state.soundObj.isLoaded && !this.state.soundObj.isPlaying && this.state.currentAudio === audio) {
                const status = await this.state.playbackObj.playAsync();
                return this.setState({ ...this.state, soundObj: status, icon: "pause" })
            }

            if (this.state.soundObj.isLoaded && !this.state.soundObj.isPlaying && this.state.currentAudio !== audio) {
                const playbackObject = new Audio.Sound()
                const status = await playbackObject.loadAsync(
                    audio,
                    {
                        shouldPlay: true
                    });
                return this.setState({ ...this.state, playbackObj: playbackObject, soundObj: status, currentAudio: audio, icon: "pause" })
            }
        }
        if (action === "FIRST") {
            const playbackObject = new Audio.Sound()
            const status = await playbackObject.loadAsync(
                audio,
                {
                    shouldPlay: false
                });
            return this.setState({ ...this.state, playbackObj: playbackObject, soundObj: status, currentAudio: audio, icon: "play" })
        }

    }

    render() {
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
                            <View style={{ flex: 1, flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", marginTop: 12, alignItems: "center" }}>
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
                            <View style={{ flex: 1, flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", marginTop: 10, alignItems: "center", marginHorizontal: "1%" }}>
                                <Text style={CustomElementStyles.onTime}>
                                    {this.state.soundObj === null ? '0:00' :
                                        `${Math.floor((this.state.soundObj.positionMillis / 1000) / 60)}:${(((Math.floor((this.state.soundObj.positionMillis / 1000))) % 60) < 10) ?
                                            ("0" + String(((Math.floor((this.state.soundObj.positionMillis / 1000))) % 60))) :
                                            String(((Math.floor((this.state.soundObj.positionMillis / 1000))) % 60))}`}
                                </Text>
                                <Text style={CustomElementStyles.toTime}>
                                    {this.state.soundObj === null ? '0:00' :
                                        `${Math.floor((this.state.soundObj.durationMillis / 1000) / 60)}:${(((Math.floor((this.state.soundObj.durationMillis / 1000))) % 60) < 10) ?
                                            ("0" + String(((Math.floor((this.state.soundObj.durationMillis / 1000))) % 60))) :
                                            String(((Math.floor((this.state.soundObj.durationMillis / 1000))) % 60))}`}
                                </Text>
                            </View>
                            <Slider
                                style={{
                                    width: "108%", height: 15, marginHorizontal: "-4%",
                                    marginTop: -2, opacity: 1
                                }}
                                thumbTintColor={Colors.whiteOff}
                                maximumTrackTintColor={Colors.whiteOff}
                                minimumTrackTintColor="#85888f"
                                minimumValue={0}
                                // maximumValue={maxTimeMillisec}
                                // value={currTimeMillisec}
                                // onValueChange={(es) => setTime(es)}
                                onSlidingComplete={() => this.playSound(
                                    music[this.props.activeAudio[0] === "MUSIC" ? 0 : 1][this.props.activeAudio[1]][this.props.activeAudio[0] === "MUSIC" ? 0 : this.props.activeAudio[2]], "SLIDER")}
                            />
                            <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
                                <View style={{ width: "80%", marginTop: 10 }}>
                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                                        <TouchableOpacity style={{ padding: 2 }} onPress={() => this.playSound(
                                            music[this.props.activeAudio[0] === "MUSIC" ? 0 : 1][this.props.activeAudio[1]][this.props.activeAudio[0] === "MUSIC" ? 0 : this.props.activeAudio[2]], "PLAY")}>
                                            <Icon
                                                name="skip-back"
                                                color={Colors.whiteOff} size={32}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ padding: 2, paddingLeft: 7 }} onPress={() => this.playSound(
                                            music[this.props.activeAudio[0] === "MUSIC" ? 0 : 1][this.props.activeAudio[1]][this.props.activeAudio[0] === "MUSIC" ? 0 : this.props.activeAudio[2]], "PLAY")}>
                                            <Icon
                                                name={this.state.icon}
                                                color={Colors.whiteOff} size={48}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ padding: 2 }} onPress={() => this.playSound(
                                            music[this.props.activeAudio[0] === "MUSIC" ? 0 : 1][this.props.activeAudio[1]][this.props.activeAudio[0] === "MUSIC" ? 0 : this.props.activeAudio[2]], "PLAY")}>
                                            <Icon
                                                name="skip-forward"
                                                color={Colors.whiteOff} size={32}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>





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

}