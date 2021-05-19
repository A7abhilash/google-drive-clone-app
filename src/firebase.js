// import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const database = {
  folders: userId =>
    firestore().collection('gd').doc(userId).collection('folders'),
  files: userId => firestore().collection('gd').doc(userId).collection('files'),
  formatDocument: doc => ({id: doc.id, ...doc.data()}),
  getCurrentTimestamp: firestore.FieldValue.serverTimestamp,
};

export {database, storage};
