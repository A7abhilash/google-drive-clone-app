import React from 'react';
import {
  FlatList,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Subheading} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {globalColors} from '../styles/styles';

const DisplayChildFiles = ({files}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      key={item.id}
      style={styles.file}
      onPress={() => Linking.openURL(item.url)}>
      <MaterialIcons
        name="file-copy"
        size={22}
        color={globalColors.Dark}
        style={{marginRight: 5}}
      />
      <Subheading>{item.name}</Subheading>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={files}
      keyExtractor={item => `${item.id}`}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      horizontal
    />
  );
};

export default DisplayChildFiles;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    paddingVertical: 10,
  },
  file: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: globalColors.Dark,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
});
