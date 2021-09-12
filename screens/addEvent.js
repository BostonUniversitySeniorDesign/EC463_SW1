import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Picker, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {dummyData, FONTS, SIZES, COLORS, icons, images} from '../constants';
import styled from 'styled-components/native';
import {McAvatar, McIcon, McText} from '../components';
import {TextInput} from 'react-native-gesture-handler';

const addEvent = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <View style={styles.container}>
      <Header>
        <McText h2>CREATE EVENT</McText>
        <McAvatar
          style={{
            marginLeft: 100,
            marginBottom: 20,
          }}
          source={images.avatar}
        />
      </Header>
      <LinearGradient
        colors={COLORS.linear}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={{
          width: 400,
          height: 600,
          marginBottom: 50,
          borderRadius: 15,
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <McText h4>Title</McText>
          <TextInput
            placeholder="Enter title"
            placeholderTextColor={COLORS.lightGray}
            style={{
              fontSize: 17,
              marginLeft: 10,
              backgroundColor: COLORS.transparentWhite,
              borderRadius: 10,
              color: COLORS.white,
              width: 300,
            }}
            textAlign={'center'}></TextInput>
        </View>
        <View
          style={{
            marginTop: 20,
            justifyContent: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 30,
          }}>
          <McText h4>Type</McText>
          <Picker
            mode="dropdown"
            selectedValue={selectedValue}
            style={{
              marginLeft: 10,
              height: 50,
              width: 150,
              color: COLORS.lightGray,
            }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item color={COLORS.gray} label="Select Type" value="" />
            <Picker.Item label="Connect" value="connect" />
            <Picker.Item label="Mentor" value="mentor" />
            <Picker.Item label="UpSkilling" value="upskilling" />
            <Picker.Item label="Impact" value="impact" />
          </Picker>
        </View>

        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <McText h4>Time</McText>
          <TextInput
            placeholder="Enter starting time"
            placeholderTextColor={COLORS.lightGray}
            style={{
              fontSize: 17,
              marginLeft: 10,
              backgroundColor: COLORS.transparentWhite,
              borderRadius: 10,
              color: COLORS.white,
              width: 300,
            }}
            textAlign={'center'}></TextInput>
        </View>

        <View
          style={{
            marginTop: 30,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <McText h4>Location</McText>
          <TextInput
            placeholder="Enter location"
            placeholderTextColor={COLORS.lightGray}
            style={{
              fontSize: 17,
              marginLeft: 10,
              backgroundColor: COLORS.transparentWhite,
              borderRadius: 10,
              color: COLORS.white,
              width: 270,
            }}
            textAlign={'center'}></TextInput>
        </View>

        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: 28,
          }}>
          <McText h4>Decription</McText>
          <TextInput
            placeholder="   Event's decription"
            placeholderTextColor={COLORS.lightGray}
            style={{
              fontSize: 17,
              backgroundColor: COLORS.transparentWhite,
              borderRadius: 10,
              color: COLORS.white,
              width: 345,
              height: 120,
              textAlignVertical: 'top',
            }}
            textAlign={'left'}></TextInput>
        </View>

        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <McText h4>Image</McText>
          <TextInput
            placeholder="Upload an image"
            placeholderTextColor={COLORS.lightGray}
            style={{
              fontSize: 17,
              marginLeft: 10,
              backgroundColor: COLORS.transparentWhite,
              borderRadius: 10,
              color: COLORS.white,
              width: 290,
            }}
            textAlign={'center'}></TextInput>
          <McIcon
            source={icons.gift}
            style={{
              marginLeft: -20,
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              width: 140,
              height: 32,
              borderRadius: 10,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 15,
            }}>
            <McText h4 style={{color: COLORS.black, letterSpacing: 1}}>
              {' '}
              Create
            </McText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 140,
              height: 32,
              borderRadius: 10,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 15,
            }}
            onPress={() => {
              navigation.navigate('Featured');
            }}>
            <McText h4 style={{color: COLORS.black, letterSpacing: 1}}>
              {' '}
              Cancel
            </McText>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${Platform.OS === 'ios' ? '20px' : '5px'};
  margin-left: 30px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default addEvent;
