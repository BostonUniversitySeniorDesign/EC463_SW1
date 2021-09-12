import React, {useState, useEffect} from 'react';
import {useReducer} from 'react';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {LinearGradient} from 'expo-linear-gradient';
import styled from 'styled-components/native';
import {dummyData, FONTS, SIZES, COLORS, icons, images} from '../constants';
import {McText, McIcon, McAvatar} from '../components';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const EventDetail = ({navigation, route}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    let {selectedEvent} = route.params;
    setSelectedEvent(selectedEvent);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: COLORS.black,
        }}
        style={{
          backgroundColor: COLORS.black,
        }}>
        <ImageBackground
          resizeMode="cover"
          source={selectedEvent?.image}
          style={{
            width: SIZES.width,
            height:
              SIZES.height < 700 ? SIZES.height * 0.4 : SIZES.height * 0.5,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            {/*Image Header */}
            <SectionImageHeader>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  width: 56,
                  height: 40,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <McIcon source={icons.back_arrow} size={24} />
              </TouchableOpacity>
              <View
                style={{
                  width: 96,
                  height: 40,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderRadius: 10,
                }}>
                <TouchableOpacity>
                  <McIcon
                    source={icons.like}
                    size={24}
                    style={{
                      marginLeft: 16,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <McIcon
                    source={icons.share}
                    size={24}
                    style={{
                      marginRight: 16,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </SectionImageHeader>
            {/*Image Footer */}
            <SectionImageFooter>
              <LinearGradient
                colors={['transparent', '#000']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={{
                  width: '100%',
                  height: 400,
                  justifyContent: 'flex-end',
                }}>
                <FooterContentView>
                  <View>
                    <McText
                      body4
                      style={{
                        opacity: 0.5,
                        letterSpacing: 2,
                      }}>
                      {selectedEvent?.type}{' '}
                    </McText>
                    <McText h1>{selectedEvent?.title} </McText>
                    <McText
                      body4
                      style={{
                        opacity: 0.5,
                        letterSpacing: 2,
                      }}>
                      STARTING{' '}
                      {moment(selectedEvent?.startingTime).format('hh:mm A')}
                    </McText>
                  </View>
                  <LinearGradient
                    colors={COLORS.linear}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <McText
                      body4
                      color={COLORS.white}
                      style={{letterSpacing: 1}}>
                      {moment(selectedEvent?.startingTime)
                        .format('MMM')
                        .toUpperCase()}{' '}
                    </McText>
                    <McText h2 color={COLORS.white}>
                      {moment(selectedEvent?.startingTime).format('DD')}
                    </McText>
                  </LinearGradient>
                </FooterContentView>
              </LinearGradient>
            </SectionImageFooter>
          </View>
        </ImageBackground>

        {/*Buttons group Section */}
        <ButtonSection>
          <TouchableOpacity
            style={{
              width: 70,
              height: 32,
              borderRadius: 10,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <McText h4 style={{color: COLORS.black, letterSpacing: 1}}>
              {' '}
              About
            </McText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 140,
              height: 32,
              borderRadius: 10,
              backgroundColor: COLORS.input,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 15,
            }}>
            <McText h4 style={{color: COLORS.gray, letterSpacing: 1}}>
              {' '}
              Participants
            </McText>
          </TouchableOpacity>
        </ButtonSection>

        {/*Decription Section  */}
        <DecriptionSection>
          <McText body3>{selectedEvent?.description}</McText>
        </DecriptionSection>
        {/*Location Section  */}
        <LocationSection>
          <McText h3> LOCATION</McText>
          <View
            style={{
              height: 250,
            }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{
                height: 250,
                borderRadius: 30,
                marginTop: 20,
              }}
              minZoomLevel={15}
              initialRegion={dummyData.Region}
              customMapStyle={dummyData.MapStyle}></MapView>
          </View>
          <View style={{paddingBottom: 150}}></View>
        </LocationSection>
      </ScrollView>
      <BottomSection>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 30,
          }}>
          <View>
            <McText
              body3
              style={{
                opacity: 0.5,
                letterSpacing: 1,
              }}>
              Price
            </McText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignContent: 'flex-end',
                marginLeft: 10,
              }}>
              <McText h2>$17.60</McText>
              <McText h3>/Person</McText>
            </View>
          </View>
          <TouchableOpacity>
            <LinearGradient
              colors={COLORS.linear}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={{
                width: 170,
                height: 60,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <McText h4 style={{color: COLORS.white}}>
                  {' '}
                  BUY A TICKET{' '}
                </McText>
                <McIcon source={icons.buy_ticket} size={24}></McIcon>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BottomSection>
    </View>
  );
};
const SectionImageHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${Platform.OS === 'ios' ? '40px' : '10px'};
  margin-left: 30px;
  margin-right: 30px;
`;

const SectionImageFooter = styled.View`
  flex: 1;
  justify-content: flex-end;
  position: relative;
  z-index: 1;
`;
const FooterContentView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  margin: 0px 30px;
`;

const ButtonSection = styled.View`
  margin: 15px 30px;
  flex-direction: row;
`;
const DecriptionSection = styled.View`
  margin: 10px 30px;
`;
const LocationSection = styled.View`
  margin: 10px 30px;
`;

const BottomSection = styled.View`
  height: 130px;
  width: ${SIZES.width + 'px'};
  border-radius: ${SIZES.radius};
  background-color: ${COLORS.tabBar};
  position: absolute;
  bottom: 0px;
  justify-content: center;
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventDetail;
