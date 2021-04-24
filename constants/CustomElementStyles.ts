import Colors from './Colors';
import { StyleSheet } from 'react-native';

const CustomElementStyles = StyleSheet.create({
    navbar: {
        flex: 1,
        flexDirection: 'row',
        width: "85%",
        height: 57,
        // backgroundColor: "#303747",
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 100,
        paddingHorizontal: 10,
        position: "absolute",
        zIndex: 999,
        bottom: 17,
        borderColor: Colors.border,
        borderWidth: 1.8,
        opacity: .9,

        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4.65,
        elevation: 6,
    }
});

export default CustomElementStyles;