// import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import {useFonts} from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './store';

import { init } from './db';
// import { Header } from './components';
// import { Categories, Products } from './screens';
import { COLORS, FONTS } from './themes';
import RootNavigator from './navigations/index';

init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch((err) => {
    console.log('Initializing db failed');
    console.log(err);
});

export default function App() {
 
  const [loaded] = useFonts({
    [FONTS.regular]: require('../assets/fonts/Inter-Regular.ttf'),
    [FONTS.bold]: require('../assets/fonts/Inter-Bold.ttf'),
    [FONTS.medium]: require('../assets/fonts/Inter-Medium.ttf'),
    [FONTS.light]: require('../assets/fonts/Inter-Light.ttf'),
  });
  
  // const [isCategorySelected, setIsCategorySelected] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState(null);

  // const headerTitle = isCategorySelected? 'PRODUCTS' : 'CATEGORIES'

  // const onHandleSelectCategory = ({categoryId, color})=>{
  //   setSelectedCategory({categoryId, color});
  //   setIsCategorySelected(!isCategorySelected);
  // }

  // const onHandleNavigate = () => {
  //   setIsCategorySelected(!isCategorySelected);
  //   setSelectedCategory(null);
  // }

  if (!loaded) {
    return( 
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={COLORS.primary} size='large'/>
      </View>
    )
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <RootNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  }, 
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
