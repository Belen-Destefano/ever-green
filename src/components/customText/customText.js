import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {FONTS} from '../../themes'

const CustomText = ({ type = 'regular', style, ...rest }) => {
  let fontFamily;

  switch (type) {
    case 'regular':
      fontFamily = FONTS.regular;
      break;
    case 'medium':
      fontFamily = FONTS.medium;
      break;
    case 'bold':
      fontFamily = FONTS.bold;
      break;
    case 'light':
      fontFamily = FONTS.light;
      break;

    default:
      fontFamily = FONTS.regular;
  }

  return (
    <Text style={[styles.text, { fontFamily }, style]} {...rest} />
  );
};

const styles = StyleSheet.create({
  text: {
  
  },
});

export default CustomText;
