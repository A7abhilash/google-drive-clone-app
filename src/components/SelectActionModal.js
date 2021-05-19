import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {globalColors} from '../styles/styles';

const SelectActionModal = ({
  actionModalVisible,
  setActionModalVisible,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Modal visible={actionModalVisible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.innerView}>
          <Button color={globalColors.Warning} onPress={handleEdit}>
            Edit
          </Button>
          <Button color={globalColors.Danger} onPress={handleDelete}>
            Delete
          </Button>
          <Button
            color={globalColors.Light}
            onPress={() => setActionModalVisible(false)}>
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default SelectActionModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerView: {
    marginHorizontal: 10,
    backgroundColor: globalColors.Gray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
