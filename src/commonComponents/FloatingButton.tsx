import React from 'react';
import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../styles/GlobalStyle';

type FloatingCartProps = {
    doOnPress: (event: GestureResponderEvent) => void
}

const FloatingButton = ({ doOnPress }: FloatingCartProps) => {
    return (
        <TouchableOpacity
            style={{
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                position: 'absolute',
                bottom: 40,
                right: 40,
                height: 70,
                backgroundColor: colors.primary,
                borderRadius: 10,
                // position: 'absolute',
                // width: 50,
                // height: 50,
                // alignItems: 'center',
                // justifyContent: 'center',
                // right: 30,
                // bottom: 30,
            }}
            onPress={doOnPress}
        >
            <AntDesign name='addfile' size={30} color={colors.textDark} />
        </TouchableOpacity>
    );
};

export default FloatingButton;
