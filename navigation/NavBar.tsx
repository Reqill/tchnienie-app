import * as React from 'react';
import { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import CustomElementStyles from '../constants/CustomElementStyles';
// import { NavigationRouteContext, useNavigation, useRoute } from '@react-navigation/native';
// import GoToButton from '../components/GoToButton'
import { Feather } from '@expo/vector-icons';

function ButtonIcon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string }) {
    return <Feather size={30} style={{ marginBottom: 0 }} {...props} />;
}

export default function NavBar(props: { visible: Boolean; changeTabIdx: Function; activeIdx: Number }) {
    // const navigation = useNavigation();
    const [active, setActive] = useState(props.activeIdx)
    const colors = [Colors.tintColor, Colors.whiteOff];
    // const tabs = ["TabOne", "TabTwo", "TabThree", "TabFour"]

    // let route = useRoute()
    // console.log(route.name)


    const changeColor = (idx: number) => {
        setActive(idx)
        // console.log(idx)
        // navigation.navigate(tabs[idx])
    }

    useEffect(() => {
        props.changeTabIdx(active);
    }, [active])


    return (
        <View style={styles.center}>
            <LinearGradient
                colors={[Colors.blueThree, Colors.blueFour]}
                style={CustomElementStyles.navbar}
                start={{ x: 0.44, y: -.2 }}
                end={{ x: 0.56, y: 1.2 }}
            >
                <TouchableOpacity style={{ padding: 10 }} onPress={(e) => changeColor(0)}>
                    <ButtonIcon name={"home"} color={props.activeIdx === 0 ? colors[0] : colors[1]} />
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }} onPress={(e) => changeColor(1)}>
                    <ButtonIcon name={"video"} color={props.activeIdx === 1 ? colors[0] : colors[1]} />
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }} onPress={(e) => changeColor(2)}>
                    <ButtonIcon name={"list"} color={props.activeIdx === 2 ? colors[0] : colors[1]} />
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }} onPress={(e) => changeColor(3)}>
                    <ButtonIcon name={"headphones"} color={props.activeIdx === 3 ? colors[0] : colors[1]} />
                </TouchableOpacity>
            </LinearGradient>
        </View>

    );
}




const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    }
});

