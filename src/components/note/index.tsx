import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Text } from 'native-base';

import { NoteType } from '../../context/notesContext';

interface NoteProps {
  note: NoteType;
  index: number;
  onPress: (index: number) => void;
  onLongPress: (index: number) => void;
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
    paddingTop: 0,
    paddingLeft: 0,
  },
});

export default ({ note, index, onPress, onLongPress }: NoteProps) => {
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
        !note.display && styles.noteContainerIndex,
        {
          top: note.location.y,
          left: spacingNeeded,
          borderColor: note.text_color || 'white',
        },
      ]}
      onLongPress={onLongPress ? () => onLongPress(index) : () => null}
      onPress={(): void => onPress(index)}
      onLayout={(e) => (note.display ? calculateDisplaySpacing(note.location.x, e.nativeEvent.layout.width) : setSpacingNeeded(note.location.x))}>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 3,
          color: note.text_color || 'white',
        }}>
        {!note.display ? index + 1 : note.value}
      </Text>
    </TouchableOpacity>
  );
};
