import React, {useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../contexts/AuthContext';
import {useMsg} from '../contexts/MsgContext';
import {database} from '../firebase';
import {globalColors} from '../styles/styles';

const AddNewFolderButton = ({currentFolder}) => {
  const {currentUser} = useAuth();
  const {setAlert, setToast} = useMsg();
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleCreate = async () => {
    if (name) {
      try {
        let path = [...currentFolder.path];
        if (currentFolder.id !== null) {
          path.push({name: currentFolder.name, id: currentFolder.id});
        }
        let newFolder = {
          name,
          parentId: currentFolder.id,
          path,
          createdAt: database.getCurrentTimestamp(),
        };
        await database.folders(currentUser.uid).add(newFolder);
        setToast('New folder created.');
      } catch (error) {
        setAlert({
          title: 'Error',
          msg: error.message,
          text: 'Ok',
        });
      } finally {
        setName('');
        setOpenModal(false);
      }
    } else {
      setAlert({
        title: 'Invalid',
        msg: "Empty fields aren't allowed!",
        text: 'Understood',
      });
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <MaterialIcons
          name="create-new-folder"
          size={28}
          color={globalColors.Success}
        />
      </TouchableOpacity>
      <Modal visible={openModal} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.innerView}>
            <TextInput
              mode="outlined"
              style={styles.input}
              label="Folder Name"
              value={name}
              onChangeText={setName}
              autoFocus
            />
            <Button
              color={globalColors.Success}
              style={{marginHorizontal: 20}}
              onPress={handleCreate}>
              Create
            </Button>
            <Button
              color={globalColors.Secondary}
              onPress={() => setOpenModal(false)}
              style={styles.cancelBtn}>
              <MaterialIcons
                name="cancel"
                size={36}
                color={globalColors.Dark}
              />
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AddNewFolderButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: globalColors.Light,
    elevation: 5,
    bottom: 15,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(238, 238, 238, 0.685)',
  },
  innerView: {
    marginHorizontal: 15,
    borderRadius: 20,
    backgroundColor: globalColors.Light,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  input: {
    marginBottom: 10,
    marginHorizontal: 20,
    height: 55,
  },
  cancelBtn: {
    position: 'absolute',
    right: -20,
    top: -20,
  },
});
