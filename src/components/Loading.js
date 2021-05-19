import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {globalColors, globalStyles} from '../styles/styles';

export default function Loading() {
  return (
    <View style={globalStyles.component}>
      <ActivityIndicator color={globalColors.Warning} />
    </View>
  );
}
