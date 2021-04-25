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
        borderColor: Colors.borderTwo,
        borderWidth: 1.8,
        opacity: 1,

        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4.65,
        elevation: 6,
    },
    basicContainer: {
        flex: 1,
        flexDirection: 'row',
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 12.5,
        // borderColor: Colors.border,
        // borderWidth: 1.8,
        zIndex: 90,
        opacity: .95,
        padding: 0,
        margin: 0,
        // paddingVertical: 30,
        shadowColor: "rgba(0,0,0,0.15)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        height: "auto",
        shadowOpacity: 0.05,
        shadowRadius: 4.65,
        elevation: 6,
    },
    borderFix: {
        borderColor: Colors.border,
        borderWidth: 1.8,
        borderRadius: 12.5,
        width: "100%",
        height: "100%",
        paddingTop: 12,
        paddingBottom: 20,
        paddingHorizontal: 20,
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    mainHeader: {

    },
    firstTabDescriptioText: {
        fontFamily: "Poppins_500Medium",
        fontSize: 16,
        letterSpacing: .5,
    },
    mainHeaderText: {
        fontSize: 22,
        fontFamily: "Poppins_600SemiBold",
        color: Colors.white,
        letterSpacing: .45,
    },
    other: {
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        letterSpacing: .5,
        color: Colors.other
    }
});

export default CustomElementStyles;