import { View, Text, Button, TouchableOpacity, FlatList, Image, ImageBackground,useWindowDimensions } from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import { Input } from "../../components";
import { COLORS } from "../../themes";
import PRODUCTS from "../../constants/data/products.json";
import CustomText from "../../components/customText/customText";

function Product ({onHandleGoBack, categorySelected}){

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
    const filteredProductsByCategory = PRODUCTS.filter((product)=>product.categoryId == categorySelected.categoryId);

    const filterBySearch = (query)=>{
        let updatedProductList = [...filteredProductsByCategory];
        updatedProductList = updatedProductList.filter((product)=>{
            return product.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
        });

        setFilteredProducts(updatedProductList);
    };

    const clearSearch = () => {
        setSearch('');
        setFilteredProducts([]);

         // no me funciona el set este... no me lo deja vacio. tal vez solo se ve asi en el emulador.---> pendiente
    };


    const {width, height, scale, fontScale} = useWindowDimensions();
    const istablet = width > 650;

    return (
       <View style={styles.container}>       
         

            <TouchableOpacity style={styles.goBack} onPress={onHandleGoBack}>
                <Ionicons onPress={onHandleGoBack} name="arrow-back-circle" size={istablet? 35 : 25} color={COLORS.secodary}/>
                <CustomText style={istablet? styles.goBackTextTablet: styles.goBackText} type="regular">Go Back</CustomText>               
            </TouchableOpacity>
          
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
            renderItem={({item})=> 
            // <View style={[styles.productContainer, {backgroundColor: categorySelected.color}] }> 
            <TouchableOpacity onPress={()=>null} style={ istablet? styles.productContainerTablet : styles.productContainer}> 
                <ImageBackground source={{uri: item.image}} style={istablet? styles.productImageTablet : styles.productImage} resizeMethod="resize" resizeMode="contain" />
                <View style={styles.productDetail}>
                    <CustomText style={istablet? styles.productNameTablet : styles.productName} numberOfLines={1} ellipsizeMode="tail" type="regular">{item.name}</CustomText>         
                    <CustomText style={istablet? styles.productPriceTablet: styles.productPrice} type="bold">{`${item.currency.code} ${item.price}`} 
                    </CustomText>
                </View>
            </TouchableOpacity>} contentContainerStyle={styles.productsContent}
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