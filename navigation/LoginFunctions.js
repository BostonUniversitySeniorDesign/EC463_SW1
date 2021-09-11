import auth from '@react-native-firebase/auth';
// import {AsyncStorage} from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

const LoginFunctions = {
  signInOrLink: async function (provider, credential, email) {
    this.saveCredential(provider, credential);
    await auth()
      .signInWithCredential(credential)
      .catch(async error => {
        try {
          if (error.code === 'auth/wrong-password') {
            Alert.alert('Wrong password!');
          } else if (error.code === 'auth/invalid-email') {
            Alert.alert('Invalid email!');
          } else {
            let methods = await auth().fetchSignInMethodsForEmail(email);
            let oldCred = await this.getCredential(methods[0]);
            let prevUser = await auth().signInWithCredential(oldCred);
            auth().currentUser.linkWithCredential(credential);
          }
        } catch (error) {
          console.log('Error signInOrLink', error);
        }
      });
  },

  registerOrLink: async function (provider, credential, email) {
    this.saveCredential(provider, credential);
    let user = await auth()
      .createUserWithEmailAndPassword(credential.token, credential.secret)
      .then(() => {
        console.log(auth().currentUser.uid);
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .set({
            fname: '',
            lname: '',
            email: email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: null,
          })
          .catch(error => {
            console.log(
              'Something went wrong with added user to firestore: ',
              error,
            );
          });
      })
      .catch(async error => {
        try {
          if (error.code !== 'auth/email-already-in-use') {
            // throw error;
            console.log('Error ', error);
          }
          let methods = await auth().fetchSignInMethodsForEmail(email);
          let oldCred = await this.getCredential(methods[0]);
          let prevUser = await auth().signInWithCredential(oldCred);
          auth().currentUser.linkWithCredential(credential);
        } catch (error) {
          //   throw error;
          console.log('Error registerOrLink', error);
        }
      });
    // await user.sendEmailVerification();
  },

  getCredential: async function (provider) {
    try {
      let value = await AsyncStorage.getItem(provider);
      if (value !== null) {
        let [token, secret] = JSON.parse(value);
        return this.getProvider(provider).credential(token, secret);
      }
    } catch (error) {
      throw error;
    }
  },

  saveCredential: async function (provider, credential) {
    try {
      let saveData = JSON.stringify([credential.token, credential.secret]);
      await AsyncStorage.setItem(provider, saveData);
    } catch (error) {
      throw error;
    }
  },

  getProvider: function (providerId) {
    switch (providerId) {
      case auth.GoogleAuthProvider.PROVIDER_ID:
        return auth.GoogleAuthProvider;
      case auth.FacebookAuthProvider.PROVIDER_ID:
        return auth.FacebookAuthProvider;
      case auth.TwitterAuthProvider.PROVIDER_ID:
        return auth.TwitterAuthProvider;
      case auth.EmailAuthProvider.PROVIDER_ID:
        return auth.EmailAuthProvider;
      default:
        throw new Error(`No provider implemented for ${providerId}`);
    }
  },
};
export default LoginFunctions;
