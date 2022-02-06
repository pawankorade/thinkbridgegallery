import { View, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, useColorScheme, ImageBackground } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GalleryContext, TbGalleryImageObjType, TbGalleryStackParamList } from '../../App';
import { RouteProp, useRoute } from '@react-navigation/native';
import { styles } from '../styles/GlobalStyle';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type MainScreenProp = NativeStackNavigationProp<TbGalleryStackParamList, 'Gallery'>;

const Gallery = () => {
    const route = useRoute<RouteProp<TbGalleryStackParamList, 'Gallery'>>();

    const tbGalleryContext = useContext(GalleryContext);

    const [imgAsCategoy, setImgAsCategoy] = useState<TbGalleryImageObjType[]>([]);

    useEffect(() => {
        console.log("Category => ", route.params.category);
        setImgAsCategoy(tbGalleryContext.tbGallery.images.filter((imageObj) => {
            return imageObj.imageCategories.includes(route.params.category)
        }));
    }, []);

    useEffect(() => {
        console.log("Gallery => ", imgAsCategoy);
    }, [imgAsCategoy]);
    
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={[backgroundStyle, styles.screenHeight]}>
                <View style={[styles.screenHeight, {
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-around"
                    }]}>
                        {
                            imgAsCategoy && imgAsCategoy.map(imgObj => {
                                return (
                                    <TouchableOpacity key={imgObj.imageData.creationDate} style={[styles.galleryImgWrapper, styles.shadow]} onPress={() => {}}>
                                        <ImageBackground source={{ uri: imgObj.imageData.path }} resizeMode="cover" style={styles.categoryCardBgImage}>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                )
                            })
                        }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Gallery;
