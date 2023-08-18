import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, FONTS } from '../../themes';

const logoUri = 'https://i.postimg.cc/MpfyWV3X/Logo-Makr-3-Fy3yb.png';
const { width: windowWidth } = Dimensions.get('window');
const logoSize = windowWidth * 0.1; 

function LogoComponent() {
  return (
    <TouchableOpacity style={styles.logoContainer} onPress={() => console.log('Logo pressed!')}>
      <Image source={{ uri: logoUri }} style={[styles.logoImage, { width: logoSize, height: logoSize }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginRight: Platform.OS === 'android' ? 15 : 0,
    padding: 2, 
  },
  logoImage: {
    resizeMode: 'contain', 
    shadowColor: '#000', 
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5, 
  },
});

export default LogoComponent;
