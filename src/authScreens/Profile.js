import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';
import {globalColors, globalStyles} from '../styles/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Profile() {
  const {currentUser, logout} = useAuth();

  return (
    <View style={{...globalStyles.component, paddingHorizontal: 20}}>
      <View style={styles.view} />
      <Card style={styles.card}>
        {/* <Card.Content>
          <Headline>Profile</Headline>
        </Card.Content> */}
        <Card.Title
          title={currentUser.email}
          subtitle="Email"
          left={() => (
            <MaterialIcons
              name="account-circle"
              size={40}
              color={globalColors.Dark}
            />
          )}
        />
        <Card.Actions>
          <Button
            mode="contained"
            icon={() => (
              <MaterialIcons
                name="logout"
                size={25}
                color={globalColors.Light}
              />
            )}
            style={{marginLeft: 15}}
            color={globalColors.Danger}
            onPress={logout}>
            Logout
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {flex: 0.45},
  card: {
    borderRadius: 20,
    elevation: 2,
  },
});
