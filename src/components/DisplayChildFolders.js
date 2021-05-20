import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Caption, Subheading} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {globalColors} from '../styles/styles';

const {width} = Dimensions.get('screen');

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
      <Subheading>
        {item.name.length > 13
          ? `${item.name.substring(0, 13)} ...`
          : item.name}
      </Subheading>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={folders}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={folders.length && <Caption>Folders</Caption>}
        ListHeaderComponentStyle={{marginBottom: 5}}
      />
    </View>
  );
};

export default DisplayChildFolders;

const styles = StyleSheet.create({
  folder: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: globalColors.Dark,
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginBottom: 10,
    width: (width - 55) / 2,
  },
});
