import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassowrd] = useState();
  const [confirmPassword, setConfirmPassowrd] = useState();
  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an Account</Text>

      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        secTxt={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassowrd(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secTxt={true}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={userConfirmPassword =>
          setConfirmPassowrd(userConfirmPassword)
        }
        placeholderText="Confirm Password"
        iconType="lock"
        secTxt={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => register(email, password, confirmPassword)}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <TouchableOpacity onPress={() => alert('Privacy Clicked')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Privacy policy
          </Text>
        </TouchableOpacity>
      </View>

      <SocialButton
        buttonTitle="Sign Up with Google"
        buttonType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {}}
      />

      <SocialButton
        buttonTitle="Sign Up with Facebook"
        buttonType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => {}}
      />

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.navButtonText}>Have an Account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    // fontFamily:
    fontSize: 28,
    marginBottom: 10,
    color: '#000',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    // fontFamily:
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    color: 'grey',
  },
});
