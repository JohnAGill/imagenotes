import React, {useContext} from 'react'
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native'
import _ from 'lodash'
import {PictureContext} from '../../context/pictureContext'
import {NotesContext} from '../../context/notesContext'

export default (props: any) => {
  const {picture} = useContext(PictureContext)
  const {notes, updateNotes, updateLocation} = useContext(NotesContext)
  const handleImagePressed = (e: any) => {
    updateLocation({x: e.nativeEvent.locationX, y: e.nativeEvent.locationY})
    props.history.push('/addNote', [{x: e.nativeEvent.locationX, y: e.nativeEvent.locationY}])
  }

  const handleShowNote = (index: number) => {
    const updatedNotes = _.map(notes, (note: any, i: number) => {
      if (i === index) {
        return {
          ...note,
          text: !note.text,
        }
      }
      return note
    })
    updateNotes(updatedNotes)
  }

  const showNotes = () => {
    return _.map(notes, (note: any, index: number) => {
      if (note.text) {
        return (
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: note.location.y,
              left: note.location.x,
              borderColor: 'white',
              borderWidth: 2,
              borderStyle: 'solid',
              borderRadius: 30,
              paddingLeft: 10,
              paddingTop: 4,
            }}
            onPress={() => handleShowNote(index)}>
            <Text style={{color: 'white'}}>{note.value}</Text>
          </TouchableOpacity>
        )
      }
      return (
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            top: note.location.y,
            left: note.location.x,
            borderColor: 'white',
            borderWidth: 2,
            borderStyle: 'solid',
            borderRadius: 30,
            paddingLeft: 10,
            paddingTop: 4,
          }}
          onPress={() => handleShowNote(index)}>
          <Text style={{color: 'white'}}>{index + 1}</Text>
        </TouchableOpacity>
      )
    })
  }
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.container} onPress={(e: any) => handleImagePressed(e)}>
          <ImageBackground style={styles.preview} source={{uri: picture}}>
            {showNotes()}
            <View
              style={{
                flex: 0,
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white'}}>Tap to add a note wherever you want</Text>
              <TouchableOpacity
                style={styles.capture}
                onPress={() => {
                  updateNotes([])
                  props.history.goBack()
                }}>
                <Text>Go Back</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </>
  )
}

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
})
