import React from 'react';
import {
  Dimensions,
  FlatList,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Subheading, Caption} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {globalColors} from '../styles/styles';

const {width} = Dimensions.get('screen');

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
      <Subheading>
        {item.name.length > 13
          ? `${item.name.substring(0, 13)} ...`
          : item.name}
      </Subheading>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={files}
      keyExtractor={item => `${item.id}`}
      renderItem={renderItem}
      numColumns={2}
      ListHeaderComponent={files.length && <Caption>Files</Caption>}
      ListHeaderComponentStyle={{marginBottom: 5}}
    />
  );
};

export default DisplayChildFiles;

const styles = StyleSheet.create({
  file: {
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
