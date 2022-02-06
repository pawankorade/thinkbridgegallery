import { View, Button, SafeAreaView, ScrollView, StatusBar, useColorScheme, Text, TextInput, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { styles } from '../styles/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GalleryContext, TbGalleryStackParamList } from '../../App';

type MainScreenProp = NativeStackNavigationProp<TbGalleryStackParamList, 'AddCategory'>;

const AddCategory = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const navigation = useNavigation<MainScreenProp>();

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const tbGalleryContext = useContext(GalleryContext);

    const [newCategory, setNewCategory] = useState("");
    const [addCatBtnDisable, setAddCatBtnDisable] = useState(true);

    useEffect(() => {
        const newValue = newCategory.split(" ").join("").toLowerCase();
        const found = tbGalleryContext.tbGallery.categories.some(el => el.value === newValue);
        // console.warn(found);
        (newCategory!== "" && !found) ? setAddCatBtnDisable(false) : setAddCatBtnDisable(true);
    }, [newCategory]);

    const addCatToTbGallery = () => {
        const newValue = newCategory.split(" ").join("").toLowerCase();
        // console.warn("add new Category To Tb Gallery");
        tbGalleryContext.tbDispatch({
            "type": "addCategory",
            "categoryObj": {
                value: newValue,
                label: newCategory
            }
        });
        setNewCategory("");
        // navigation.goBack();

    }


    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View style={[backgroundStyle, {
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                // alignItems: "center"
            }]}>
                <Text style={{ marginHorizontal: 25, marginTop: 10, fontWeight: "bold" }}>Category List</Text>
                <FlatList
                    data={tbGalleryContext.tbGallery.categories}
                    renderItem={({ item }) => (
                        <>
                            <Text style={{ marginHorizontal: 30, marginTop: 10 }}>{item.label}-(value: {item.value})</Text>
                        </>
                    )}
                    keyExtractor={item => item.value}
                />

            </View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={[backgroundStyle, styles.screenHeight]}>
                <View style={[{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    alignItems: "center"
                }, styles.screenHeight]}>
                    <View style={[styles.addImgButtonContainer, styles.addImgButtonStyle, { margin: 25 }]}>
                        <TextInput style={{ width: "100%" }} placeholder="Category Label"
                            onChangeText={newText => setNewCategory(newText)}
                            defaultValue={newCategory} />
                    </View>
                    <View style={styles.addImgButtonContainer}>
                        <View style={styles.addImgButtonStyle}>
                            <Button
                                onPress={addCatToTbGallery}
                                title="Add Category"
                                color="#841584"
                                disabled={addCatBtnDisable}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddCategory;
