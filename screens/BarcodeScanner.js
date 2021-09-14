import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  TextInput,
} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import axios from 'react-native-axios';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';

const getNutrient = (list, nutrientID) => {
  for (let item = 0; item < list.length; item++) {
    if (list[item].nutrientId == nutrientID) {
      // console.log(list[item].value);
      return list[item].value;
    }
  }
};

const BarcodeScanner = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [servings, setServings] = useState(4);
  const [nutritionData, setNutritionData] = useState({});
  const [isBarcodeRead, setIsBarcodeRead] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState('');

  const ref = firestore().collection('foods');

  const updateValues = async () => {
    let now = new Date();

    await ref.add({
      food: nutritionData,
      time: now.toISOString().split('T')[0],
    });
  };

  useEffect(() => {
    if (isBarcodeRead) {
      // Alert.alert(barcodeValue, [
      //   {
      //     text: 'OK',
      //     onPress: () =>
      //     {
      //     },
      //   },
      // ]);
      setIsBarcodeRead(false);
      setBarcodeValue('');
      let api_query = {query: barcodeValue};
      axios
        .post(
          'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=MyU301gqSq7NmAjzPLEY7z0KgTHIFlNU7vR4nmjA',
          api_query,
        )
        .then(resp => {
          let food = resp.data.foods[0];
          // let servings = 1;
          // Alert.prompt('SERVINGS', [
          //   text => {
          //     servings = parseFloat(text);
          //     console.log(servings);
          let nutrition_data = {
            name: food.description,
            cals: getNutrient(food.foodNutrients, 1008),
            protein:  getNutrient(food.foodNutrients, 1003),
            carb:   getNutrient(food.foodNutrients, 1005),
            fat:  getNutrient(food.foodNutrients, 1004),
          };
          setNutritionData(nutrition_data);
          console.log(nutritionData);
          //   },
          // ]);
        });
    }
  }, [isBarcodeRead, barcodeValue]);

  const onBarcodeRead = event => {
    if (event.length > 0 && !isBarcodeRead) {
      setIsBarcodeRead(true);
      setBarcodeValue(event[0].data);
    }
  };

  let testBarcode = '034856050926';

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
        title="Testing Barcode"
        onPress={() => {
          setIsBarcodeRead(true);
          setBarcodeValue(testBarcode);
        }}
      />
      <Button title="Send to DB" onPress={() => updateValues} />
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
