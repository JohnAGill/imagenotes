import React, {useState, useEffect, useContext} from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import _ from 'lodash'
import {RNCamera} from 'react-native-camera'
import {PictureContext} from '../../context/pictureContext'

// @ts-ignore
export default (props: any) => {
  const {picture, addPicture} = useContext(PictureContext)
  const takePicture = async function (camera: any) {
    const options = {quality: 0.5, base64: true}
    const data = await camera.takePictureAsync(options)
    addPicture(data.uri)
    props.history.push('/viewPicture')
  }

  return (
    <>
      <View style={styles.container}>
        <RNCamera style={styles.preview} type={RNCamera.Constants.Type.back}>
          {({camera}: any) => {
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                  <Text style={{fontSize: 14}}> SNAP </Text>
                </TouchableOpacity>
              </View>
            )
          }}
        </RNCamera>
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
