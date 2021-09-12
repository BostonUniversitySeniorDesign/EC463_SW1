import React, {useState, createContext} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        //
        googlelogin: async (email, password) => {
          try {
            const {idToken} = await GoogleSignin.signIn();

            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);

            await auth().signInWithCredential(googleCredential);
          } catch (error) {
            console.log(error);
          }
        },

        logout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            console.error(error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
