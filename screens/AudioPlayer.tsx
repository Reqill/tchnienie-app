import * as React from 'react'
import { useState, useEffect } from 'react'
import CustomElementStyles from '../constants/CustomElementStyles';
import { Text, View, Image, TouchableOpacity, Alert, Button } from 'react-native'
import { Audio } from 'expo-av';


const music = [
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
    ],
    [
        [require("../assets/sounds/m0.mp3")],
        [require("../assets/sounds/m1.mp3")],
        [require("../assets/sounds/m2.mp3")],
        [require("../assets/sounds/m3.mp3")],
        [require("../assets/sounds/m4.mp3")],
        [require("../assets/sounds/m5.mp3")],
        [require("../assets/sounds/m6.mp3")],
    ]
]

export default function Settings(props) {
    const [playingType, setPlayingType] = useState(null);
    const [sound, setSound] = useState();
    const [currEpisode, setEpisode] = useState(null);
    const [currCourse, setCourse] = useState(null);
    const [musicCourseIdx, setMusicCourseIdx] = useState(null);

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            music[musicCourseIdx][currCourse][currEpisode];
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

        // console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        if (props.activeAudio[0] === "MUSIC") {
            setMusicCourseIdx(1);
        } else {
            setMusicCourseIdx(0);
        }
        setPlayingType(props.activeAudio[0])
        setEpisode((props.activeAudio[2] !== undefined) ? props.activeAudio[2] : 0);
        setCourse(props.activeAudio[1]);
        return sound
            ? () => {
                // console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound, props.activeAudio[0]]);


    return (
        <View>
            <Text style={CustomElementStyles.courseHeader}>Audio Player</Text>
            <Text style={CustomElementStyles.courseOther}>
                {playingType + " ID:  " + props.activeAudio[1]}{(props.activeAudio[2] !== undefined) ? ("-" + props.activeAudio[2]) : null}
            </Text>
            <Button title="Play Sound" onPress={playSound} />
        </View>
    );
}

