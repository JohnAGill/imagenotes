import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Header, Body, Title, Button, Text } from 'native-base';
import { History } from 'history';
import ImagePicker from 'react-native-image-picker';
import { PictureContext } from '../../context/pictureContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  button: {
    alignSelf: 'center',
  },
  googleButton: {
    width: 192,
    height: 48,
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: '100%',
  },
  linkText: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: 20,
  },
});

interface UploadPictureProps {
  history: History;
}

export default (props: UploadPictureProps) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const { addPicture } = useContext(PictureContext);
  useEffect(() => {
    if (showPicker) {
      ImagePicker.launchImageLibrary({}, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
          setShowPicker(false);
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          setShowPicker(false);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          setShowPicker(false);
        } else {
          addPicture(response.uri);
          setShowPicker(false);
          props.history.push('/viewPicture');
        }
      });
    }
  }, [showPicker]);

  return (
    <>
      <Header>
        <Body>
          <Title>Upload an Image</Title>
        </Body>
      </Header>
      <Button onPress={() => setShowPicker(true)}>
        <Text>Choose A File</Text>
      </Button>
    </>
  );
};
