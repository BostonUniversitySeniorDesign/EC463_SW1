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
    if (list[item].nutrientId === nutrientID) {
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
    }).then(() => {
      console.log('Food uploaded to firebase!');
      Alert.alert('Food added!');
    });
  };

  useEffect(() => {
    if (isBarcodeRead) {
      // setIsBarcodeRead(false);
      // setBarcodeValue('');
      let api_query = {query: barcodeValue};
      axios
        .post(
          'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=MyU301gqSq7NmAjzPLEY7z0KgTHIFlNU7vR4nmjA',
          api_query,
        )
        .then(resp => {
          let food = resp.data.foods[0];
          let nutrition_data = {
            name: food.description,
            cals: parseFloat(servings) * getNutrient(food.foodNutrients, 1008),
            protein: parseFloat(servings) * getNutrient(food.foodNutrients, 1003),
            carb: parseFloat(servings) * getNutrient(food.foodNutrients, 1005),
            fat: parseFloat(servings) * getNutrient(food.foodNutrients, 1004),
          };
          setNutritionData(nutrition_data);
        });
    }
  }, [isBarcodeRead, barcodeValue]);

  const onBarcodeRead = event => {
    if (event.length > 0 && !isBarcodeRead) {
      setIsBarcodeRead(true);
      setBarcodeValue(event[0].data);
    }
  };

  const testBarcode = '034856050926';

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* {barcodeValue ?  */}
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
      {isBarcodeRead ? (
        <View style={styles.action}>
          <TextInput
            placeholder="Number of servings"
            placeholderTextColor="#666666"
            value={servings ? servings : ''}
            onChangeText={txt => setServings(txt)}
            autoCorrect={false}
            style={styles.textInput}
          />
          <Button title="Send to DB" onPress={updateValues} />
        </View>
      ) : (
        <View>
          <Button
            title="Testing Barcode"
            onPress={() => {
              setIsBarcodeRead(true);
              setBarcodeValue(testBarcode);
            }}
          />
        </View>
      )}
      
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
});
