import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native';
import {useFonts} from 'expo-font';


import { Header } from './components';
import { Categories, Products } from './screens';
import { COLORS, FONTS } from './themes';

export default function App() {
 
  const [loaded] = useFonts({
    [FONTS.regular]: require('../assets/fonts/Inter-Regular.ttf'),
    [FONTS.bold]: require('../assets/fonts/Inter-Bold.ttf'),
    [FONTS.medium]: require('../assets/fonts/Inter-Medium.ttf'),
    [FONTS.light]: require('../assets/fonts/Inter-Light.ttf'),
  });
  
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const headerTitle = isCategorySelected? 'PRODUCTS' : 'CATEGORIES'

  const onHandleSelectCategory = ({categoryId, color})=>{
    setSelectedCategory({categoryId, color});
    setIsCategorySelected(!isCategorySelected);
  }

  const onHandleNavigate = () => {
    setIsCategorySelected(!isCategorySelected);
    setSelectedCategory(null);
  }

  if (!loaded) {
    return( 
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={COLORS.primary} size='large'/>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header title={headerTitle} />
        { isCategorySelected? ( 
       <Products onHandleGoBack={onHandleNavigate} categorySelected={selectedCategory}/>
        ): (<Categories onSelectCategory={onHandleSelectCategory}/>) }       
        
      </View>
    </SafeAreaView>
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
