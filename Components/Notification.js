import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  ListView,
  TouchableOpacity,
  FlatList,Modal
} from 'react-native';
import { BallIndicator,} from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/FontAwesome';
export default class Notification extends Component {

  constructor(props) {
    super(props);

    this.state = {
   userID:"",
   isLoading:true,
    };
  }

  componentDidMount() {

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      // Call any action
      AsyncStorage.getItem("userID").then((value) => {
        this.setState({userID:value,isLoading:true }
       
          );this.notification()
      });
    
    });
  
  }

  notification = ()=>{
    this.setState({isLoading:true})
    var dataToSend = {userID:this.state.userID};
    
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //POST request 
    fetch('http://www.radicaltechsupport.com/pubg/activity.php?method=myroom', {
      method: "POST",//Request Type 
      body: formBody,//post body 
      headers: {//Header Defination 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
     // console.log(responseJson.response[0].gameID)
       this.setState({
         isLoading:false,
         dataSource:responseJson.response
       })
    })
    //If response is not in json then in error
    .catch((error) => {
      this.setState({isLoading:false})
      alert(JSON.stringify(error));
      console.error(error);
    });
  }


  componentWillUnmount(){
 
    this.focusListener.remove();
  
  }


  eventClickListener = (viewId) => {
    Alert.alert("alert", "event clicked");
  }

  render() {
    return (
      <View style={styles.container}>
                <View style={{paddingTop: 15, paddingBottom: 15,backgroundColor:'black'}}>
          
          <View style={{flexDirection: 'row', alignItems:'center', borderColor:'red',}}>
           <View style={{}}>
           <TouchableOpacity
            onPress={()=>this.props.navigation.goBack()}
            >
            <Ionicons style={{fontSize:30,margin:10,color:'#00BFFF'}} name="chevron-left"/>
            {/* <Text style={{ flex: 1, textAlign: 'right'}}>Right</Text> */}
          </TouchableOpacity>
     
           </View>
    
           <Text style={{color:'#fff'}}>Back</Text>
        
          
           
          </View>
         
        </View>
          {this.state.isLoading? 
     <Modal
     transparent={true}
      visible={this.state.isLoading?true:false}
     >
     <BallIndicator style={{flex:1,backgroundColor:'transparent'}} size={100}  color='#00BFFF' />
     </Modal>:null}
        <FlatList 
          style={styles.eventList}
          data={this.state.dataSource}
        keyExtractor= {(item) => {
          return item.gameID.toString();
        }}
        renderItem={({item}) => {
            return (
              <TouchableOpacity  onPress={() => this.eventClickListener("row")}>
                <View style={styles.eventBox}>
                  <View style={styles.eventDate}>
                     <Text  style={styles.eventDay}>{item.gameID}</Text>
                    
                  </View>
                  <View style={styles.eventContent}>
                    <Text  style={styles.eventTime}>{item.title}</Text>
                    <Text  style={styles.userName}>{item.time}</Text>
                    <Text  style={styles.description}>userName {item.username}</Text>
                    <Text  style={styles.description}>password {item.password}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#DCDCDC",
  },
  eventList:{
    marginTop:20,
  },
  eventBox: {
    padding:10,
    marginTop:5,
    marginBottom:5,
    flexDirection: 'row',
  },
  eventDate:{
    flexDirection: 'column',
  },
  eventDay:{
    fontSize:50,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventMonth:{
    fontSize:16,
    color: "#0099FF",
    fontWeight: "600",
  },
  eventContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft:10,
    backgroundColor: '#FFFFFF',
    padding:10,
    borderRadius:10
  },
  description:{
    fontSize:15,
    color: "#646464",
  },
  eventTime:{
    fontSize:18,
    color:"#151515",
  },
  userName:{
    fontSize:16,
    color:"#151515",
  },
});
 