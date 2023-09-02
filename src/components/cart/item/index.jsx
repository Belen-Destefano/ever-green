import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Image } from 'react-native';


import { styles } from './styles';
import { COLORS } from '../../../themes';
import CustomText from '../../customText/customText';

const CartItem = ({ id, categoryId, name, price, image, currency, quantity, stock, onIncreaseCartItem, onDecreaseCartItem,onRemoveCartItem, ...props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.detailContainer}>
        <CustomText style={styles.name} type="regular" numberOfLines={1} ellipsizeMode="tail">{name}</CustomText>
        <CustomText style={styles.price} type="bold">{`${currency.code} ${price}`}</CustomText>
        <CustomText style={styles.qty} type="regular">{`qty: ${quantity} `}</CustomText>
        {/* <CustomText style={styles.qty} type="regular">{`qty: ${quantity} stock: ${stock}`}</CustomText> */}
        <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.increaseButton} onPress={() => onIncreaseCartItem(id)}>
            <CustomText style={styles.increaseButtonText} type="bold">+</CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.decreaseButton} onPress={() => onDecreaseCartItem(id)}>
            <CustomText style={styles.decreaseButtonText} type="bold">-</CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onRemoveCartItem(id)} style={styles.deleteButton}>
            <Ionicons name="trash" size={14} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;