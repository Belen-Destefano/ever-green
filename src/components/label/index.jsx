import { View } from 'react-native';
import CustomText from '../customText/customText';

import { styles } from './styles';

const Label = ({ children, label, labelStyle, subLabel, subLabelStyle }) => {
  return (
    <View style={styles.container}>
      <CustomText style={[styles.label, labelStyle]} type="medium">{label}</CustomText>
      {children}
      {subLabel && <CustomText style={[styles.subLabel, subLabelStyle]} type="regular">{subLabel}</CustomText>}
    </View>
  );
};

export default Label;