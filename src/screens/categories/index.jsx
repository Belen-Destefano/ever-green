import React from 'react';
import {  FlatList, SafeAreaView, View } from 'react-native';
import { CategoryItem, LoadingIndicator } from '../../components';


import {styles} from './styles'

import { ORIENTATION } from '../../constants/orientation';
import useOrientation from '../../hooks/useOrientation';
import { useGetCategoriesQuery } from '../../store/categories/api';




function Categories({ navigation }) {
  
 
  const { data, error, isLoading } = useGetCategoriesQuery();

  const orientation = useOrientation();

  const onSelectCategory = ({ categoryId, color, name }) => {
    navigation.navigate('Products', { categoryId, color, name });
  };

 
  if (isLoading) {
    return <LoadingIndicator />;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>       
        <FlatList
          style={styles.categoryContainer} contentContainerStyle={styles.listCategory}
          data={data}
          renderItem={({ item }) => <CategoryItem {...item} onSelectCategory={()=>onSelectCategory({categoryId: item.id, color:item.backgroundColor, name:item.name})}  style={orientation === ORIENTATION.LANDSCAPE ? styles.categoryItemLandscape : {}}/>}
          keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false}
        />              
      </View>
    </SafeAreaView>
  );
}
export default Categories;