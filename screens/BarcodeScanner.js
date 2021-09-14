<<<<<<< HEAD
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import axios from 'react-native-axios';
import firestore from '@react-native-firebase/firestore';
import {restProperty} from '@babel/types';
import {AuthContext} from '../navigation/AuthProvider';

const getNutrient = (list, nutrientID) => {
  for (let item in list) {
    if (item.nutrientId === nutrientID) {
      return item.value;
    }
  }
};
=======
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, Button} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import {SafeAreaView} from 'react-native-safe-area-context';

import FoodIntake from './FoodIntake';
>>>>>>> 329caae1e6760b1a2ad5e58e9c821f1e14bfc252

const BarcodeScanner = ({navigation}) => {
  const [user, logout] = useContext(AuthContext);
  const [display, setDisplay] = useState(false);
  const [scanAnother, setscanAnother] = useState(false);
  const [isBarcodeRead, setIsBarcodeRead] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState('');

  useEffect(() => {
    if (isBarcodeRead) {
      Alert.alert(barcodeValue, [
        {
          text: 'OK',
          onPress: () => {
            setIsBarcodeRead(false);
            setBarcodeValue('');
          },
        },
      ]);
      let api_query = {query: barcodeValue};
      axios
        .post(
          'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=MyU301gqSq7NmAjzPLEY7z0KgTHIFlNU7vR4nmjA',
          api_query,
        )
        .then(resp => {
          let food = resp.foods[0];
          let servings = 1;
          Alert.prompt('SERVINGS', text => {
            servings = parseFloat(text);
          });

          let nutrition_data = {
            name: food.description,
            cals: servings * getNutrient(food.foodNutrients, 1008),
            protein: servings * getNutrient(food.foodNutrients, 1003),
            carb: servings * getNutrient(food.foodNutrients, 1005),
            fat: servings * getNutrient(food.foodNutrients, 1004),
          };

          firestore()
            .collection('foods')
            .doc(user.uid)
            .add({
              food: nutrition_data,
              time: Date().toISOString().split('T')[0],
            });
        });
    }
  }, [isBarcodeRead, barcodeValue, user.uid]);
  const onBarcodeRead = event => {
    if (event.length > 0 && !isBarcodeRead) {
      setIsBarcodeRead(true);
      setBarcodeValue(event[0].data);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <RNCamera
        captureAudio={false}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
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
        style={{flex: 1}}
        title="Go to Food Intake"
        onPress={() => navigation.navigate('Food Intake')}
      />
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
});
