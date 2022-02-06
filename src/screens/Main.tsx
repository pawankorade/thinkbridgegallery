import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import {
    GestureResponderEvent,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { GalleryContext, TbCategoryType, TbGalleryStackParamList } from '../../App';
import FloatingButton from '../commonComponents/FloatingButton';
import { styles } from '../styles/GlobalStyle';

type MainScreenProp = NativeStackNavigationProp<TbGalleryStackParamList, 'Main'>;

const Main = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const navigation = useNavigation<MainScreenProp>();

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const tbGalleryContext = useContext(GalleryContext);

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ScrollView
                // contentInsetAdjustmentBehavior="automatic"
                style={[backgroundStyle, styles.screenHeight]}>
                <View
                    style={[styles.screenHeight, {
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }]}>
                    {
                        tbGalleryContext.tbGallery.categories.map((currCategory: TbCategoryType) => {
                            return (
                                <TouchableOpacity style={[styles.categoryCardWrapper, styles.shadow]} key={currCategory.value} onPress={() => navigation.navigate("Gallery", { category: currCategory.value, categoryName: currCategory.label })}>
                                    <ImageBackground source={{ uri: "https://picsum.photos/400/300?grayscale&blur=2" }} resizeMode="cover" style={styles.categoryCardBgImage}>
                                        <Text style={[styles.categoryCardLabel]}>{currCategory.label}</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            )
                        })
                    }

                    <TouchableOpacity style={[styles.categoryCardWrapper, styles.shadow]} onPress={() => navigation.navigate("AddCategory")}>
                        {/* <ImageBackground source={{ uri: "https://picsum.photos/400/300" }} resizeMode="cover" style={styles.categoryCardBgImage}>
                        </ImageBackground> */}
                            <Text style={[styles.categoryCardLabel]}>{"Add New Category"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <FloatingButton doOnPress={(e: GestureResponderEvent) => navigation.navigate("AddImage")} />
            {/* <FloatingButton doOnPress={(e: GestureResponderEvent) => navigation.navigate()} /> */}
        </SafeAreaView>
    );
};

export default Main;
