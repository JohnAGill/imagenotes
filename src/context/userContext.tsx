import React, {createContext, useState} from 'react'
import auth from '@react-native-firebase/auth'

interface UserContext {
  signUpError: any
  signUpWithEmailAndPassword: (email: string, password: string) => any
}

export const UserContext = createContext<UserContext>({
  signUpError: null,
  signUpWithEmailAndPassword: (email: string, password: string) => null,
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
  return <UserContext.Provider value={{signUpError, signUpWithEmailAndPassword}}>{children}</UserContext.Provider>
}

export default UserProvider
