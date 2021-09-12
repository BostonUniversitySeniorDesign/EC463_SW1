import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';

const BarcodeScanner = ({navigation}) => {
  const [barcode, setBarcode] = useState('');

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        captureAudio={false}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        // flashMode={RNCamera.Constants.FlashMode.on}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          {
            barcode.length
              ? barcodes.map(bar => {
                  setBarcode(bar.data);
                })
              : console.log('Searching..');
          }
        }}
        // onBarCodeRead={({barcodes}) => {console.log(barcodes)}}
      />
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text>{barcode ? barcode : 'Searching...'}</Text>
      </View>
    </View>
  );
};
export default BarcodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
