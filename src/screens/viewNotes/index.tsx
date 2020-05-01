import React, { useContext, useState } from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { View, Toast } from 'native-base';
import auth from '@react-native-firebase/auth';

import _ from 'lodash';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { QueryRenderer, createFragmentContainer } from 'react-relay';
import { graphql } from 'react-relay/hooks';
import { History } from 'history';
import environment from '../../RelayEnvironment';
import DisplayNote from '../../components/displayNote';
import { UserContext } from '../../context/userContext';
import Loading from '../../components/loading';

const diemnsions = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    width: diemnsions.width,
    height: diemnsions.height,
    marginBottom: 63,
  },
});

interface ViewNotesProps {
  history: History;
}

const ViewNotes = (ViewNotesProps: ViewNotesProps) => {
  const { setUserId, user } = useContext(UserContext);
  const [callCount, setCallCount] = useState<number>(0);
  const checkForUser = () => {
    const { currentUser } = auth();
    setUserId(currentUser?.uid);
  };
  if (_.isEmpty(user?.uid) && callCount < 10) {
    checkForUser();
    setCallCount(callCount + 1);
    return <Loading />;
  }
  if (callCount > 10 && _.isEmpty(user?.uid)) {
    ViewNotesProps.history.push('/');
    return <Loading />;
  }
  const query = graphql`
    query viewNotesQuery($userId: String) {
      getNotes(userId: $userId) {
        picture
        notes {
          value
          x
          y
          order
          uid
          note_uid
          text_color
        }
      }
    }
  `;

  const showErrorToast = () =>
    Toast.show({
      text: 'Could not get notes, please restart app',
      buttonText: 'Okay',
      type: 'danger',
      duration: 10000,
    });

  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{ userId: user?.uid }}
      render={({ error, props }: any) => {
        const cards = _.map(props?.getNotes, (note) => (
          <Card style={styles.card}>
            <DisplayNote history={ViewNotesProps.history} note={note} />
          </Card>
        ));
        if (error) {
          showErrorToast();
          return (
            <View
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Something went wrong!</Text>
            </View>
          );
        }
        if (!props) {
          return <Loading />;
        }
        if (_.isEmpty(props?.getNotes)) {
          return (
            <View
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>You have no notes, take a picture or upload one!</Text>
            </View>
          );
        }

        return (
          <View style={{ display: 'flex', flex: 1 }}>
            <CardStack verticalThreshold={80} horizontalSwipe={false} loop style={styles.content}>
              {cards}
            </CardStack>
          </View>
        );
      }}
    />
  );
};

export default createFragmentContainer(ViewNotes, {
  getNotes: graphql`
    fragment viewNotes_getNotes on Notes @relay(plural: true) {
      picture
      notes {
        value
        x
        y
        order
        uid
        note_uid
        text_color
      }
    }
  `,
});
