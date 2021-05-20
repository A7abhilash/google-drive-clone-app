import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalColors} from '../styles/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function FoldersBreadcrumb({path, currentFolder, navigateToFolder}) {
  return (
    <View style={styles.breadcrumb}>
      {path.map(item => (
        <View key={item.id} style={styles.breadcrumbItem}>
          <TouchableOpacity
            onPress={() => navigateToFolder('Dashboard', {folderId: item.id})}
            disabled={item.id === currentFolder.id}
            style={styles.innerView}>
            <MaterialIcons
              name="chevron-right"
              size={22}
              color={globalColors.Dark}
            />
            <Text style={{...styles.text, color: globalColors.Info}}>
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      {currentFolder.id !== null && (
        <View
          key={currentFolder.id}
          style={{...styles.breadcrumbItem, ...styles.innerView}}>
          <MaterialIcons
            name="chevron-right"
            size={22}
            color={globalColors.Dark}
          />
          <Text style={{...styles.text, color: globalColors.Dark}}>
            {currentFolder.name}
          </Text>
        </View>
      )}
    </View>
  );
}

export default FoldersBreadcrumb;

const styles = StyleSheet.create({
  breadcrumb: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  breadcrumbItem: {
    marginBottom: 5,
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});
