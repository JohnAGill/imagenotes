import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
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
  if (note.display) {
    return (
      <TouchableOpacity
        style={[
          styles.noteContainer,
          {
            top: note.location.y,
            left: note.location.x,
          },
        ]}
        onPress={(): void => onPress(index)}>
        <Text style={{ color: 'white' }}>{note.value}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[
        styles.noteContainer,
        styles.noteContainerIndex,
        {
          top: note.location.y,
          left: note.location.x,
        },
      ]}
      onPress={(): void => onPress(index)}>
      <Text style={{ color: 'white' }}>{index + 1}</Text>
    </TouchableOpacity>
  );
};
