import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Body, Title, Textarea, Button, Text } from 'native-base';

// @ts-ignore
import DoneButton from 'react-native-keyboard-done-button';
import _ from 'lodash';
import { History } from 'history';
import { NotesContext } from '../../context/notesContext';

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

interface EditNoteProps {
  history: History;
}

export default (props: EditNoteProps) => {
  const { selectedNote, editNote } = useContext(NotesContext);
  const [editedNote, setEditedNote] = useState<any>(selectedNote);

  return (
    <>
      <Header>
        <Body>
          <Title>Edit Note</Title>
        </Body>
      </Header>
      <View style={{ flex: 1, margin: 10, height: '50%' }}>
        <Textarea
          rowSpan={5}
          bordered
          underline
          style={styles.input}
          numberOfLines={2}
          onChangeText={(text: string): void => setEditedNote({ ...editedNote, value: text })}
          value={editedNote.value}
        />
      </View>
      <DoneButton onPress={(): void => undefined} style={styles.doneButton} />
      <Button
        style={styles.addNotebutton}
        onPress={() => {
          editNote(editedNote.order, editedNote.value);
          props.history.goBack();
        }}>
        <Text>Edit Note</Text>
      </Button>
    </>
  );
};
