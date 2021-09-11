import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,CheckBox, Button, SafeAreaView,TextInput,FlatList,ImageBackground,TouchableOpacity,TouchableWithoutFeedback,Modal} from 'react-native';
import moment from 'moment';
import {LinearGradient} from'expo-linear-gradient';
import {Calendar, CalendarList } from 'react-native-calendars';
import styled from 'styled-components/native';
import {dummyData,FONTS,SIZES,COLORS,icons,images} from '../constants';
// import {McText,McIcon,McAvatar} from '../components';

import { ScrollView } from 'react-native-gesture-handler';


export default function Events({navigation}) {

  // State for search keyword
  const [searchKey,setsearchKey] = useState("")
  //State for Modal visibility 
  const [visible, setVisible]= useState(false)

  const [filters,setFitters] = useState(null)
  //State for Topic in filter modal
  const [topic,setToppic] = useState("")

  //State for Calendar in filter modal
  const [isCalendarOpen,setIsCalenderOpen]= useState(false)
  const [calendar,setCalendar] = useState("")
  const [isCalendarEndOpen,setIsCalenderEndOpen]= useState(false)
  const [calendarEnd,setCalendarEnd]= useState("")

  //State for check boxes
  const [isConnectCheck, setIsConnectCheck] = useState(true)
  const [isMentorCheck, setIsMentorCheck] = useState(true)
  const [isUpskillingCheck, setIsUpskillingCheck] = useState(true)
  const [isImpactCheck, setIsImpactCheck] = useState(true)

  const Catagories= dummyData.Catagories
  const [CatagoriesState,setCatagoriesState]= useState(Catagories)
  
  //Handle insert onlu number for Start Date
  const handleInputCalendar = (text) =>{
    const count = 0
    if (/^\d+$/.test(text)||text==="" ||text.includes("-")) {
      if(text.length ===4 || text.length===7){
        text=text+"-"
      }
      setCalendar(text)
    }
      
  }
   //Handle insert onlu number for End Date
  const handleInputCalendarEnd = (text) =>{
    const count = 0
    if (/^\d+$/.test(text)||text==="" ||text.includes("-")) {
      if(text.length ===4 || text.length===7){
        text=text+"-"
      }
      setCalendarEnd(text)
    }
      
  }
  //Handler oncheck for each check box
  const onCheck = (id)=>{
    const data = CatagoriesState
    const index= CatagoriesState.findIndex(x=>x.id===id)    
    if(data[index].checked){
      data[index].checked=false
      setFitters(data[index].name)
      switch(data[index].name){
        case "connect":
        setIsConnectCheck(false)
        break;
        case "mentor":
        setIsMentorCheck(false)
        break;
        case "upskilling":
        setIsUpskillingCheck(false)
        break;
        case "impact":
        setIsImpactCheck(false)
        break;
        default:
      }
      
    }else{
      //let filteredArray = filters.filter(item => item !== test[index].name)
      //setFitters(filteredArray)
      data[index].checked=true
      switch(data[index].name){
        case "connect":
        setIsConnectCheck(true)
        break;
        case "mentor":
        setIsMentorCheck(true)
        break;
        case "upskilling":
        setIsUpskillingCheck(true)
        break;
        case "impact":
        setIsImpactCheck(true)
        break;
        default:
      }
    }
    setCatagoriesState(data)
  }
  //All filter for search bar + filter modal
  const searchSpecialEvent = (data)=>{
    const columns = data[0] && Object.keys(data[0])
    return data.filter((row)=>
    columns.some((column)=>row[column].toString().toLowerCase().indexOf(searchKey.toLowerCase())>-1
    &&(row["type"].toString().toLowerCase().indexOf(topic.toLowerCase())>-1
    || row["title"].toString().toLowerCase().indexOf(topic.toLowerCase())>-1)
    && row["startingTime"].toString().toLowerCase().indexOf(calendar.toLowerCase())>-1
    ))
  }
  const renderCatogoryFilter = ()=>{
    return CatagoriesState.map((item,key)=>{
      return (
        <TouchableOpacity style ={{alignItems:"center",flexDirection:"row"}} key={key} onPress={()=>{onCheck(item.id)}}>
          <CheckBox
          tintColors={{ true: COLORS.transparentBlack, false: COLORS.black}}
          value={item.checked}
          onValueChange={()=>{
            onCheck(item.id)
          }}/>
          <McText h3>{item.name}</McText>
        </TouchableOpacity>
      )
    })

  }

  const _renderItem =({item,index})=>{
    return(
      <TouchableWithoutFeedback onPress={()=>{
        navigation.navigate('EventDetail',{selectedEvent:item});
      }}>
      <View style={{
        marginLeft:index=== 0?30:20,
        marginRight: index === dummyData.Events.length -1? 30:0
      }}>
        <EachFeature>
          <ImageBackground source={item.image}
          resizeMode='cover'
          //borderRadius= '15'
          style={{
            width:SIZES.width /2 + 40,
            height:SIZES.height /4 +40,
            justifyContent:'space-between',
            borderRadius:15
          }}
          >
          
          <View style={{
            alignItems:'flex-end',
            marginHorizontal:15,
            marginVertical:15,

          }}>
          <DateBox>
            <McText body5 color={COLORS.black} style={{opacity:0.5,letterSpacing:2}}>
              {moment(item.startingTime).format('MMM').toUpperCase()
              }</McText>
            <McText h2 color={COLORS.black}>{moment(item.startingTime).format('DD')}</McText>
          </DateBox>
          </View>
          
          
          <View style={{
            marginLeft:20,
            marginRight:25,
            marginBottom:20,
          }}>
            <McText body5 style= {{opacity:0.5}}>{item.type}</McText>
            <McText h2>{item.title}</McText>
          </View>
          </ImageBackground>
          </EachFeature>
      </View>
      </TouchableWithoutFeedback>
    )
  }
 
  
  return (
    <SafeAreaView style={styles.container}>
    {/*Header Section */}
    <SectionHeader>
      <View>
        <McText body5 style={{opacity:0.5}}>
                December 21 9:10PM
        </McText>
        <McText>Explore events</McText>
      </View>
      <McAvatar source={images.avatar}/>
    </SectionHeader>
    <View style={{
      alignContent:'center',
      justifyContent:'center',
      alignItems:"flex-end",
      marginRight: 30,
      marginBottom:5
    }}
    >
      <TouchableWithoutFeedback onPress={()=>{
          navigation.navigate('addEvent')
      }}>
        <McText h4>Add Event
        <McIcon source={icons.share}size={24}/>
        </McText>
        
     </TouchableWithoutFeedback>
    </View>
    
    {/*Seach section */}
    <SearchSection>
    <SearchView>
        <McIcon source={icons.search} size={24}/>
          <TextInput 
          placeholder="Search..." placeholderTextColor={COLORS.gray1} style={{
            fontSize:17,
            color: COLORS.white,
            width:300 
            }}
          value= {searchKey}
          onChangeText={text=> setsearchKey(text)}
          >
          </TextInput>
        <View>
        <TouchableWithoutFeedback onPress={()=>{
        setVisible(true)
        }}>
          <McIcon source={icons.filter}size={24}/>
        </TouchableWithoutFeedback>
        </View>
    </SearchView>
    </SearchSection>
    <Modal 
    transparent = {true}
    visible= {visible}
    >
      <View style={{
      backgroundColor:"#000000aa",
      flex:1,
      paddingTop:150
      }}> 
      <LinearGradient
      colors={COLORS.linear}
      start = {{x:0,y:0}}
      end = {{x:1, y:1}}
      style={{
      height: 320,
      marginHorizontal:30,
      borderRadius:15,
      }}
    > 
      <View style={{
        flexDirection:'row',
        marginLeft:-30,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
        }}>
        <View style={{
          marginRight:50,
          paddingLeft:50,
          alignContent:'space-between'
        }}>
        <McText h1 style={{
          backgroundColor:COLORS.transparentBlack,
          width:200,
          borderRadius:10,
          color: COLORS.white,
        }}>  Event Filter</McText>
        </View>
          <TouchableOpacity
        style={{
          marginLeft:80,
          width:20,
          height:20,
          borderRadius:10,
          backgroundColor:COLORS.transparentBlack,
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}
        onPress={()=>{setVisible(false)}}>
          <McText h4 style={{color:COLORS.white,letterSpacing:1}}> X</McText>

        </TouchableOpacity>
      
      </View>
      <View style={{
        flexDirection:'row'
      }}>
      <View style={{
        marginTop: 20,
        alignContent:"flex-start",
        justifyContent:"flex-start",
        marginLeft:20
      }}>
      {renderCatogoryFilter()}
      </View>
      <View style={{
        marginTop: 20,
        alignContent:"flex-start",
        justifyContent:"flex-start",
        marginLeft:50
      }}>
         <View>
          <McText h4>By Topic</McText>
          <TextInput 
                placeholder="Enter topic" placeholderTextColor={COLORS.lightGray} style={{
                backgroundColor:COLORS.transparentWhite,
                borderRadius:15,
                fontSize:17,
                color: COLORS.white,
                width:150 ,
                textAlign:'center'
                }}
              value= {topic}
              onChangeText={text=> setToppic(text)}
              >
            </TextInput>
        </View>
        <View>
          <McText h4>By ZipCode</McText>
          <TextInput 
                placeholder="Ex: 95670" placeholderTextColor={COLORS.lightGray} style={{
                backgroundColor:COLORS.transparentWhite,
                borderRadius:15,
                fontSize:17,
                color: COLORS.white,
                width:150 ,
                textAlign:'center'
                }}
              //value= {searchKey}
              //onChangeText={text=> setsearchKey(text)}
              >
            </TextInput>
        </View>
       
        
       
      </View>
      </View>
      <View style={{
        flexDirection:'row',
        marginTop:20,
        marginLeft:30
      }}>
      <View>
          <View style={{
            flexDirection:'row'
          }}>
          <McText h4> Start Date</McText>
          <View style={{
            marginLeft:40
          }}>
          <TouchableWithoutFeedback onPress={()=>{
            setIsCalenderOpen(!isCalendarOpen)
          }}>
          <McIcon source={icons.filter}size={24}/>
          </TouchableWithoutFeedback>
          </View>
          </View>
          
          <TextInput
            keyboardType = 'numeric' 
            placeholder="yyyy-mm-dd" placeholderTextColor={COLORS.lightGray} style={{
            backgroundColor:COLORS.transparentWhite,
            borderRadius:15,
            fontSize:17,
            color: COLORS.white,
            width:150 ,
            textAlign:'center'
            }}
            maxLength= {10}
            value= {calendar}
            onChangeText={text=> handleInputCalendar(text)}
          >
          </TextInput>
          {isCalendarOpen&&
          <Calendar         
            style={[styles.calendar,{width:200,marginLeft:-50}]}
            minDate={'2021-05-13'}
            onDayPress={(day)=>{
              setCalendar(moment(day.dateString).format('Y/MM/DD').toUpperCase())
              setIsCalenderOpen(!isCalendarOpen)
            }}
          />
          }
                          
        </View>
        <View style={{
          marginLeft:20
        }}>
          <View style={{
            flexDirection:'row'
            
          }}>
          <McText h4> End Date</McText>
          <View style={{
            marginLeft:50
          }}>
          <TouchableWithoutFeedback onPress={()=>{
            setIsCalenderEndOpen(!isCalendarEndOpen)
          }}>
          <McIcon source={icons.filter}size={24}/>
          </TouchableWithoutFeedback>
          </View>
          </View>
          
          <TextInput
            keyboardType = 'numeric' 
            placeholder="yyyy-mm-dd" placeholderTextColor={COLORS.lightGray} style={{
            backgroundColor:COLORS.transparentWhite,
            borderRadius:15,
            fontSize:17,
            color: COLORS.white,
            width:150 ,
            textAlign:'center'
            }}
            maxLength= {10}
            value= {calendarEnd}
            onChangeText={text=> handleInputCalendarEnd(text)}
          >
          </TextInput>
          {isCalendarEndOpen&&
          <Calendar         
            style={[styles.calendar,{width:200}]}
            minDate={'2021-05-13'}
            onDayPress={(day)=>{
              setCalendarEnd(moment(day.dateString).format('Y/MM/DD').toUpperCase())
              setIsCalenderEndOpen(!isCalendarEndOpen)
            }}
          />
          }
                          
        </View>
      </View>
    </LinearGradient>
    </View>
           
    </Modal>
    <ScrollView>
    {/*Connect */}
    <SectionTitle>
      <McText h5>CONNECT</McText>
    </SectionTitle>
    <View>{isConnectCheck&&<FlatList
      horizontal
      contentContainerStyle={{}}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item)=>'event_'+item.id}
      data = {searchSpecialEvent(dummyData.Events)}
      renderItem={_renderItem}
      ></FlatList>}
      
    </View>
    {/*Featerd */}
    <SectionTitle>
      <McText h5>MENTOR</McText>
    </SectionTitle>
    <View>
      {isMentorCheck&&<FlatList
      horizontal
      contentContainerStyle={{}}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item)=>'event_'+item.id}
      data = {searchSpecialEvent(dummyData.FavoriteEvents)}
      renderItem={_renderItem}
      ></FlatList>}
      
    </View>
    {/*UPSKILLING */}
    <SectionTitle>
      <McText h5>UPSKILLING</McText>
    </SectionTitle>
    <View>
      {isUpskillingCheck&& <FlatList
      horizontal
      contentContainerStyle={{}}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item)=>'event_'+item.id}
      data = {searchSpecialEvent(dummyData.FavoriteEvents)}
      renderItem={_renderItem}
      ></FlatList>}
     
    </View>{/*IMPACT */}
    <SectionTitle>
      <McText h5>IMPACT</McText>
    </SectionTitle>
    <View>
      {isImpactCheck&& <FlatList
      horizontal
      contentContainerStyle={{}}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item)=>'event_'+item.id}
      data = {searchSpecialEvent(dummyData.FavoriteEvents)}
      renderItem={_renderItem}
      ></FlatList>}
     
    </View>
    {/*For You Section */}
    <SectionTitle>
      <McText h5>For You</McText>
    </SectionTitle>
    <LinearGradient
      colors={COLORS.linear}
      start = {{x:0,y:0}}
      end = {{x:1, y:1}}
      style={{
        height: 120,
        marginHorizontal:30,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
      }}
    > 
      <View style={{
        flexDirection:'row',
        marginHorizontal:30,
        marginLeft:-30,
        justifyContent:'center',
        alignItems:'center'
        }}>
        <GiftBox >
          <McIcon source={icons.gift}size={24}/>
        </GiftBox>
        <View style={{
          marginLeft:50
        }}>
          <McText h3>Claim a free Class </McText>
          <McText body4 style={{width:180}}>Share an event to your friends</McText>
        </View>
      </View>

    </LinearGradient>
    <View style={{
      height:150,
    }}>

    </View>
    </ScrollView>
    </SafeAreaView>
  );
};
const SectionHeader =  styled.View`
  padding: 16px ${SIZES.padding};
  justify-content: space-between;
  align-items:center;
  flex-direction: row;
`;
const SearchSection = styled.View`
  margin : 4px ${SIZES.padding};
  height: 50px;
  background-color: ${COLORS.input};
  border-radius: 15px;
  `;
const SearchView = styled.View`
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  margin-left:9px;
  margin-right:15px;
  margin-top:9px;
`;
const SectionTitle = styled.View`
  margin: 20px ${SIZES.padding}
`;
const DateBox = styled.View`
  width : 60px;
  height: 60px;
  border-radius: 15px;
  background-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`;
const EachFeature = styled.View`
  border-radius: 15px;
`;
const GiftBox = styled.View`
width : 50px;
height: 50px;
border-radius: 15px;
background-color: ${COLORS.white};
justify-content: center;
align-items: center;
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});