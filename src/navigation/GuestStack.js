import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../guestScreens/Login';
import Register from '../guestScreens/Register';

export default function GuestStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
