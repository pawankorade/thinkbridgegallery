import React, { useContext, useEffect, useState } from 'react';
import {
    Button,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { styles } from '../styles/GlobalStyle';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { GalleryContext, TbGalleryStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MultiselectDropdown } from 'sharingan-rn-modal-dropdown';

type MainScreenProp = NativeStackNavigationProp<TbGalleryStackParamList, 'AddImage'>;

const AddImage = () => {

    const defaultImgPath = "https://via.placeholder.com/400x300/09f/fff.jpg?text=Please+select+OR+click+image";

    const navigation = useNavigation<MainScreenProp>();

    const [imageObj, setImageObj] = useState<ImageOrVideo>({} as ImageOrVideo);
    const [image, setImage] = useState(defaultImgPath);
    const [addGalBtnDisable, setAddGalBtnDisable] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const tbGalleryContext = useContext(GalleryContext);

    useEffect(() => {
        imageObj && ('path' in imageObj) ? setImage(imageObj.path) : setImage(defaultImgPath);
    }, [imageObj]);

    useEffect(() => {
        image !== defaultImgPath ? setAddGalBtnDisable(false) : setAddGalBtnDisable(true);
    }, [image]);

    useEffect(() => {
        console.log("selectedCategories => ", selectedCategories);
    }, [selectedCategories]);

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const takePhotoFromCamera = () => {
        // console.warn("open camera");
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            // console.log(image);
            setImageObj(image);
        });
    }

    const selectPhotoFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false
        }).then(image => {
            // console.log(image);
            setImageObj(image);
        });
    }

    const addToTbGallery = () => {
        // console.warn("add To Tb Gallery");
        tbGalleryContext.tbDispatch({
            "type": "addImage",
            "imageObj": {
                imageData: imageObj,
                imageCategories: selectedCategories
            }
        });
        navigation.goBack();

    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={[backgroundStyle, styles.screenHeight]}>
                <View style={[{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    alignItems: "center"
                }, styles.screenHeight]}>
                    <Image style={styles.addImgSelectedImg} source={{
                        uri: image
                    }} />
                    <View style={styles.addImgButtonContainer}>
                        <View style={styles.addImgButtonStyle}>
                            <Button
                                onPress={takePhotoFromCamera}
                                title="Camera"
                                color="#841584"
                            />
                        </View>
                        <View style={styles.addImgButtonStyle}>
                            <Button
                                onPress={selectPhotoFromGallery}
                                title="Gallery"
                                color="#841584"
                            />
                        </View>
                    </View>
                    <View style={{ width: 300 }}>
                        <MultiselectDropdown
                            label="Select categories"
                            data={tbGalleryContext.tbGallery.categories}
                            enableSearch
                            chipType="outlined"
                            value={selectedCategories}
                            onChange={setSelectedCategories}
                            disabled={addGalBtnDisable}
                        />
                    </View>
                    <View style={styles.addImgButtonContainer}>
                        <View style={styles.addImgButtonStyle}>
                            <Button
                                onPress={addToTbGallery}
                                title="Add the chosen image to the gallery"
                                color="#841584"
                                disabled={addGalBtnDisable}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddImage;
