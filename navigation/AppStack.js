import React, {useContext} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();
import {AuthContext} from './AuthProvider';

import Home from '../screens/Home';
import BarcodeScanner from '../screens/BarcodeScanner';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  const {logout} = useContext(AuthContext);

  const HomeStackScreen = ({navigation}) => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#000'},
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );

  const BarcodeStackScreen = ({navigation}) => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#000'},
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Barcode Scanner" component={BarcodeScanner} />
    </Stack.Navigator>
  );

  const ProfileStackScreen = ({navigation}) => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#000'},
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Icon.Button
              name="log-out-outline"
              size={25}
              backgroundColor="#000"
              color="#fff"
              onPress={() => logout()}
            />
          </View>
        ),
      }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );

  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Barcode Scanner"
        component={BarcodeStackScreen}
        options={{
          tabBarLabel: 'Barcode Scanner',
          tabBarColor: '#009387',
          tabBarIcon: ({color, size}) => (
            <Icon name="barcode-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#009387',
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
