import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const colors = {
    primary: "#106ae0",
    textInPrimary: "#FFFFFF",
    hover: "#328afc",
};

const style = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    card: {
        width: (width * 0.9) / 4 - 10,
        height: (width * 0.9) / 4 - 10,
        borderColor: "#c4c4c4",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 8,
        position: "relative",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    cardGroup: {
        width: "100%",
        height: "100%",
        position: "relative",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    cardBack: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
    },

    cardFront: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        padding: 5,
    },

    image: {
        width: "100%",
        aspectRatio: 1,
    },

    jogo: {
        width: "90%",
        height: ((width * 0.9) / 4) * 5,
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },

    hidden: {
        transform: "rotateY(180deg)",
    },

    button: {
        text: {
            color: colors.textInPrimary,
            textTransform: "uppercase",
            textAlign: "center",
        },
        paddingVertical: 15,
        borderRadius: 8,
        justifyContent: "center",

        bg: colors.primary,
        pressed: colors.hover,
    },

    btnView: {
        width: "100%",
        marginTop: 20,
        paddingHorizontal: "5%",

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    timer: {
        view: {
            width: "100%",
            marginBottom: 20,
            paddingLeft: "5%",
        },

        text: {
            fontSize: 20,
        },
    },

    fundoModal: {
        width: width,
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 5,
        backgroundColor: "rgba(0, 0, 0, 0.4)",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    modal: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        width: "95%",
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: "center",

        text: {
            textAlign: "center",
            fontSize: 20,
            venceu: {
                fontSize: 22,
                marginBottom: 10,
            },
        },

        image: {
            width: 112 * 1.5,
            height: 100 * 1.5,
            marginVertical: 20,
        },
    },

    btnGroup: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },

    input: {
        fontSize: 18,
        borderColor: "#c4c4c4",
        borderWidth: 1,
        borderRadius: 24,
        marginBottom: 10,
        paddingVertical: 10,
        paddingLeft: 15,

        label: {
            fontSize: 20,
        },
    },

    form: {
        width: width * 0.9,
    },

    msg: {
        fontSize: 18,
        color: "red",
        textAlign: "right",
        marginBottom: 30,
    },

    cCard: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      padding: 10,
    },

    cText: {
      fontSize: 20
    }
});

export default style;
