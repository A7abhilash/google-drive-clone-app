import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useMsg} from './MsgContext';
import Loading from '../containers/Loading';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children}) {
  const {setToast} = useMsg();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      // console.log(error);
      setToast(error.message);
    }
  };

  const register = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      // console.log(error);
      setToast(error.message);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      // console.log(error);
      setToast(error.message);
    }
  };

  useEffect(() => {
    return auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{currentUser, loading, login, register, logout}}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
