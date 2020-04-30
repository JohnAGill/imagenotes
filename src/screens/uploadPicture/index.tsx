import React, { useState, useEffect, useContext } from 'react';
import { Header, Body, Title, Button, Text } from 'native-base';
import { History } from 'history';
import ImagePicker from 'react-native-image-picker';
import { PictureContext } from '../../context/pictureContext';

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
