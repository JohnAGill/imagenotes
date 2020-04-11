import React, {useState, useContext} from 'react'
import {StyleSheet, TextInput} from 'react-native'
import _ from 'lodash'
// @ts-ignore
import DoneButton from 'react-native-keyboard-done-button'
import {NotesContext} from '../../context/notesContext'

export default (props: any) => {
  const {note, updateNote, addNewNote} = useContext(NotesContext)

  const handleAddNote = (note: string) => {
    addNewNote(note)
    updateNote('')
    props.history.goBack()
  }

  return (
    <>
      <TextInput style={styles.input} multiline numberOfLines={2} onChangeText={(text: string) => updateNote(text)} value={note} />
      <DoneButton onPress={() => handleAddNote(note)} style={styles.doneButton} />
    </>
  )
}

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
})
