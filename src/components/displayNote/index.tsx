import React, { useState, useContext } from 'react';
import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';

import _ from 'lodash';
import { Button, Text, Card } from 'native-base';
import { NoteType, NotesContext } from '../../context/notesContext';
import Note from '../note';
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
  history: any;
}

export default ({ note, history }: DisplayNoteProps) => {
  const [componentNote, setComponentNote] = useState<any>(note.notes);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { addPicture } = useContext(PictureContext);
  const { updateNotes } = useContext(NotesContext);
  const noteForEdit = {
    ...note,
    notes: _.map(componentNote, (test: any) => ({
      ...test,
      location: {
        x: test.x,
        y: test.y,
      },
    })),
  };
  const handleShowNote = (index: number) => {
    const updatedNotes: any = _.map(componentNote, (noteObject: NoteType, i: number) => {
      if (i === index) {
        return {
          ...noteObject,
          display: !noteObject.display,
        };
      }
      return noteObject;
    });
    setComponentNote(updatedNotes);
  };
  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => null} onLongPress={() => setShowModal(true)}>
          <ImageBackground style={styles.preview} source={{ uri: note.picture }}>
            {_.map(componentNote, (noteToShow: any, index: number): any => {
              const newNote = {
                ...noteToShow,
                location: {
                  x: noteToShow.x,
                  y: noteToShow.y,
                },
              };
              return <Note onLongPress={() => null} note={newNote} index={index} onPress={() => handleShowNote(index)} />;
            })}
            <View
              style={{
                flex: 0,
                justifyContent: 'center',
              }}
            />
          </ImageBackground>
        </TouchableWithoutFeedback>

        <Modal onBackdropPress={() => setShowModal(false)} isVisible={showModal}>
          <Card style={{ alignItems: 'center', padding: 40, borderRadius: 4 }}>
            <Button
              style={{
                display: 'flex',
                width: 250,
                justifyContent: 'center',
                marginBottom: 10,
              }}
              onPress={() => {
                addPicture(noteForEdit.picture);
                updateNotes(noteForEdit.notes);
                setShowModal(false);
                history.push('/viewPicture', { isEdit: true });
              }}>
              <Text>Edit</Text>
            </Button>
            <Button
              style={{
                display: 'flex',
                width: 250,
                justifyContent: 'center',
              }}
              onPress={() => setShowModal(false)}>
              <Text>Close</Text>
            </Button>
          </Card>
        </Modal>
      </View>
    </>
  );
};
