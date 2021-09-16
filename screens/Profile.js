import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
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
    // <View style={styles.container}>
    //   <Text style={styles.info}>Your Daily Intake</Text>
    //   <Text>Calories: {userData ? userData.food.cals : 0}</Text>
    //   <Text>Carbohydrates: {userData ? userData.food.carb : 0}</Text>
    //   <Text>Fat: {userData ? userData.food.fat : 0}</Text>
    //   <Text>Protein: {userData ? userData.food.protein : 0}</Text>

    //   <Text style={styles.info}>Your Items:</Text>
    //   {userData
    //     ? userData.items.map((item, key) => (
    //         <Text style={{textAlign: 'center'}} key={key}>
    //           * {item}
    //         </Text>
    //       ))
    //     : null}
    // </View>

    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.userName}>User's Information</Text>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>
              {userData ? userData.food.cals : 0}
            </Text>
            <Text style={styles.userInfoSubTitle}>Calories</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>
              {userData ? userData.food.carb : 0}
            </Text>
            <Text style={styles.userInfoSubTitle}>Carbohydrates</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>
              {userData ? userData.food.fat : 0}
            </Text>
            <Text style={styles.userInfoSubTitle}>Fat</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>
              {userData ? userData.food.protein : 0}
            </Text>
            <Text style={styles.userInfoSubTitle}>Protein</Text>
          </View>
        </View>

        <View>
          <Text style={styles.userName}>Your Items Today:</Text>
          {userData
            ? userData.items.map((item, key) => (
                <Text style={{textAlign: 'center'}} key={key}>
                  * {item}
                </Text>
              ))
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
