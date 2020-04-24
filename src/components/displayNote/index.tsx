import React, { useState, useContext } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

import _ from 'lodash';
import { NotesContext, NoteType } from '../../context/notesContext';
import Note from '../note';

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
});

interface DisplayNoteProps {
  note: {
    picture: string;
    notes: {
      x: number;
      y: number;
      value: string;
      order: number;
      uid: number;
    };
  };
}

export default ({ note }: DisplayNoteProps) => {
  const [componentNote, setComponentNote] = useState<any>(note.notes);

  const handleShowNote = (index: number) => {
    console.log('here');
    const updatedNotes: any = _.map(componentNote, (note: NoteType, i: number) => {
      console.log('here2');
      console.log(i);
      console.log(index);
      if (i === index) {
        console.log('yup');
        return {
          ...note,
          display: !note.display,
        };
      }
      return note;
    });
    setComponentNote(updatedNotes);
  };

  console.log(componentNote);

  return (
    <>
      <View style={styles.container}>
        <ImageBackground style={styles.preview} source={{ uri: note.picture }}>
          {_.map(componentNote, (noteToShow: any, index: number): any => {
            const newNote = {
              ...noteToShow,
              location: {
                x: noteToShow.x,
                y: noteToShow.y,
              },
            };
            return <Note note={newNote} index={index} onPress={() => handleShowNote(index)} />;
          })}
          <View
            style={{
              flex: 0,
              justifyContent: 'center',
            }}></View>
        </ImageBackground>
      </View>
    </>
  );
};
