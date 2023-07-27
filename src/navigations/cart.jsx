import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Cart } from '../screens';
import { COLORS, FONTS } from '../themes';
import { Logo } from "../components";


const Stack = createNativeStackNavigator();

const CartNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: COLORS.primary,
          height: 80,
        },
        headerTitleStyle: {
          fontFamily: FONTS.bold,
          fontSize: 16,
        },
        headerTintColor: COLORS.white,
        animation: 'fade_from_bottom',
        headerRight: () => <Logo />
      })}>
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
};

export default CartNavigator;