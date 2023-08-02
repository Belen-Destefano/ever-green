import { Ionicons } from '@expo/vector-icons/';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CartNavigator from './cart';
import OrdersNavigator from './orders';
import ShopNavigator from './shop';
import { COLORS, FONTS } from '../themes';
import { useSelector } from 'react-redux';


const BottomTab = createBottomTabNavigator();

const TabsNavigator = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <BottomTab.Navigator
      initialRouteName="ShopTab"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: FONTS.regular,
          fontSize: 13,
        },
        tabBarStyle: {
          backgroundColor: COLORS.white,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.greyTwo,
        tabBarIconStyle: {
          fontSize: 22,
        },
      
      }}>
      <BottomTab.Screen
        name="ShopTab"
        component={ShopNavigator}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ focused, color }) => {
            return <Ionicons name={focused ? 'home' : 'home-outline'} size={20} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name="CartTab"
        component={CartNavigator}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={20} color={color} />
          ),
          tabBarBadge: cartItems.length,
          tabBarBadgeStyle: {
            backgroundColor: COLORS.secodary,
            color: COLORS.white,
            fontFamily: FONTS.regular,
            fontSize: 11,
          },
        }}
      />
      <BottomTab.Screen
        name="OrdersTab"
        component={OrdersNavigator}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'file-tray' : 'file-tray-outline'} size={20} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default TabsNavigator;