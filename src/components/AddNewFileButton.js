import React, {useState} from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {ProgressBar, Title} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNFetchBlob from 'rn-fetch-blob';
import {useAuth} from '../contexts/AuthContext';
import {useMsg} from '../contexts/MsgContext';
import {database, storage} from '../firebase';
import {globalColors} from '../styles/styles';

const AddNewFolderButton = ({currentFolder}) => {
  const {currentUser} = useAuth();
  const {setAlert, setToast} = useMsg();
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  const normalizePath = path => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const filePrefix = 'file://';
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
        try {
          path = decodeURI(path);
        } catch (error) {
          console.log(error);
        }
      }
    }
    return path;
  };

  const handleSelectFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      //   console.log('URI : ' + file.uri);
      const path = normalizePath(file.uri);
      const res = await RNFetchBlob.fs.readFile(path, 'base64');
      //   console.log(res);
      handleUpload(res, file);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        setToast('Process canceled');
      } else {
        //For Unknown Error
        setAlert({
          title: 'Unknown Error:',
          msg: JSON.stringify(err),
          text: 'OK',
        });
        throw err;
      }
    }
  };

  const handleUpload = (res, file) => {
    // console.log(file);
    try {
      const uploadTask = storage()
        .ref()
        .child(`/gd/${Date.now()}`)
        .putString(res, 'base64', {contentType: file.type});
      setOpenModal(true);
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   console.log('Upload is ' + progress + '% done');
          setUploadProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              setStatus('Upload is paused');
              break;
            case 'running':
              setStatus('Upload is running');
              break;
            default:
              setStatus(snapshot.state);
          }
        },
        error => {
          setAlert({title: 'Error', msg: error.code, text: 'OK'});
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(async downloadURL => {
            // console.log('File available at', downloadURL);
            setStatus('Saving file to database...');
            let newFile = {
              name: file.name,
              url: downloadURL,
              parentId: currentFolder.id,
              createdAt: database.getCurrentTimestamp(),
            };
            await database.files(currentUser.uid).add(newFile);
            setToast('Your file was uploaded successfully');
            setOpenModal(false);
            setUploadProgress(null);
            setStatus(null);
          });
        },
      );
    } catch (error) {
      console.log(error);
      setOpenModal(false);
      setAlert({
        title: 'Error',
        msg: 'Failed to upload your image!!',
        text: 'OK',
      });
      setStatus(null);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleSelectFile}>
        <MaterialIcons
          name="upload-file"
          size={28}
          color={globalColors.Success}
        />
      </TouchableOpacity>
      {/* <Title onPress={() => setOpenModal(true)}>Open</Title> */}
      <Modal visible={openModal} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.innerView}>
            <Title style={styles.text}>{status}</Title>
            {/* <Title style={styles.text} onPress={() => setOpenModal(false)}>
              Close
            </Title> */}
            <ProgressBar
              progress={Math.floor(uploadProgress) / 100}
              //   progress={0.5}
              color={globalColors.Warning}
              style={styles.progressBar}
            />
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
    right: 80,
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  text: {
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {height: 20, borderRadius: 7},
});
