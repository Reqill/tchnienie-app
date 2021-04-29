import * as React from 'react'
import { useState, useEffect } from 'react'
import CustomElementStyles from '../constants/CustomElementStyles';
import { Text, View, Image, TouchableOpacity, Alert, Button } from 'react-native'
import { Audio } from 'expo-av';


export default function Settings(props) {
    const [playingType, setPlayingType] = useState(null);
    const [sound, setSound] = useState();

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/sounds/bensound-erf.mp3')
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

        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        setPlayingType(props.activeAudio[0])
        return sound
            ? () => {
                console.log('Unloading Sound');
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

