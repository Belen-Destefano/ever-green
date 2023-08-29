import { TouchableOpacity, Text, View } from 'react-native';
import CustomText from '../../customText/customText';
import { styles } from './styles';

const formatDate = (time) => {
  const date = new Date(time);
  return date.toLocaleDateString();
};

const OrderItem = ({ id, total, createAt, items }) => {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.orderItemContainer}>
      <View style={styles.orderHeaderContainer}>
        <CustomText style={styles.orderItemDate} type="medium">{formatDate(createAt)}</CustomText>
      </View>
      <View style={styles.orderBody}>
        <CustomText style={styles.orderItemId} type="regular">Id: {id}</CustomText>
        <CustomText style={styles.orderItemTotal} type="bold">USD {total}</CustomText>
        <CustomText style={styles.orderItemId} type="regular">Total Items: {items.length}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;