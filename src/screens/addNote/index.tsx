import React, { useContext } from 'react';
import { StyleSheet, TextInput } from 'react-native';
// @ts-ignore
import DoneButton from 'react-native-keyboard-done-button';
import { History } from 'history';
import { NotesContext } from '../../context/notesContext';

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: '100%',
    padding: 10,
    width: '100%',
    marginTop: 50,
    backgroundColor: 'white',
  },
  doneButton: {
    backgroundColor: 'darkgrey',
    marginTop: 49,
  },
});

interface AddNoteProps {
  history: History;
}

export default (props: AddNoteProps) => {
  const { note, updateNote, addNewNote } = useContext(NotesContext);

  const handleAddNote = (newNote: string): void => {
    addNewNote(newNote);
    updateNote('');
    props.history.goBack();
  };

  return (
    <>
      <TextInput style={styles.input} multiline numberOfLines={2} onChangeText={(text: string): void => updateNote(text)} value={note} />
      <DoneButton onPress={(): void => handleAddNote(note)} style={styles.doneButton} />
    </>
  );
};
