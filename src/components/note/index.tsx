import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Text } from 'native-base';

import _ from 'lodash';
import { NoteType } from '../../context/notesContext';

interface NoteProps {
  note: NoteType;
  index: number;
  onPress: (index: number) => void;
}

const styles = StyleSheet.create({
  noteContainer: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 30,
    paddingLeft: 10,
    paddingTop: 4,
  },
  noteContainerIndex: {
    width: 30,
    height: 30,
  },
});

export default ({ note, index, onPress }: NoteProps) => {
  const [spacingNeeded, setSpacingNeeded] = useState<number>(note.location.x);
  const windowWidth = useWindowDimensions().width;

  const calculateDisplaySpacing = (left: number, textSize: number) => {
    if (windowWidth - left > textSize) {
      return left;
    }
    if (windowWidth - left > 60) {
      return setSpacingNeeded(5);
    }
    setSpacingNeeded(left - textSize);
  };
  return (
    <TouchableOpacity
      style={[
        styles.noteContainer,
        {
          top: note.location.y,
          left: spacingNeeded,
        },
      ]}
      onPress={(): void => onPress(index)}
      onLayout={(e) => (note.display ? calculateDisplaySpacing(note.location.x, e.nativeEvent.layout.width) : setSpacingNeeded(note.location.x))}>
      <Text style={{ color: 'white', flex: 1, flexWrap: 'wrap' }}>{!note.display ? index + 1 : note.value}</Text>
    </TouchableOpacity>
  );
};
