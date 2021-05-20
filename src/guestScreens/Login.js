import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';
import {useMsg} from '../contexts/MsgContext';
import {globalColors, globalStyles} from '../styles/styles';

export default function Login({navigation}) {
  const {login} = useAuth();
  const {setAlert} = useMsg();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      login(email, password);
    } else {
      setAlert({
        title: 'Invalid',
        msg: "Empty fields aren't allowed",
        text: 'Understood',
      });
    }
  };

  return (
    <View style={{...styles.container, ...globalStyles.component}}>
      <View style={styles.innerView}>
        <Text
          style={{
            ...styles.text,
            ...globalStyles.textTitle,
            color: globalColors.Info,
          }}>
          Login
        </Text>
        <View style={{marginVertical: 10}}>
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.btn}>
          <Button
            mode="contained"
            onPress={handleLogin}
            color={globalColors.Primary}>
            Sign In
          </Button>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.replace('Register')}>
          <Text
            style={{
              ...styles.text,
              ...globalStyles.textSubTitle,
            }}>
            Register new account...
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  innerView: {
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: globalColors.Light,
    borderRadius: 20,
    elevation: 2,
  },
  input: {
    marginVertical: 5,
    height: 55,
  },
  btn: {
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
  },
});
