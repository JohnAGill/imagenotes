import React, { createContext, useState, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

interface User {
  uid?: string;
}

interface UserContext {
  signUpError: string;
  loginError: string;
  signUpWithEmailAndPassword: (email: string, password: string) => void;
  onGoogleSignIn: () => void;
  loginWithEmailAndPassword: (email: string, password: string) => void;
  user?: User;
  setUserId: (uid: string | undefined) => void;
}

type UserProvider = {
  children: ReactNode;
};

export const UserContext = createContext<UserContext>({
  signUpError: '',
  signUpWithEmailAndPassword: () => null,
  onGoogleSignIn: () => null,
  loginWithEmailAndPassword: () => null,
  loginError: '',
  user: {
    uid: '',
  },
  setUserId: () => null,
});

GoogleSignin.configure({
  webClientId: '324497914115-vpm79ltqp321cstn9bb1q4n4kl717kae.apps.googleusercontent.com',
  iosClientId: '324497914115-egh299esrk0khr8qccvhok603s3maii5.apps.googleusercontent.com',
});

const UserProvider = ({ children }: UserProvider) => {
  const [signUpError, setSignUpError] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [user, setUser] = useState<User>({ uid: '' });
  const signUpWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      const user = auth().currentUser;
      setUser({
        uid: user?.uid,
      });
    } catch (error) {
      setSignUpError(error.message);
    }
  };

  const onGoogleSignIn = async (): Promise<void> => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    const user = auth().currentUser;
    setUser({
      uid: user?.uid,
    });
  };

  const loginWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const user = auth().currentUser;
      setUser({
        uid: user?.uid,
      });
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const setUserId = (uid: string | undefined) => {
    setUser({
      uid: uid,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUserId,
        signUpError,
        signUpWithEmailAndPassword,
        onGoogleSignIn,
        loginWithEmailAndPassword,
        loginError,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
