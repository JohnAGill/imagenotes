import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RNCamera, Constants } from 'react-native-camera';
import { History } from 'history';
import { PictureContext } from '../../context/pictureContext';

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
});

interface TakePictureProps {
  history: History;
}

type CameraType = {
  camera: RNCamera;
};

export default (props: TakePictureProps) => {
  const { addPicture } = useContext(PictureContext);
  const takePicture = async (camera: RNCamera): Promise<void> => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    addPicture(data.uri);
    return props.history.push('/viewPicture');
  };

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
