import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GoToButton from './GoToButton'

export default function NavBar() {
    return (
        <View style={styles.navbar}>
            <GoToButton screenName="TabOne" iconName="home" color={"#00FF80"} />
            <GoToButton screenName="TabTwo" iconName="video" color={"#00FF80"} />
            <GoToButton screenName="TabThree" iconName="list" color={"#00FF80"} />
            <GoToButton screenName="TabFour" iconName="headphones" color={"#00FF80"} />
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flex: 1,
        flexDirection: 'row',
        width: "85%",
        height: 57,
        backgroundColor: "#303747",
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 100,
        paddingHorizontal: 10,
        position: "absolute",
        zIndex: 999,
        bottom: 17,
    },
});

