import { StyleSheet } from 'react-native';

import { COLORS, FONTS } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 145,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    padding: 10,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
   
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 5,
  },
  imageContainer: {
    maxWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  detailContainer: {
    justifyContent: 'space-between',
    maxWidth: 190,
    gap: 5,
  },
  name: {
    fontSize: 13,
    // widht para que quede alineado junto con numberOfLines y ellipsizeMode
    width: 180,
   
  },
  price: {
    fontSize: 13,
  },
  qty: {
    fontSize: 12,

  },
  stock: {
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
  actionContainer: {
    gap: 20,
    flexDirection: 'row',
  },
  increaseButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  increaseButtonText: {
    color: COLORS.white,

    fontSize: 14,
  },
  decreaseButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  decreaseButtonText: {
    color: COLORS.white,
  
    fontSize: 14,
  },
  deleteButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  deleteContainer: {},
});