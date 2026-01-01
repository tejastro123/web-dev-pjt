import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

import { CartProvider } from './context/CartContext';
import RestaurantDetailScreen from './screens/RestaurantDetailScreen';

import CartScreen from './screens/CartScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Restaurants' }} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} options={{ title: 'Menu' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
