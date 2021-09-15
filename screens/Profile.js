import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

export default function Home({navigation}) {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const timeNow = new Date().toDateString();

  const getInfo = async () => {
    await firestore()
      .collection(user.uid)
      .doc(timeNow)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      getInfo();
    });
  }, [navigation, getInfo]);

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Your Daily Intake</Text>
      <Text>Calories: {userData ? userData.food.cals : 0}</Text>
      <Text>Carbohydrates: {userData ? userData.food.carb : 0}</Text>
      <Text>Fat: {userData ? userData.food.fat : 0}</Text>
      <Text>Protein: {userData ? userData.food.protein : 0}</Text>
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
