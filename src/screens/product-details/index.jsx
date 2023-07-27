
import { styles } from './styles';
// import PRODUCTS from '../../constants/data/products.json';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cart/cart.slice';

import CustomText from '../../components/customText/customText';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../themes';


function ProductDetail({ navigation, route }) {

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.data);
  const { color, productId } = route.params;

  const product = products.find((product) => product.id === productId);

  const onAddToCart = () => {
    dispatch(addToCart(product));
  };


  // console.warn({ product });
  return (
    <View style={styles.container}>
      {/* <View style={[styles.containerImage, { backgroundColor: color }]}> */}
      <View style={[styles.containerImage, { backgroundColor: COLORS.background }]}>
      {/* <View style={styles.containerImage}> */}
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
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ProductDetail;