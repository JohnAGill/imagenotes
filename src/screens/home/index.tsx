import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Body, Title } from 'native-base';

import _ from 'lodash';
import { History } from 'history';

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

interface HomeProps {
  history: History;
}

export default (props: HomeProps) => {
  return (
    <>
      <Header>
        <Body>
          <Title>Image Notes</Title>
        </Body>
      </Header>
    </>
  );
};
