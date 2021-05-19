import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Divider} from 'react-native-paper';
import DisplayChildFiles from '../components/DisplayChildFiles';
import DisplayChildFolders from '../components/DisplayChildFolders';
// import DisplayChildFolders from '../components/DisplayChildFolders';
import useFolder from '../hooks/useFolder';
import {globalColors, globalStyles} from '../styles/styles';

export default function Dashboard({navigation, route}) {
  const {params} = route;
  const {currentFolder, childFolders, childFiles} = useFolder(params?.folderId);
  //   console.log('childFiles:', childFiles);

  return (
    <View style={globalStyles.component}>
      <View style={styles.topView}>
        <Text
          onPress={() => navigation.navigate('Dashboard', {folderId: null})}>
          Dashboard
        </Text>
      </View>
      <View style={{marginTop: 5}}>
        {childFolders && (
          <DisplayChildFolders
            folders={childFolders}
            navigateToFolder={navigation.navigate}
          />
        )}
        {childFolders?.length > 0 && childFiles?.length > 0 && (
          <Divider
            style={{
              marginVertical: 5,
              backgroundColor: globalColors.Secondary,
            }}
          />
        )}
        {childFiles && <DisplayChildFiles files={childFiles} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    marginVertical: 10,
  },
});
