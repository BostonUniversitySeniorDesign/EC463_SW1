import React from 'react';
import {Text, StyleSheet, TextInput, View} from 'react-native';
import FormInput from '../components/FormInput';

const FoodIntake = ({navigation}) => {
  return (
    <View style={styles.container}>
        <FormInput
            labelValue={"Number of servings"}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default FoodIntake;
