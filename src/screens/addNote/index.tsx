import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Body, Title, Textarea, Button, Text } from 'native-base';
import { fromHsv } from 'react-native-color-picker';

// @ts-ignore
import DoneButton from 'react-native-keyboard-done-button';
import _ from 'lodash';
import { History } from 'history';
import { NotesContext } from '../../context/notesContext';
import ColorModal from './colorModal';

const styles = StyleSheet.create({
  input: {
    height: '50%',
    padding: 10,
    width: '100%',
    marginTop: 50,
    backgroundColor: 'white',
  },
  doneButton: {
    backgroundColor: 'darkgrey',
    marginTop: 49,
  },
  addNotebutton: {
    alignSelf: 'center',
  },
});

interface AddNoteProps {
  history: History;
}

export default (props: AddNoteProps) => {
  const { note, updateNote, addNewNote } = useContext(NotesContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [color, setColor] = useState<string>('white');
  const handleAddNote = (newNote: string): void => {
    if (_.isEmpty(newNote)) {
      props.history.goBack();
      return undefined;
    }
    addNewNote(newNote, color);
    updateNote('');
    props.history.goBack();
  };
  return (
    <>
      <Header>
        <Body>
          <Title>Add Note</Title>
        </Body>
      </Header>
      <View style={{ flex: 1, margin: 10, height: '50%' }}>
        <Textarea rowSpan={5} bordered underline style={styles.input} numberOfLines={2} onChangeText={(text: string): void => updateNote(text)} value={note} />
      </View>
      <DoneButton onPress={(): void => undefined} style={styles.doneButton} />
      <>
        <Button style={styles.addNotebutton} onPress={(): void => setShowModal(true)}>
          <Text>ChangeColor</Text>
        </Button>
      </>
      <Button style={styles.addNotebutton} onPress={(): void => handleAddNote(note)}>
        <Text>Add Note</Text>
      </Button>
      <ColorModal selectColor={(value: any) => setColor(fromHsv(value))} showModal={showModal} setShowModal={(value: any) => setShowModal(value)} />
    </>
  );
};
