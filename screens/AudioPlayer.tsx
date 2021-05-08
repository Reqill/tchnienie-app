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

const lists = [
    MusicList,
    CourseList,
]

const covers = [
    MusicCover,
    Cover1,
    Cover2,
    Cover3,
    Cover4,
]

const music = [
    [
        [require("../assets/sounds/bensound-erf.mp3")],
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
            currMoment: 0,
            duration: 0,
            oldProps: null,
            newProps: null,
        }
    }


    UNSAFE_componentWillReceiveProps(newProps: any) {
        if (this.props.activeAudio[0] !== undefined && this.props.activeAudio !== newProps.activeAudio) {
            // console.log(this.props.activeAudio + "\n" + newProps.activeAudio)
            // console.log("why")
            // if (this.state.soundObj.isLoaded && this.state.soundObj.isPlaying) {
            //     const status = await this.state.playbackObj.setStatusAsync({ shouldPlay: false })
            //     return this.setState({ ...this.status, soundObj: status, icon: "play" })
            // }
            if (this.state.soundObj !== null) {
                this.state.playbackObj.unloadAsync();
            }
            this.setState({ ...this.state, icon: "play", currMoment: 0 })
            this.playSound(
                music
                [this.props.activeAudio[0] === "MUSIC" ? 0 : 1]
                [this.props.activeAudio[1]]
                [this.props.activeAudio[0] === "MUSIC" ? 0 : this.props.activeAudio[2]],
                "FIRST"
            )
            return;
        }
        return;
    }

    getTitle = (props) => {
        if (props === undefined) {
            return null;
        } else if (props[0] === "MUSIC") {
            return lists[0][props[1]].title
        } else if (props[0] === "COURSE") {
            // console.log(lists[1][props[1]])
            return (lists[1][props[1]].episode[props[2]].title)
        }
    }

    getDescription = (props) => {
        if (props === undefined) {
            return null;
        } else if (props[0] === "MUSIC") {
            return lists[0][props[1]].author
        } else if (props[0] === "COURSE") {
            // console.log(lists[1][props[1]])
            return lists[1][props[1]].name
        }
    }

    getCover = (props) => {
        if (props === undefined) {
            return covers[0];
        } else if (props[0] === "MUSIC") {
            return covers[0];
        } else {
            return covers[(props[1] + 1)];
        }
    }

    onPlaybackStatusUpdate = (playbackStatus) => {
        if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
            if (this.state.duration !== playbackStatus.playableDurationMillis) {
                this.setState({ ...this.state, duration: playbackStatus.playableDurationMillis })
            }
            if (this.state.icon === "play") {
                this.setState({ ...this.state, icon: "pause" })
            }
            this.setState({ ...this.state, currMoment: playbackStatus.positionMillis })
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
                        shouldPlay: true,
                    });
                this.setState({ ...this.state, playbackObj: playbackObject, soundObj: status, currentAudio: audio, icon: "pause" })
                // console.log("STRATED FROM NULL")
                Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    staysActiveInBackground: true,
                    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                    playThroughEarpieceAndroid: false,
                })
                return playbackObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
            }

            // pause audio
            if (this.state.soundObj.isLoaded && this.state.soundObj.isPlaying) {
                const status = await this.state.playbackObj.setStatusAsync({ shouldPlay: false })
                // console.log("PAUSE")
                return this.setState({ ...this.state, soundObj: status, icon: "play" })
            }

            // resume audio
            if (this.state.soundObj.isLoaded && !this.state.soundObj.isPlaying && this.state.currentAudio === audio) {
                const status = await this.state.playbackObj.playAsync();
                this.setState({ ...this.state, soundObj: status, icon: "pause" })
                // console.log("RESUME")
            }

            if (this.state.soundObj.isLoaded && !this.state.soundObj.isPlaying && this.state.currentAudio !== audio) {
                const playbackObject = new Audio.Sound()
                const status = await playbackObject.loadAsync(
                    audio,
                    {
                        shouldPlay: true
                    });
                // console.log("CHANGE AUDIO")
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
            this.setState({ ...this.state, playbackObj: playbackObject, soundObj: status, currentAudio: audio, icon: "play" })
            // console.log("STRATED FROM NEW PROPS")
            Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                playThroughEarpieceAndroid: false,
            })
            return playbackObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
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
                                <Image source={this.getCover(this.props.activeAudio)} style={{ height: undefined, width: undefined, flex: 1, borderRadius: 10 }} />
                            </View>
                            <View style={{ flex: 1, flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", marginTop: 12, alignItems: "center" }}>
                                <View style={{ width: "auto" }}>
                                    <Text style={CustomElementStyles.audioPrimary}>
                                        {this.getTitle(this.props.activeAudio)}
                                    </Text>
                                    <Text numberOfLines={1} style={CustomElementStyles.audioSecondary}>
                                        {this.getDescription(this.props.activeAudio)}
                                    </Text>
                                </View>
                                <TouchableOpacity style={{ paddingBottom: 10, paddingRight: 4 }}>
                                    <Icon name="heart" color={Colors.whiteOff} size={28} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", marginTop: 10, alignItems: "center", marginHorizontal: "1%" }}>
                                <Text style={CustomElementStyles.onTime}>
                                    {this.state.currMoment === 0 ? '0:00' :
                                        `${Math.floor((this.state.currMoment / 1000) / 60)}:${(((Math.floor((this.state.currMoment / 1000))) % 60) < 10) ?
                                            ("0" + String(((Math.floor((this.state.currMoment / 1000))) % 60))) :
                                            String(((Math.floor((this.state.currMoment / 1000))) % 60))}`}
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
                                // minimumValue={0}
                                maximumValue={this.state.duration}
                                value={this.state.currMoment}
                                // onValueChange={(es) => setTime(es)}
                                onSlidingComplete={() => this.playSound(
                                    music[this.props.activeAudio[0] === "MUSIC" ? 0 : 1][this.props.activeAudio[1]][this.props.activeAudio[0] === "MUSIC" ? 0 : this.props.activeAudio[2]], "SLIDER")}
                            />
                            <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
                                <View style={{ width: "80%", marginTop: 10 }}>
                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                                        <TouchableOpacity disable={true} style={{ padding: 2 }} onPress={() => this.playSound(
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
                                        <TouchableOpacity disable={true} style={{ padding: 2 }} onPress={() => this.playSound(
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