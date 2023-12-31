import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text, View } from 'react-native';
import CustomText from '../customText/customText';
import { styles } from './styles';
import { COLORS } from '../../themes';

const MenuItem = ({ icon, title, route, onSelect }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={() => onSelect({ route, title })}>
        <Ionicons name={icon} size={24} color={COLORS.secodary} />
        <CustomText style={styles.title} type="medium">{title}</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default MenuItem;