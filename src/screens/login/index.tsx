import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Body, Title, Button, Text } from 'native-base';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import { History } from 'history';
import { UserContext } from '../../context/userContext';
import Loading from '../../components/loading';

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

interface LoginProps {
  history: History;
}

export default (props: LoginProps) => {
  const { loginWithEmailAndPassword, onGoogleSignIn } = useContext(UserContext);
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  let passwordRef: any = null;
  let emailRef: any = null;

  const handleLogin = async (): Promise<void | null> => {
    setLoading(true);
    try {
      await loginWithEmailAndPassword(email, password);
      setLoading(false);
      return props.history.push('/');
    } catch (error) {
      setLoading(false);
      return null;
    }
  };

  const handleGoogleSignIn = async (): Promise<void | null> => {
    setLoading(true);
    try {
      await onGoogleSignIn();
      setLoading(false);
      return props.history.push('/');
    } catch (error) {
      setLoading(false);
      return null;
    }
  };

  return (
    <>
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Log In</Title>
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
            {!loading && (
              <Text style={styles.linkText} onPress={() => props.history.push('/')}>
                Go to Sign Up
              </Text>
            )}
          </Form>
          <View style={styles.buttonContainer}>
            {loading ? (
              <Loading />
            ) : (
              <>
                <Button onPress={(): Promise<void | null> => handleLogin()} style={styles.button}>
                  <Text>Log In</Text>
                </Button>
                <GoogleSigninButton onPress={(): Promise<void | null> => handleGoogleSignIn()} style={[styles.button, styles.googleButton]} size={GoogleSigninButton.Size.Wide} />
              </>
            )}
          </View>
        </Content>
      </Container>
    </>
  );
};
