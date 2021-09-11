import React, {useState, useContext} from 'react';
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
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassowrd] = useState();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {login, googlelogin, facebooklogin} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>EC463 SW1</Text>

      {/* <FormInput
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

      <FormButton
        buttonTitle="Sign In"
        onPress={() => login(email, password)}
      /> */}

      <SocialButton
        buttonTitle="Sign In with Google"
        buttonType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => googlelogin()}
      />
    </View>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#000',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
});
