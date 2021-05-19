import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';
import {globalColors, globalStyles} from '../styles/styles';

export default function Profile() {
  const {currentUser, logout} = useAuth();

  return (
    <View style={globalStyles.component}>
      <Card style={styles.card}>
        <Card.Title title={currentUser.email} subtitle="Profile" />
        <Card.Actions>
          <Button color={globalColors.Danger} onPress={logout}>
            Logout
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 200,
  },
});
