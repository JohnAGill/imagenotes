import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Spinner } from 'native-base';

const styles = StyleSheet.create({
  loadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default () => {
  return (
    <View style={styles.loadingContainer}>
      <Spinner />
    </View>
  );
};
