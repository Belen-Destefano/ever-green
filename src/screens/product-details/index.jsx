
import { styles } from './styles';
import PRODUCTS from '../../constants/data/products.json';
import CustomText from '../../components/customText/customText';
import { Image, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../themes';

function ProductDetail({ navigation, route }) {
  const { color, productId } = route.params;

  const product = PRODUCTS.find((product) => product.id === productId);

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
      </View>
    </View>
  );
}

export default ProductDetail;