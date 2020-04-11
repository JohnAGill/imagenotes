import React, {createContext, useState} from 'react'
import auth from '@react-native-firebase/auth'
import {GoogleSignin} from '@react-native-community/google-signin'

interface UserContext {
  signUpError: any
  signUpWithEmailAndPassword: (email: string, password: string) => any
  onGoogleSignIn: () => any
}

export const UserContext = createContext<UserContext>({
  signUpError: null,
  signUpWithEmailAndPassword: (email: string, password: string) => null,
  onGoogleSignIn: () => null,
})

GoogleSignin.configure({
  webClientId: '324497914115-vpm79ltqp321cstn9bb1q4n4kl717kae.apps.googleusercontent.com', // From Firebase Console Settings
  iosClientId: '324497914115-egh299esrk0khr8qccvhok603s3maii5.apps.googleusercontent.com',
})

const UserProvider = ({children}: any) => {
  const [signUpError, setSignUpError] = useState({})
  const signUpWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password)
      console.log('sign up success')
    } catch (error) {
      setSignUpError(error)
    }
  }

  const onGoogleSignIn = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    console.log(googleCredential)
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential)
  }

  return <UserContext.Provider value={{signUpError, signUpWithEmailAndPassword, onGoogleSignIn}}>{children}</UserContext.Provider>
}

export default UserProvider
