import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from './contexts/AuthContext';
import AuthStack from './navigation/AuthStack';
import GuestStack from './navigation/GuestStack';

export default function AppNavigator() {
  const {currentUser} = useAuth();

  return (
    <NavigationContainer>
      {currentUser ? <AuthStack /> : <GuestStack />}
    </NavigationContainer>
  );
}
