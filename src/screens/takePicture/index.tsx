import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { History } from 'history';
import { PictureContext } from '../../context/pictureContext';
import Loading from '../../components/loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    zIndex: 1,
  },
  button: {
    width: 50,
    height: 50,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  tempDisplay: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
  },
  loadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

interface TakePictureProps {
  history: History;
}

type CameraType = {
  camera: RNCamera;
};

export default (props: TakePictureProps) => {
  const { addPicture } = useContext(PictureContext);
  const [loading, setLoading] = useState<boolean>(false);
  const takePicture = async (camera: RNCamera): Promise<void> => {
    setLoading(true);
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    addPicture(data.uri);
    setLoading(false);
    return props.history.push('/viewPicture');
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <View style={styles.container}>
        <RNCamera style={styles.preview} type={RNCamera.Constants.Type.back}>
          {({ camera }: CameraType) => {
            return (
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={(): Promise<void> => takePicture(camera)} style={styles.capture}>
                  <Text style={styles.buttonText}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    </>
  );
};
