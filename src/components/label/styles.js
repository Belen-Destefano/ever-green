import { StyleSheet } from 'react-native';

import { COLORS, FONTS } from '../../themes';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 40,
  },
  label: {
    fontSize: 14,
    paddingVertical: 5,
    color: COLORS.text,
  },
  subLabel: {
    fontSize: 12,    
    paddingVertical: 5,
    color: COLORS.text,
  },
});