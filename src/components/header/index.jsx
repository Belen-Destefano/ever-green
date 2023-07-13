import { View, useWindowDimensions } from 'react-native';

import { styles } from './styles';
import CustomText from '../customText/customText';

const Header = ({ title }) => {

  
  const {width} = useWindowDimensions();
  const istablet = width > 650;

  return (
    <View style={istablet ? styles.containerTablet : styles.container}>

      <CustomText type="bold" style={ istablet? styles.titleTablet : styles.title}>
        {title}
      </CustomText>

    </View>
  );
};

export default Header;