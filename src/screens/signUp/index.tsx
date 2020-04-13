import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Body, Title, Button, Text } from 'native-base';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import { History } from 'history';
import { UserContext } from '../../context/userContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  button: {
    alignSelf: 'center',
  },
  googleButton: {
    width: 192,
    height: 48,
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: '100%',
  },
  linkText: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: 20,
  },
});

interface SignUpProps {
  history: History;
}

export default (props: SignUpProps) => {
  const { signUpWithEmailAndPassword, onGoogleSignIn } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  let passwordRef: any = null;
  let emailRef: any = null;

  const handleSignUp = async (): Promise<void | null> => {
    try {
      await signUpWithEmailAndPassword(email, password);
      return props.history.push('/');
    } catch (error) {
      return null;
    }
  };

  const handleGoogleSignUp = async (): Promise<void | null> => {
    try {
      await onGoogleSignIn();
      return props.history.push('/');
    } catch (error) {
      return null;
    }
  };

  return (
    <>
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Sign Up</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                ref={emailRef}
                getRef={(input: any) => {
                  emailRef = input;
                }}
                keyboardType="email-address"
                onSubmitEditing={() => passwordRef._root.focus()}
                returnKeyType="next"
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setEmail(e.nativeEvent.text)}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                getRef={(input: any) => {
                  passwordRef = input;
                }}
                returnKeyType="done"
                secureTextEntry
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setPassword(e.nativeEvent.text)}
              />
            </Item>
            <Text style={styles.linkText} onPress={() => props.history.push('/logIn')}>
              Go to Log In
            </Text>
          </Form>
          <View style={styles.buttonContainer}>
            <Button onPress={(): Promise<void | null> => handleSignUp()} style={styles.button}>
              <Text>Sign Up</Text>
            </Button>
            <GoogleSigninButton onPress={(): Promise<void | null> => handleGoogleSignUp()} style={[styles.googleButton, styles.button]} size={GoogleSigninButton.Size.Wide} />
          </View>
        </Content>
      </Container>
    </>
  );
};
