import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'native-base';
import Modal from 'react-native-modal';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import Slider from '@react-native-community/slider';

// @ts-ignore
import _ from 'lodash';
import { History } from 'history';

const styles = StyleSheet.create({});

interface AddNoteProps {
  history: History;
}

export default (props: any) => {
  const [color, setColor] = useState('blue');
  const onColorChange = (changedColor: any) => {
    setColor(changedColor);
  };
  return (
    <>
      <Modal onBackdropPress={() => props.setShowModal(false)} isVisible={props.showModal}>
        <ColorPicker
          oldColor={props.color || 'white'}
          color={color}
          onColorChange={(e) => onColorChange(e)}
          onColorSelected={(color) => alert(`Color selected: ${color}`)}
          onOldColorSelected={(color) => alert(`Old color selected: ${color}`)}
          style={{ flex: 1 }}
          // @ts-ignore
          sliderComponent={Slider}
          hideSliders
        />
        <Button
          onPress={() => {
            props.selectColor(color);
            props.setShowModal(false);
          }}>
          <Text>save</Text>
        </Button>
      </Modal>
    </>
  );
};
