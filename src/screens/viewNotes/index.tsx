import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { View } from 'native-base';
import _ from 'lodash';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { QueryRenderer, createFragmentContainer } from 'react-relay';
import { graphql } from 'react-relay/hooks';
import { History } from 'history';
import environment from '../../RelayEnvironment';
import DisplayNote from '../../components/displayNote';
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

const ViewNotes = (props: any) => {
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
        }
      }
    }
  `;

  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{ userId: 'test22' }}
      render={({ error, props }: any) => {
        console.log(props);
        const cards = _.map(props?.getNotes, (note) => (
          <Card style={styles.card}>
            <DisplayNote note={note} />
          </Card>
        ));
        console.log(cards);
        if (error) {
          return <Text>Error!</Text>;
        }
        if (!props) {
          return <Text>Loading...</Text>;
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
      }
    }
  `,
});
