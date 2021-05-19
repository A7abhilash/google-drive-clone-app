import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../authScreens/Dashboard';
import Profile from '../authScreens/Profile';

export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function ProfileIcon() {}
