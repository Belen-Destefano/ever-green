import React from 'react';
import { FlatList, SafeAreaView, View, useWindowDimensions } from 'react-native';
import { CategoryItem } from '../../components';
import CATEGORIES  from '../../constants/data/categories.json';
import {styles} from './styles'



function Categories({onSelectCategory}) {
  
  const {width, height, scale, fontScale} = useWindowDimensions();

  // console.warn ({
  //   width, height, scale, 
  //   fontScale,  
  // })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>       
        <FlatList
          style={styles.categoryContainer} contentContainerStyle={styles.listCategory}
          data={CATEGORIES}
          renderItem={({ item }) => <CategoryItem {...item} onSelectCategory={()=>onSelectCategory({categoryId: item.id, color:item.backgroundColor})}/>}
          keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false}
        />              
      </View>
    </SafeAreaView>
  );
}
export default Categories;