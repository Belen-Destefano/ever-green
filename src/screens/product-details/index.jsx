
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cart/cart.slice';

import CustomText from '../../components/customText/customText';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../themes';
import { useGetProductByIdQuery } from '../../store/products/api';


function ProductDetail({ navigation, route }) {

  const dispatch = useDispatch();

  const { color, productId } = route.params;

  const { data, isLoading, error } = useGetProductByIdQuery(productId);

  const product = data?.find((product) => product.id === productId);

  const onAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (isLoading)
  return (
    <View style={styles.containerLoader}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );



  return (
    <ScrollView style={styles.container}>

      <View style={[styles.containerImage, { backgroundColor: COLORS.background }]}>

        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        <CustomText style={styles.name} type="bold">{product.name}</CustomText>
        <CustomText style={styles.description}type="regular">{product.description}</CustomText>
        <CustomText style={styles.price} type="bold">USD {product.price}</CustomText>
        <CustomText style={styles.tagTitle} type="bold">Tags</CustomText>
        <View style={styles.containerTags}>
          {product.tags.map((tag) => (
            <TouchableOpacity key={tag} style={[styles.containerTag, { backgroundColor: color }]}>
              <CustomText style={styles.tag}>{tag}</CustomText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity onPress={onAddToCart} style={styles.addToCartButton}>
            <CustomText style={styles.addToCartText} type="medium">Add to cart</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProductDetail;