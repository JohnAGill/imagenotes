import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native';
import {Icon} from 'native-base';

import TakePicture from './src/screens/takePicture';
import AddNote from './src/screens/addNote';
import ViewPicture from './src/screens/viewPicture';
import SignUp from './src/screens/signUp';
import PictureProvider from './src/context/pictureContext';
import NotesProvider from './src/context/notesContext';

const App = (props: any) => {
  return (
    <>
      <PictureProvider>
        <NotesProvider>
          <NativeRouter>
            <View style={styles.container}>
              <Route exact path="/" component={SignUp} />
              <Route exact path="/viewPicture" component={ViewPicture} />
              <Route
                exact
                path="/addNote"
                render={(props: any) => {
                  return (
                    <AddNote
                      history={props.history}
                      postion={props.location.state[0]}
                    />
                  );
                }}
              />
              <View style={styles.nav}>
                <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
                  <Icon name="camera" />
                </Link>
              </View>
            </View>
          </NativeRouter>
        </NotesProvider>
      </PictureProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  },
});

export default App;
