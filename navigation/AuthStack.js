import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignIn';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import GOOGLE_API_KEY from '../utils/keys';

const Stack = createStackNavigator();

const AuthStack = () => {
  // const [isFirstLaunch, setIsFirstLaunch] = useState();
  let routeName = 'SignIn';

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        GOOGLE_API_KEY,
        // '306998444733-clihsb7l85pgku2tga14bg5chrj63s30.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }, []);

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
