import React from 'react';
import AppNavigator from './src/AppNavigator';
import {AuthProvider} from './src/contexts/AuthContext';
import {DBProvider} from './src/contexts/DBContext';
import {MsgProvider} from './src/contexts/MsgContext';

const App = () => {
  return (
    <MsgProvider>
      <AuthProvider>
        <DBProvider>
          <AppNavigator />
        </DBProvider>
      </AuthProvider>
    </MsgProvider>
  );
};

export default App;
