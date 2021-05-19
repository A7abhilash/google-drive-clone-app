import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Subheading} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {globalColors} from '../styles/styles';

const DisplayChildFolders = ({folders, navigateToFolder}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.folder}
      onPress={() => navigateToFolder('Dashboard', {folderId: item.id})}>
      <MaterialIcons
        name="folder"
        size={22}
        color={globalColors.Dark}
        style={{marginRight: 5}}
      />
      <Subheading>{item.name}</Subheading>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={folders}
      keyExtractor={item => `${item.id}`}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      horizontal
    />
  );
};

export default DisplayChildFolders;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  folder: {
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
