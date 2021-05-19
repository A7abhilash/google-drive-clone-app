import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  component: {
    flex: 1,
    backgroundColor: '#eee',
    paddingHorizontal: 20,
  },
  textTitle: {
    fontSize: 30,
  },
  textSubTitle: {
    fontSize: 18,
  },
});

const globalColors = {
  Dark: '#343a40',
  Secondary: '#6c757d',
  Light: '#f8f9fa',
  Danger: '#dc3545',
  Success: '#28a745',
  Warning: '#ffc107',
  Primary: '#0275d8',
  Info: '#5bc0de',
};

export {globalStyles, globalColors};
