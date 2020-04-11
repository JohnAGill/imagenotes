import React, {useContext} from 'react';
import {StyleSheet, TextInput} from 'react-native';
// @ts-ignore
import DoneButton from 'react-native-keyboard-done-button';
import {NotesContext} from '../../context/notesContext';

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

export default (props: any) => {
  const {note, updateNote, addNewNote} = useContext(NotesContext);

  const handleAddNote = (newNote: string) => {
    addNewNote(newNote);
    updateNote('');
    props.history.goBack();
  };

  return (
    <>
      <TextInput style={styles.input} multiline numberOfLines={2} onChangeText={(text: string) => updateNote(text)} value={note} />
      <DoneButton onPress={() => handleAddNote(note)} style={styles.doneButton} />
    </>
  );
};
