import React from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';
import {Divider} from 'react-native-paper';
import DisplayChildFiles from '../components/DisplayChildFiles';
import DisplayChildFolders from '../components/DisplayChildFolders';
import FoldersBreadcrumb from '../components/FoldersBreadcrumb';
import AddNewFolderButton from '../components/AddNewFolderButton';
import AddNewFileButton from '../components/AddNewFileButton';
import Header from '../containers/Header';
import useFolder from '../hooks/useFolder';
import {globalColors, globalStyles} from '../styles/styles';

export default function Dashboard({navigation, route}) {
  const {params} = route;
  const {currentFolder, childFolders, childFiles} = useFolder(params?.folderId);
  //   console.log('childFiles:', childFiles);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header navigateToProfile={() => navigation.navigate('Profile')} />
      <View style={globalStyles.component}>
        <View style={styles.topView}>
          {currentFolder && (
            <FoldersBreadcrumb
              path={currentFolder.path}
              currentFolder={currentFolder}
              navigateToFolder={navigation.navigate}
            />
          )}
        </View>
        <View style={styles.midView}>
          {childFolders && (
            <DisplayChildFolders
              folders={childFolders}
              navigateToFolder={navigation.navigate}
            />
          )}
          {childFolders?.length > 0 && childFiles?.length > 0 && (
            <Divider style={styles.divider} />
          )}
          {childFiles && <DisplayChildFiles files={childFiles} />}
          <AddNewFolderButton currentFolder={currentFolder} />
          <AddNewFileButton currentFolder={currentFolder} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topView: {
    margin: 10,
  },
  midView: {
    marginTop: 5,
    flex: 1,
    backgroundColor: globalColors.Light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 2,
  },
  divider: {
    marginVertical: 5,
    backgroundColor: globalColors.Secondary,
  },
});
