import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  TouchableOpacity,
  View,
  Image,
  Text,FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

export default class MatchResult extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
   game_ID:''
    };
  }
  componentDidMount(){
    AsyncStorage.getItem("game_ID").then((value) => {
        this.setState({game_ID:value }
       
          );   this.AddMoney()
      });
  }

  AddMoney = ()=>{
    this.setState({isLoading:true})
    var dataToSend = { gameID:this.state.game_ID
                        };
    
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //POST request 
    fetch('http://www.radicaltechsupport.com/pubg/activity.php?method=myresult', {
      method: "POST",//Request Type 
      body: formBody,//post body 
      headers: {//Header Defination 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      console.log(responseJson)
       this.setState({
         isLoading:false,
         dataSource:responseJson.response
       })
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  }


  render() {
    return (
        <View>
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
        
    <View style={styles.box1}>
 
 <View style={styles.row}>
 <Text style={{flex:1,fontSize:15,fontWeight:'bold'}}>WINNERS</Text> 
  <Text style={{flex:1,fontSize:15,fontWeight:'bold'}}>KILLS</Text>
   <Text style={{flex:1,fontSize:15,fontWeight:'bold'}}>PRICE</Text>
   </View>
        <FlatList style={styles.list}
        //contentContainerStyle={styles.listContainer}
        data={this.state.dataSource}
        horizontal={false}
        //numColumns={2}
        keyExtractor= {(item) => {
          return item.gameID.toString();
        }}
        renderItem={({item}) => {
          return (
              
            <TouchableOpacity>

              
            
                
                  
                  <View style={styles.row}>
                  <Text  style={{flex:1}}>{item.user}</Text>
                  
                   
                     
                      <Text style={{flex:1}}>{item.kills}</Text>
                    
                    
                
                    
                      <Text style={{flex:1}}>{item.prize}</Text>
                   
                  </View>
            
          
            </TouchableOpacity>
          )
        }}/>
        </View>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    paddingTop:50,
  },
  icon:{
    width:30,
    height:30,
  },
  image: {
    width: 100,
    height:100
  },
  box: {
    marginTop:10,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  box1: {
    marginTop:10,
    backgroundColor: 'white',
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  info: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize:20,
    marginTop:10,
    color: '#333'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop:10
  },
  iconContainer: {
    flex: 1,
    alignItems:'center'
  },
  iconFonts: {
    color: 'gray',
    flex:1
  },
  red: {
    color: '#FF4500',
  }
});
 