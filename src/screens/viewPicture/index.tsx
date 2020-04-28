import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import _ from 'lodash';
import { History } from 'history';
import { PictureContext } from '../../context/pictureContext';
import { NotesContext, NoteType } from '../../context/notesContext';
import Note from '../../components/note';
import { UserContext } from '../../context/userContext';

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

interface ViewPictureProps {
  history: {
    location: {
      state: {
        isEdit: boolean;
      };
    };
    push: (value: string) => void;
    goBack: () => void;
  };
}

export default (props: ViewPictureProps) => {
  const { picture } = useContext(PictureContext);
  const { notes, updateNotes, updateLocation, saveNote, setNoteToEdit, updateNoteSave } = useContext(NotesContext);
  const { user } = useContext(UserContext);
  const [isEdit, setIsEdit] = useState<boolean>(props.history.location.state?.isEdit);
  const handleImagePressed = (e: NativeSyntheticEvent<NativeTouchEvent>): void => {
    updateLocation({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY });
    return props.history.push('/addNote');
  };

  const handleShowNote = (index: number) => {
    const updatedNotes = _.map(notes, (note: NoteType, i: number) => {
      if (i === index) {
        return {
          ...note,
          display: !note.display,
        };
      }
      return note;
    });
    updateNotes(updatedNotes);
  };

  const handleNoteEdit = (index: number) => {
    const noteToUpdate = notes[index];
    setNoteToEdit(noteToUpdate);
    return props.history.push('/editNote');
  };

  const handleSaveNote = () => {
    saveNote(
      {
        picture: picture,
      },
      user?.uid,
    );
  };
  const handleUpdateNote = () => {
    updateNoteSave();
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.container} onPress={(e: NativeSyntheticEvent<NativeTouchEvent>) => handleImagePressed(e)}>
          <ImageBackground style={styles.preview} source={{ uri: picture }}>
            {_.map(notes, (note: NoteType, index: number): any => (
              <Note onLongPress={handleNoteEdit} note={note} index={index} onPress={handleShowNote} />
            ))}
            <View
              style={{
                flex: 0,
                justifyContent: 'center',
              }}>
              <Text style={{ color: 'white' }}>Tap to add a note wherever you want</Text>
              <TouchableOpacity
                style={styles.capture}
                onPress={(): void => {
                  updateNotes([]);
                  return props.history.goBack();
                }}>
                <Text>Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.capture} onPress={isEdit ? () => handleUpdateNote() : () => handleSaveNote()}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </>
  );
};
