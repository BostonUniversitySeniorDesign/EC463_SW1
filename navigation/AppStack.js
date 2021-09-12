import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

import Home from '../screens/Home';
import About from '../screens/About';
import BarcodeScanner from '../screens/BarcodeScanner';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

const BarcodeStackScreen = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#000' },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen name="Barcode Scanner" component={BarcodeScanner} />
  </Stack.Navigator>
);

// const AboutStackScreen = ({navigation}) => (
//   <Stack.Navigator
//     screenOptions={{
//       headerStyle: {backgroundColor: '#000'},
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }}>
//     <Stack.Screen name="About" component={About} />
//   </Stack.Navigator>
// );

// const ProfileStackScreen = ({navigation}) => (
//   <Stack.Navigator
//     screenOptions={{
//       headerStyle: {backgroundColor: '#000'},
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }}>
//     <Stack.Screen
//       name="Profile"
//       component={Profile}
//       options={({navigation}) => ({
//         title: 'Profile',
//         headerStyle: {
//           backgroundColor: '#000',
//           shadowColor: '#fff',
//           elevation: 0,
//         },
//       })}
//     />

//     <Stack.Screen
//       name="EditProfile"
//       options={{
//         title: 'Edit Profile',
//       }}
//       component={EditProfile}
//     />
//   </Stack.Navigator>
// );

const AppStack = () => {
  return (
    // <HomeStackScreen/>

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
            <Icon name="information-circle-outline" color={color} size={size} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Calendar',
          tabBarColor: '#009387',
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar-outline" color={color} size={size} />
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
      />*/}

    </Tab.Navigator>
  
  );
};

export default AppStack;
