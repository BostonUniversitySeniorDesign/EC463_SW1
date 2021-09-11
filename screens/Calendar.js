import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import {Agenda} from 'react-native-calendars';
// import {Card, Avatar} from 'react-native-paper';

// import {Calendar} from 'react-native-calendars';
//import Typography from '../components/Typography';

const timeToString = time =>
{
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const CalendarScreen = () => {
  const [items, setItems] = useState({});

  return (
    <View style={{flex: 1}}>
      <Text>Calendar</Text>
    </View>
  );
};

export default CalendarScreen;
