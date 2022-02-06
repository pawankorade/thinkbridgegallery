import { Dimensions, StyleSheet } from 'react-native';

export const colors = {
    background: '#F9F9FB',
    textDark: '#313234',
    primary: '#F5CA48',
    secondary: '#F26C68',
    text: '#CDCDCD',
    price: '#E4723C',
    white: '#FFFFFF',
    black: '#000000',
};

export const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    screenHeight: {
        minHeight: Dimensions.get("window").height,
    },
    addImgButtonContainer: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    addImgButtonStyle: {
        marginHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#841584',
    },
    addImgBackground: {
        paddingBottom: 40,
        paddingTop: 96,
        paddingHorizontal: 32,
    },
    categoryCardWrapper: {
        margin: 10,
        height: Dimensions.get("window").height / 9,
        backgroundColor: colors.secondary,
        borderRadius: 5,
        // paddingTop: 20,
        // paddingHorizontal: 20,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    categoryCardBgImage: {
        flex: 1,
        justifyContent: "center"
    },
    categoryCardLabel: {
        fontSize: 25,
        fontWeight: "bold",
        color: colors.white,
        position: "absolute",
        bottom: 15,
        left: 15
    },
    galleryImgWrapper: {
        margin: 10,
        width: Dimensions.get("window").width / 3,
        height: Dimensions.get("window").height / 9,
        backgroundColor: colors.secondary,
        borderRadius: 5,
        // paddingTop: 20,
        // paddingHorizontal: 20,
        // flexDirection: 'row',
        overflow: 'hidden',
    },
    shadow: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2
    },
    addImgSelectedImg: {
        marginTop: 50,
        // overflow: 'visible',
        // resizeMode: 'cover',
        width: 300,
        height: 200
        //   opacity: 0.2,
        /*
         * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
         *
         * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
         * source image's size.
         */
        //   marginLeft: -128,
        //   marginBottom: -192,
    },
});