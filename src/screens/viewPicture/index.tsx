import React, { useContext } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import _ from 'lodash';
import { History } from 'history';
import { PictureContext } from '../../context/pictureContext';
import { NotesContext, NoteType } from '../../context/notesContext';
import Note from '../../components/note';

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
  history: History;
}

export default (props: ViewPictureProps) => {
  const { picture } = useContext(PictureContext);
  const { notes, updateNotes, updateLocation } = useContext(NotesContext);
  const handleImagePressed = (e: NativeSyntheticEvent<NativeTouchEvent>): void => {
    updateLocation({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY });
    return props.history.push('/addNote', [{ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY }]);
  };

  const handleShowNote = (index: number) => {
    const updatedNotes = _.map(notes, (note: NoteType, i: number) => {
      if (i === index) {
        return {
          ...note,
          text: !note.display,
        };
      }
      return note;
    });
    updateNotes(updatedNotes);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.container} onPress={(e: NativeSyntheticEvent<NativeTouchEvent>) => handleImagePressed(e)}>
          <ImageBackground style={styles.preview} source={{ uri: picture }}>
            {_.map(notes, (note: NoteType, index: number): any => (
              <Note note={note} index={index} onPress={handleShowNote} />
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
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </>
  );
};
