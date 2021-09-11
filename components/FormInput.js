import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont();

const FormInput = ({
  labelValue,
  placeholderText,
  iconType,
  secTxt,
  ...rest
}) => {
  const [secTxtEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <FontAwesome name={iconType} size={20} color="#666" />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="grey"
        secureTextEntry={secTxtEntry}
        {...rest}
      />
      {secTxt ? (
        <View style={styles.iconStyle}>
          {secTxtEntry ? (
            <TouchableOpacity onPress={() => setSecureTextEntry(!secTxtEntry)}>
              <Feather name="eye" size={20} color="#666" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setSecureTextEntry(!secTxtEntry)}>
              <Feather name="eye-off" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      ) : null}
    </View>
  );
};
export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 1.5,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
