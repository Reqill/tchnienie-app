import Colors from './Colors';
import { ImageBackgroundBase, StyleSheet } from 'react-native';

const CustomElementStyles = StyleSheet.create({
    navbar: {
        flex: 1,
        flexDirection: 'row',
        width: "80%",
        // backgroundColor: "#303747",
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 100,
        paddingHorizontal: 30,
        position: "absolute",
        bottom: 20,
        height: 57,
        zIndex: 999,
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
    },
    buttonText: {
        color: Colors.whiteOff,
        fontFamily: "Poppins_500Medium",
        fontSize: 14,
        paddingHorizontal: 15,
        paddingVertical: 3,
    },
    button: {
        backgroundColor: Colors.paleBlue,
        margin: 2.5,
        borderRadius: 100,
        marginBottom: 3
    },
    courseContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: -8,
        marginHorizontal: -5,
        padding: 2
    },
    courseHeader: {
        fontSize: 18,
        fontFamily: "Poppins_500Medium",
        color: Colors.whiteOff,
        opacity: 1,
        letterSpacing: .40,
    },
    courseOther: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: Colors.other,
        letterSpacing: .40,
    },
    spacer: {
        height: 1,
        width: "100%",
        backgroundColor: Colors.text,
        opacity: .5,
        marginBottom: 4,
        marginTop: 20
    },
    courseDescription: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        color: Colors.whiteOff,
        opacity: .85,
        letterSpacing: .40,
        marginTop: 15
    },
    basicContainer20: {
        flex: 1,
        flexDirection: 'column',
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 12.5,
        flexWrap: "wrap",
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
    musicContainer: {
        // flex: 1,
        // flexDirection: "column",
        // flexWrap: "wrap",
        // alignItems: "center",
        // justifyContent: "space-around",
        width: "100%",
        marginBottom: -8,
        padding: 2
    },
    musicTitleCard: {
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        color: Colors.whiteOff,
        opacity: 1,
        letterSpacing: .2,
        marginTop: 7,
        height: 30,
    },
    borderFix20: {
        borderColor: Colors.border,
        borderWidth: 1.8,
        borderRadius: 12.5,
        width: "100%",
        height: "100%",
        paddingTop: 12,
        paddingBottom: 16,
        paddingHorizontal: 12,
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    musicOther: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: "#8D9199",
        letterSpacing: .40,
        marginTop: -8
    },
    infoIcon: {
        padding: 5,
        paddingBottom: 4,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    mainButton: {
        width: 49,
        height: 49,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2.7,
        borderColor: Colors.tintColor,
        borderRadius: 30,
        marginLeft: 4,
        opacity: 1,
    },
    mainIndicator: {
        fontFamily: "Poppins_400Regular",
        fontSize: 16,
        color: Colors.text,
        marginBottom: -5,
        marginTop: 2,
        letterSpacing: .2
    },
    mainCTA: {
        fontFamily: "Poppins_400Regular",
        fontSize: 16,
        color: Colors.tintColor,
        letterSpacing: .2
    },
    settingsIndicator: {
        color: Colors.text,
        fontSize: 14,
        marginTop: 3.5,
        fontFamily: "Poppins_400Regular",
        opacity: .8,
        paddingBottom: 3,
        letterSpacing: .2,
    },
    appHeaderText: {
        fontFamily: "Pacifico_400Regular",
        fontSize: 32,
        color: Colors.white,
        letterSpacing: 2,
    },
    introductionHeader: {
        width: "100%",
        textAlign: "center",
        fontFamily: "Poppins_600SemiBold",
        color: Colors.white,
        fontSize: 28
    },
    introductionText: {
        width: "90%",
        textAlign: "center",
        fontFamily: "Poppins_400Regular",
        color: Colors.text,
        opacity: .8,
        fontSize: 14
    },
    dotInactive: {
        height: 10,
        width: 10,
        borderRadius: 10,
        opacity: .8
    }
});

export default CustomElementStyles;