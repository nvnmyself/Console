import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  ProgressBarAndroid,
  Modal,ImageBackground,Linking
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {
  BallIndicator,
 } from 'react-native-indicators';
export default class Results extends Component {
  
  constructor(props) {
    super(props);
   this.state={
     isLoading:true,
     Alert_Visibility: false ,
     userID:'',
     balance:''
   }
  }

  componentDidMount() {

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      // Call any action
      AsyncStorage.getItem("balance").then((value) => {
        this.setState({balance:value });
      });

      AsyncStorage.getItem("userID").then((value) => {
        this.setState({userID:value }
       
          );this.AddMoney()
      });
    
    });
 
  }


  componentWillUnmount(){
 
    this.focusListener.remove();
  }


  Show_Custom_Alert(visible) {
 
    this.setState({Alert_Visibility: visible});
    
  }
  ok_Button=()=>{

    AsyncStorage.removeItem("userID")
       this.setState({userID:null,isLoading:true})
       this.Show_Custom_Alert(!this.state.Alert_Visibility)
       Alert.alert("Logged Out Successfully")
       this.AddMoney()

}


  clickEventListener(item) {
    Alert.alert(item.name)
  }

  check1=()=>{
    // alert(this.state.userID)
   if(this.state.userID==null || this.state.userID==''){
    // alert("You need to Login first");
     this.props.navigation.navigate("Login")
   }
   else{
     //alert("YR")
    this.props.navigation.navigate("Wallet")
   }
   
   }

   check2=()=>{
    // alert(this.state.userID)
   if(this.state.userID==null || this.state.userID==''){
    // alert("You need to Login first");
     this.props.navigation.navigate("Login")
   }
   else{
     //alert("YR")
    this.props.navigation.navigate("Notification")
   }
   
   }


  AddMoney = ()=>{
    this.setState({isLoading:true})
    var dataToSend = { date:'10/04/2019',
                        played:1  };
    
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //POST request 
    fetch('http://www.radicaltechsupport.com/pubg/activity.php?method=allgames', {
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
      this.setState({
        isLoading:false
      })
     // alert(JSON.stringify(error));
     // console.error(error);
    });
  }

  openURL(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }


  render() {
    return (
      <View style={styles.container}>
                <View style={{paddingTop: 15, paddingBottom: 15,backgroundColor:'black'}}>
          
          <View style={{flexDirection: 'row', alignItems:'center', borderColor:'red',}}>
           <View style={{flex:1}}>
           <Image style={{ width:60,height:60,marginLeft:10,borderRadius:30}}  source={require('../assets/logo.png')} />
           </View>
    
            
        
    {this.state.userID===null || this.state.userID==''?<TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
              <Ionicons style={{fontSize:28,margin:10,color:'#00BFFF'}} name="user-circle"/>
          </TouchableOpacity>:
       <View style={{flexDirection:'row'}}>
       <TouchableOpacity
          onPress={this.check1}
          >
         
          <View style={{flexDirection:'row',backgroundColor:'#00BFFF',borderRadius:10}}>
          <Ionicons style={{fontSize:15,marginTop:8,color:'white',padding:5,paddingLeft:10}} name="rupee"/>
           <Text style={{ margin:10,marginLeft:-3, textAlign: 'left',color:'white'}}>{this.state.balance}</Text>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity 
          onPress={this.check2}
          >
          <Ionicons style={{fontSize:26,margin:6,color:'#00BFFF'}} name="bell">
         <Text style={{color:'red',fontSize:10,borderRadius:30,borderWidth:1}}></Text>
          </Ionicons>
         
          </TouchableOpacity>
          </View>
  }
  
  
           
          </View>
         
        </View>
        {this.state.isLoading? 
     <Modal
     transparent={true}
      visible={this.state.isLoading?true:false}
     >
     <BallIndicator style={{flex:1,backgroundColor:'transparent'}} size={100}  color='#00BFFF' />
     </Modal>:null}
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
              <TouchableOpacity style={[styles.card,{borderWidth:1}]} >
               
             
                <View style={styles.cardHeader}>
                <Image style={styles.icon} source={{uri:item.images}}/>
                  <Text style={{marginTop:10,fontWeight:'bold',fontSize:10}}>{item.title} #2335 </Text>
                  <Text style={{marginTop:10,fontWeight:'bold',fontSize:10}}>{item.gamedate}</Text>
    
                </View>
                

                <View style={[styles.cardHeader,{marginTop:-20}]}>   
                  <Text style={{fontWeight:'bold',fontSize:10}}>WIN PRIZE</Text>
                  <Text style={{fontWeight:'bold',fontSize:10}}>PER KILL</Text>
                  <Text style={{fontWeight:'bold',fontSize:10}}>ENTRY FEE</Text>   
                </View>

                <View style={[styles.cardHeader,{marginTop:-30}]}>   
                  <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>{item.win}</Text>
                  <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>{item.kill}</Text>
                  <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>{item.entryFees}</Text>   
                </View>
               
                <View style={[styles.cardHeader,{marginTop:-25}]}>   
                  <Text style={{fontWeight:'bold',fontSize:10}}>TYPE</Text>
                  <Text style={{fontWeight:'bold',fontSize:10}}>VERSION</Text>
                  <Text style={{fontWeight:'bold',fontSize:10}}>MAP</Text>   
                </View>

                <View style={[styles.cardHeader,{marginTop:-30}]}>   
                  <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>DUO</Text>
                  <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>TPP</Text>
                  <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>ERANGLE</Text>   
                </View>
              
                <View style={[styles.cardFooter,{marginTop:-30}]}>
                  <View style={{alignItems:"center", justifyContent:"center",flexDirection:'row'}}>
               
                    <TouchableOpacity style={[styles.followButton,{width:150,margin:2}]} onPress={() => {
                AsyncStorage.setItem("game_ID",item.gameID)
                this.props.navigation.navigate("MatchResult")
              }}>
                      <Text style={styles.followButtonText}>Watch Winners</Text>  
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.followButton,{width:150,margin:2}]} onPress={
              () => this.openURL('https://www.youtube.com/')
            }
             
              >
                      <Text style={styles.followButtonText}>View Match</Text>  
                    </TouchableOpacity>
                    
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}/>
          <Modal
 
 visible={this.state.Alert_Visibility}

 transparent={true}

 animationType={"fade"}

 onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >


   <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>


       <View style={styles.Alert_Main_View}>
       <ImageBackground style={{flex:1,width:'100%'}} blurRadius={9} source={require('../assets/background.png')} >


           <Image style={[styles.Alert_Title,{width:60,height:60,alignSelf:'center',borderRadius:17}]} source={require("../assets/logo.png")} />


         


           <Text style={styles.Alert_Message}> Are You Sure want to logout. </Text>


           <View style={{ width: '100%', height: 1, backgroundColor: 'transparent'}} />


           <View style={{flexDirection: 'row', height: '30%'}}>

               <TouchableOpacity 
                   style={styles.buttonStyle}
                   onPress={this.ok_Button} 
                   activeOpacity={0.7} 
                    >

                   <Text style={styles.TextStyle}> OK </Text>
       
               </TouchableOpacity>

               <View style={{ width: 1, height: '100%', backgroundColor: 'transparent'}} />

               <TouchableOpacity 
                   style={styles.buttonStyle} 
                   onPress={() => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } 
                   activeOpacity={0.7} 
                   >

                   <Text style={styles.TextStyle}> NO </Text>
       
               </TouchableOpacity>

           </View>
         
</ImageBackground>
       </View>

   </View>

</Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    //marginTop:20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
   alignItems:'center'
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor:"white",
    flexBasis: '46%',
    marginHorizontal: 5,
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage:{
    height: 120,
    width: 120,
    borderRadius:60,
    alignSelf:'center',
    borderColor:"#DCDCDC",
    borderWidth:3,
  },
  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#008080",
    fontWeight:'bold'
  },
  position:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  icon:{
    height: 60,
    width: 60, 
  },
  Alert_Main_View:{
  
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : "#009688", 
    height: 200 ,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius:7,
   
  },
   
  Alert_Title:{
   
  //  fontSize: 25, 
 //   color: "#fff",
  //  textAlign: 'center',
    padding: 10,
    height: '28%'
   
  },
  
  Alert_Message:{
   
      fontSize: 22, 
      color: "#fff",
      textAlign: 'center',
      padding: 10,
      height: '42%'
     
    },
  
  buttonStyle: {
      
      width: '50%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
  
  },
     
  TextStyle:{
      color:'#fff',
      textAlign:'center',
      fontSize: 22,
      marginTop: -5
  }
});     