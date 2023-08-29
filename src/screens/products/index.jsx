import { View, TouchableOpacity, FlatList, ImageBackground,useWindowDimensions, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import { Input } from '../../components';
import { COLORS } from "../../themes";



import { useGetProductsByCategoryQuery } from '../../store/products/api';
import CustomText from "../../components/customText/customText";


function Product ({ navigation, route }){

    const { categoryId, color } = route.params;
    const { data, error, isLoading } = useGetProductsByCategoryQuery(categoryId);
    const [search, setSearch]= useState('');
    const[filteredProducts, setFilteredProducts] = useState([]);   
    const[borderColor, setBorderColor]= useState(COLORS.primary);

    const onHandleBlur = () =>{

    }
    const onHandleChangeText = (text) =>{
        setSearch(text);
        filterBySearch(text);
    }
    const onHandleFocus = () =>{

    }
    const filteredProductsByCategory = data?.filter((product)=>product.categoryId === categoryId);

    
    // FILTRO POR NAME Y POR TAG 
    const filterBySearch = (query) => {
        let updatedProductList = [...filteredProductsByCategory];
        updatedProductList = updatedProductList.filter((product) => {
          const productName = product.name.toLowerCase();
          const productTags = product.tags.map(tag => tag.toLowerCase());
      
          const nameMatch = productName.includes(query.toLowerCase());
          const tagMatch = productTags.some(tag => tag.includes(query.toLowerCase()));
      
          return nameMatch || tagMatch;
        });
      
        setFilteredProducts(updatedProductList);
    };

    const clearSearch = () => {
        setSearch('');
        setFilteredProducts([]);

    };

    const onSelectProduct = ({ productId, name }) => {
        navigation.navigate('ProductDetail', { productId, color, name });
    };


    const {width} = useWindowDimensions();
    const istablet = width > 650;

    if (isLoading)
    return (
      <View style={styles.containerLoader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );

    return (
       <View style={styles.container}>       
         

            <View style={styles.header}>
                <Input
                    onHandleBlur={onHandleBlur}
                    onHandleChangeText={onHandleChangeText}
                    onHandleFocus={onHandleFocus}
                    value={search}
                    placeholder="Search"
                    borderColor={borderColor}
                />    
                {search.length > 0 && <Ionicons style={styles.clearIcon} onPress={clearSearch} name="close-circle-outline" size={istablet? 45 :30} color={COLORS.secodary} />}
            </View>

            

            <FlatList
            style={styles.products} showsVerticalScrollIndicator={false}
            data={search.length > 0 ? filteredProducts : filteredProductsByCategory}
            renderItem={({item})=> (
        

            <TouchableOpacity onPress={() => onSelectProduct({ productId: item.id, name: item.name })} style={ istablet? styles.productContainerTablet : styles.productContainer}> 
                <ImageBackground source={{uri: item.image}} style={istablet? styles.productImageTablet : styles.productImage} resizeMethod="resize" resizeMode="contain" />
                <View style={styles.productDetail}>
                    <CustomText style={istablet? styles.productNameTablet : styles.productName} numberOfLines={1} ellipsizeMode="tail" type="regular">{item.name}</CustomText>         
                    <CustomText style={istablet? styles.productPriceTablet: styles.productPrice} type="bold">{`${item.currency.code} ${item.price}`} 
                    </CustomText>
                </View>
            </TouchableOpacity>)} 
               
 
            contentContainerStyle={styles.productsContent}
            keyExtractor={(item)=>item.id.toString()} numColumns={2}            
            />
            {filteredProducts.length == 0 && search.length > 0 && (
               <View style ={styles.notFound}> 
                    <CustomText style={istablet? styles.notFoundTextTablet :  styles.notFoundText} type="regular"> No Products Found </CustomText> 
                </View>
            )}



      </View>
    )
}

export default Product;