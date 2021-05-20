import React from 'react';
import {Appbar} from 'react-native-paper';
import {globalColors} from '../styles/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = ({navigateToProfile}) => {
  return (
    <Appbar.Header style={{backgroundColor: globalColors.Light}}>
      <Appbar.Content title="Google Drive Clone" />
      <Appbar.Action
        icon={() => (
          <MaterialIcons
            name="account-circle"
            size={26}
            color={globalColors.Dark}
          />
        )}
        onPress={navigateToProfile}
      />
    </Appbar.Header>
  );
};

export default Header;
