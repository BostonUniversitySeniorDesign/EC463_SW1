import React, {useState, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import DrawerNav from './Drawer';
import AppStack from './AppStack';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initialising, setInitialising] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initialising) {
      setInitialising(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initialising) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
      {/* <AppStack/> */}
    </NavigationContainer>
  );
};

export default Routes;
