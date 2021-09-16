import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Welcome!</Text>
      <Text style={styles.info}>Check your daily goal in your Profile</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    fontSize: 25,
  },
});
