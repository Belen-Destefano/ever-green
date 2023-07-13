import { View, Text } from 'react-native';

import { styles } from './styles';
import CustomText from '../customText/customText';

const Header = ({ title }) => {
  return (
    <View style={styles.container}>

      <CustomText type="bold" style={styles.title}>
        {title}
      </CustomText>

      {/* <Text style={styles.title}>{title}</Text> */}
    </View>
  );
};

export default Header;