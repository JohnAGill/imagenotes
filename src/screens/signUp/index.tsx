import React, {useState, useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {Container, Header, Content, Form, Item, Input, Label, Body, Title, Button, Text} from 'native-base'
import {GoogleSigninButton} from '@react-native-community/google-signin'
import {UserContext} from '../../context/userContext'
export default (props: any) => {
  const {signUpWithEmailAndPassword, onGoogleSignIn} = useContext(UserContext)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  let passwordRef: any = null
  let emailRef: any = null

  const handleSignUp = async () => {
    try {
      await signUpWithEmailAndPassword(email, password)
      props.history.push('/')
    } catch (error) {
      return null
    }
  }

  const handleGoogleSignUp = async () => {
    console.log('here')
    try {
      await onGoogleSignIn()
      props.history.push('/')
    } catch (error) {
      return null
    }
  }

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
                getRef={(input) => {
                  emailRef = input
                }}
                keyboardType="email-address"
                onSubmitEditing={() => passwordRef._root.focus()}
                returnKeyType="next"
                onChange={(e: any) => setEmail(e.nativeEvent.text)}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                getRef={(input) => {
                  passwordRef = input
                }}
                returnKeyType="done"
                secureTextEntry={true}
                onChange={(e: any) => setPassword(e.nativeEvent.text)}
              />
            </Item>
          </Form>
          <View style={styles.buttonContainer}>
            <Button onPress={() => handleSignUp()} style={styles.button}>
              <Text>Sign Up</Text>
            </Button>
            <GoogleSigninButton onPress={() => handleGoogleSignUp()} style={[styles.button && styles.googleButton]} size={GoogleSigninButton.Size.Wide} />
          </View>
        </Content>
      </Container>
    </>
  )
}

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
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: '100%',
  },
})
