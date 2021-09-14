import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, Button} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import {SafeAreaView} from 'react-native-safe-area-context';

import FoodIntake from './FoodIntake';

const BarcodeScanner = ({navigation}) => {
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
    }
  }, [isBarcodeRead, barcodeValue]);

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
