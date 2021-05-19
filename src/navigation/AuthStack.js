import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../authScreens/Profile';

export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
