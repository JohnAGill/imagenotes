import React, { createContext, useState, ReactNode } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

interface UserContext {
  signUpError: string;
  signUpWithEmailAndPassword: (email: string, password: string) => void;
  onGoogleSignIn: () => void;
}

type UserProvider = {
  children: ReactNode;
};

export const UserContext = createContext<UserContext>({
  signUpError: '',
  signUpWithEmailAndPassword: () => null,
  onGoogleSignIn: () => null,
});

GoogleSignin.configure({
  webClientId: '324497914115-vpm79ltqp321cstn9bb1q4n4kl717kae.apps.googleusercontent.com',
  iosClientId: '324497914115-egh299esrk0khr8qccvhok603s3maii5.apps.googleusercontent.com',
});

const UserProvider = ({ children }: UserProvider) => {
  const [signUpError, setSignUpError] = useState<string>('');
  const signUpWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      console.log('sign up success');
    } catch (error) {
      setSignUpError(error.message);
    }
  };

  const onGoogleSignIn = async (): Promise<FirebaseAuthTypes.UserCredential> => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  return <UserContext.Provider value={{ signUpError, signUpWithEmailAndPassword, onGoogleSignIn }}>{children}</UserContext.Provider>;
};

export default UserProvider;
