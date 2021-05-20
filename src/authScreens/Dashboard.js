import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Divider} from 'react-native-paper';
import DisplayChildFiles from '../components/DisplayChildFiles';
import DisplayChildFolders from '../components/DisplayChildFolders';
import Header from '../containers/Header';
import useFolder from '../hooks/useFolder';
import {globalColors, globalStyles} from '../styles/styles';

export default function Dashboard({navigation, route}) {
  const {params} = route;
  const {currentFolder, childFolders, childFiles} = useFolder(params?.folderId);
  //   console.log('childFiles:', childFiles);

  return (
    <>
      <Header navigateToProfile={() => navigation.navigate('Profile')} />
      <View style={globalStyles.component}>
        <View style={styles.topView}>
          <Text
            onPress={() => navigation.navigate('Dashboard', {folderId: null})}>
            Dashboard
          </Text>
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
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topView: {
    marginVertical: 10,
    flex: 0.15,
  },
  midView: {
    marginTop: 5,
    flex: 0.85,
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
