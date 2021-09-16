import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Alert, Button, TextInput} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import axios from 'react-native-axios';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../navigation/AuthProvider';

const testBarcode = '034856050926'; // Sweets
// const testBarcode = '08811014005'; // Whisky, Doesnt work
// const testBarcode = '788434106382'; // Protein Bars

const timeNow = new Date().toDateString();

const BarcodeScanner = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [servings, setServings] = useState(1);
  const [itemName, setItemName] = useState('');
  const [nutritionData, setNutritionData] = useState({});
  const [isBarcodeRead, setIsBarcodeRead] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState('');

  const ref = firestore().collection(user.uid).doc(timeNow);

  const getNutrient = (list, nutrientID) => {
    for (let item = 0; item < list.length; item++) {
      if (list[item].nutrientId === nutrientID) {
        return Math.round(list[item].value);
      }
    }
  };

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

  const updateValues = async () => {
    ref.get().then(document => {
      if (document.exists) {
        ref
          .update({
            food: nutritionData,
            time: timeNow,
            items: firestore.FieldValue.arrayUnion(itemName),
          })
          .then(() => {
            console.log('Food uploaded to firebase!');
            Alert.alert('Food added!');
          });
      } else {
        ref
          .set({
            food: nutritionData,
            time: timeNow,
            items: firestore.FieldValue.arrayUnion(itemName),
          })
          .then(() => {
            console.log('First food uploaded to firebase!');
            Alert.alert('First bit of food added!');
          });
      }
    });
    // console.log(document);
    // if (document && document.exists) {
    //   await ref
    //     .update({
    //       food: nutritionData,
    //       time: timeNow,
    //       items: firestore.FieldValue.arrayUnion('Protein Bars'),
    //     })
    //     .then(() => {
    //       console.log('Food uploaded to firebase!');
    //       Alert.alert('Food added!');
    //     });
    // }
    // else {
    //   await ref
    //     .set({
    //       food: nutritionData,
    //       time: timeNow,
    //       items: firestore.FieldValue.arrayUnion('Sweets'),
    //     })
    //     .then(() => {
    //       console.log('First food uploaded to firebase!');
    //       Alert.alert('First food added!');
    //     });
    // }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      setIsBarcodeRead(false);
      getInfo();
    });
    navigation.addListener('blur', () => {
      setIsBarcodeRead(true);
    });
    if (isBarcodeRead) {
      let api_query = {query: barcodeValue};
      axios
        .post(
          'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=MyU301gqSq7NmAjzPLEY7z0KgTHIFlNU7vR4nmjA',
          api_query,
        )
        .then(resp => {
          let food = resp.data.foods[0];
          if (!food) {
            Alert.alert(
              'Error!',
              'Item is not registered! Going back to the Home page.',
              [
                {
                  text: 'Cancel',
                  onPress: navigation.navigate('Home'),
                  style: 'cancel',
                },
              ],
            );
          } else if (userData) {
            let nutrition_data = {
              // name: food.description,
              cals:
                parseFloat(servings) * getNutrient(food.foodNutrients, 1008) +
                userData.food.cals,
              protein:
                parseFloat(servings) * getNutrient(food.foodNutrients, 1003) +
                userData.food.protein,
              carb:
                parseFloat(servings) * getNutrient(food.foodNutrients, 1005) +
                userData.food.carb,
              fat:
                parseFloat(servings) * getNutrient(food.foodNutrients, 1004) +
                userData.food.fat,
            };
            setItemName(food.description);
            setNutritionData(nutrition_data);
          } else {
            let nutrition_data = {
              // name: food.description,
              cals:
                parseFloat(servings) * getNutrient(food.foodNutrients, 1008),
              protein:
                parseFloat(servings) * getNutrient(food.foodNutrients, 1003),
              carb:
                parseFloat(servings) * getNutrient(food.foodNutrients, 1005),
              fat: parseFloat(servings) * getNutrient(food.foodNutrients, 1004),
            };
            setItemName(food.description);
            setNutritionData(nutrition_data);
          }
        });
    }
  }, [isBarcodeRead, navigation]);

  const onBarcodeRead = event => {
    if (event.length > 0 && !isBarcodeRead) {
      setIsBarcodeRead(true);
      setBarcodeValue(event[0].data);
    }
  };

  if (!isBarcodeRead) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <RNCamera
          captureAudio={false}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
            onBarcodeRead(barcodes);
          }}>
          <BarcodeMask
            width={300}
            height={300}
            showAnimatedLine={false}
            outerMaskOpacity={0.8}
          />
        </RNCamera>
        <Button
          title="Testing Barcode"
          onPress={() => {
            setIsBarcodeRead(true);
            setBarcodeValue(testBarcode);
          }}
        />
        {/* <View style={styles.text}>
          <Text style={{fontSize: 25}}>Scan The Barcode!</Text>
        </View> */}
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.action}>
        Input the number of servings for the item of food
      </Text>
      <View style={styles.action}>
        <TextInput
          placeholder="Number of servings"
          placeholderTextColor="#666666"
          value={servings ? servings.toString() : ''}
          onChangeText={txt => setServings(txt)}
          autoCorrect={false}
          style={styles.textInput}
          keyboardType="number-pad"
        />
        <Button title="Send to DB" onPress={updateValues} />
      </View>
    </SafeAreaView>
  );
};
export default BarcodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#333333',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
