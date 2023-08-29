import { View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from './styles';
import { CartItem } from '../../components';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
  clearCart,
} from '../../store/cart/cart.slice';
import CustomText from '../../components/customText/customText';
import { useCreateOrderMutation } from '../../store/orders/api';

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  const [createOrder, { data, isError, error, isLoading }] = useCreateOrderMutation();

  const onIncreaseCartItem = (id) => {
    dispatch(increaseItemQuantity({ id }));
  };

  const onDecreaseCartItem = (id) => {
    dispatch(decreaseItemQuantity({ id }));
  };

  const onRemoveCartItem = (id) => {
    dispatch(removeItemFromCart({ id }));
  };

  const onCreateOrder = async () => {
    const newOrder = {
      id: Math.floor(Math.random() * 1000),
      items: cart,
      total,
      user: {
        id: 1,
        name: 'John Doe',
        address: '123 Street',
        phone: '123456789',
        email: 'johndoe@gmail.com',
      },
      payment: {
        method: 'VISA',
      },
      delivery: {
        method: 'UPS',
        trackingNumber: Math.floor(Math.random() * 1000),
      },
      createAt: Date.now(),
      finishedAt: '',
    };
    try {
      await createOrder(newOrder);
      dispatch(clearCart());
      navigation.navigate('OrdersTab');
    } catch (e) {
      console.warn({ error, e });
    }
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyCartContainer}>
        <CustomText style={styles.emptyCartText} type="regular">Your cart is empty</CustomText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <CartItem
            {...item}
            onIncreaseCartItem={onIncreaseCartItem}
            onDecreaseCartItem={onDecreaseCartItem}
            onRemoveCartItem={onRemoveCartItem}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listContainer}
      />
      <View style={styles.footerContainer}>
        <TouchableOpacity  onPress={onCreateOrder} style={styles.checkoutButton}>
          <CustomText style={styles.checkoutButtonText} type='bold'>Checkout</CustomText>
          <View style={styles.totalContainer}>
            <CustomText style={styles.totalText} type='bold'>Total:</CustomText>
            <CustomText style={styles.totalPriceText} type='bold'>USD {total}</CustomText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;