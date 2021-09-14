import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

export default function Home({navigation}) {
  const {logout} = useContext(AuthContext);
  const [testing, setTesting] = useState(true);
  return (
    <View style={styles.container}>
      <Text>Home Screen page</Text>
      <Button
        title="Go to something screen"
        // onPress={() => navigation.navigate("About")}
        onPress={() => {setTesting(!testing)}}
      />
      {testing ? <View><Text>Hi</Text></View> : <Button title="Sign out" onPress={() => logout()} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
