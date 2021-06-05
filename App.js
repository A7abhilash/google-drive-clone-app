import React from 'react';
import AppNavigator from './src/AppNavigator';
import {AuthProvider} from './src/contexts/AuthContext';
import {MsgProvider} from './src/contexts/MsgContext';

const App = () => {
  return (
    <MsgProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </MsgProvider>
  );
};

export default App;
