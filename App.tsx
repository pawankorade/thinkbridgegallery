/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { createContext, Reducer, useEffect, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/screens/Main';
import AddImage from './src/screens/AddImage';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import TestComponent from './src/screens/TestComponent';
import AddCategory from './src/screens/AddCategory';
import Gallery from './src/screens/Gallery';

export type TbGalleryStackParamList = {
  Main: undefined;
  Gallery: { category: string, categoryName: string };
  AddImage: undefined;
  AddCategory: undefined;
  TestComponent: undefined;
};

const TbGalleryStack = createNativeStackNavigator<TbGalleryStackParamList>();

type tbGlobalContextType = {
  tbGallery: globalStateObj
  tbDispatch: React.Dispatch<globalStateActions>
}

export const GalleryContext = createContext<tbGlobalContextType>({} as tbGlobalContextType);

export type TbGalleryImageObjType = {
  imageData: ImageOrVideo,
  imageCategories: string[]
}

export type TbCategoryType = {
  value: string
  label: string
}

type globalStateObj = {
  images: TbGalleryImageObjType[]
  categories: TbCategoryType[]
}

type addImageActions = {
  type: "addImage"
  imageObj: TbGalleryImageObjType
}
type addCategoryActions = {
  type: "addCategory",
  categoryObj: TbCategoryType
}

type globalStateActions = addImageActions | addCategoryActions

const initialGlobalState: globalStateObj = {
  images: [],
  categories: [
    {
      value: 'favorite',
      label: 'My Favorite',
    },
    {
      value: 'landscape',
      label: 'Landscape',
    },
    {
      value: 'abstract',
      label: 'Abstract',
    },
    {
      value: 'portrait',
      label: 'Portrait',
    },
  ]
};

const reducer: Reducer<globalStateObj, globalStateActions> = (state, action) => {
  switch (action.type) {
    case "addImage":
      return { ...state, images: [...state.images, action.imageObj] };

    case "addCategory":
      return { ...state, categories: [...state.categories, action.categoryObj] };

    default:
      return state;
  }
}

const App = () => {
  const [thinkBridgeGallery, thinkBridgeDispatch] = useReducer(reducer, initialGlobalState);
  useEffect(() => {
    console.log("thinkBridgeGallery changed =>", thinkBridgeGallery.images);
  }, [thinkBridgeGallery]);

  return (
    <GalleryContext.Provider
      value={{
        "tbGallery": thinkBridgeGallery,
        "tbDispatch": thinkBridgeDispatch,
      }}
    >
      <NavigationContainer>
        <TbGalleryStack.Navigator>
          <TbGalleryStack.Screen name="Main" component={Main} options={{ title: 'ThinkBridge Gallery' }} />
          <TbGalleryStack.Screen name="AddImage" component={AddImage} options={{ title: 'Add Image' }} />
          <TbGalleryStack.Screen name="AddCategory" component={AddCategory} options={{ title: 'Add Category' }} />
          <TbGalleryStack.Screen name="Gallery" component={Gallery}
            // options={{ title: 'Gallery' }}
            options={({ route, navigation }) => ({
              title: route.params.categoryName,
            })}
          />
          <TbGalleryStack.Screen name="TestComponent" component={TestComponent} options={{ title: 'Test Component' }} />
        </TbGalleryStack.Navigator>
      </NavigationContainer>
    </GalleryContext.Provider>
  );
};

export default App;
