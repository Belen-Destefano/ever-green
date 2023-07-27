import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { CategoryItem } from '../../components';
// import CATEGORIES  from '../../constants/data/categories.json';
import { useSelector } from 'react-redux';

import {styles} from './styles'

import { ORIENTATION } from '../../constants/orientation';
import useOrientation from '../../hooks/useOrientation';



function Categories({ navigation }) {
  
  const categories = useSelector((state) => state.categories.data);
  const orientation = useOrientation();

  const onSelectCategory = ({ categoryId, color, name }) => {
    navigation.navigate('Products', { categoryId, color, name });
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>       
        <FlatList
          style={styles.categoryContainer} contentContainerStyle={styles.listCategory}
          data={categories}
          renderItem={({ item }) => <CategoryItem {...item} onSelectCategory={()=>onSelectCategory({categoryId: item.id, color:item.backgroundColor, name:item.name})}  style={orientation === ORIENTATION.LANDSCAPE ? styles.categoryItemLandscape : {}}/>}
          keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false}
        />              
      </View>
    </SafeAreaView>
  );
}
export default Categories;