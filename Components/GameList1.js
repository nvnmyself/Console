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
  Button,
  ImageBackground,
  Platform,
  Modal,
  TouchableHighlight,

} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";



export default class Games extends Component {

 

  
  constructor(props) {
    OneSignal.init("4d1b3e8f-4351-4911-a0ea-1e7e3509755e");
    OneSignal.inFocusDisplaying(2);
    OneSignal.enableSound(true);
    super(props);
    this.state = {
      date:(new Date().getDate()<'10'?'0'+new Date().getDate():new Date.getDate())+ '/' + (new Date().getMonth()+1<'10'?'0'+(new Date().getMonth()+1):new Date().getMonth()+8) + '/' + new Date().getFullYear() ,
      userID:'',
      gameID:'',
      isLoading:true,
      ModalVisibleStatus:false,
      Alert_Visibility: false ,
      connection_Status : "",
      balance:'',
 
    };
    OneSignal.addEventListener('ids', this.updatePushId.bind(this));
    OneSignal.configure()
  }

  
ShowModalFunction(visible,gameID) 
{

  this.setState({

    ModalVisibleStatus: visible,
    gameID:gameID

   });
    
}

  componentDidMount() {

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      // Call any action
      AsyncStorage.getItem("userID").then((value) => {
        this.setState({userID:value, }
       
          );this.AddMoney()
      });
    
    });
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange

  );
 
  NetInfo.isConnected.fetch().done((isConnected) => {

    if(isConnected == true)
    {
      this.setState({connection_Status : "Online"})
    }
    else
    {
      this.setState({connection_Status : "Offline"})
    }

  });
  }

  componentWillUnmount(){
 
    this.focusListener.remove();
    OneSignal.removeEventListener('ids',this.updatePushId.bind(this));

    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange

  );
  }

  _handleConnectivityChange = (isConnected) => {
 
    if(isConnected == true)
      {
        this.setState({connection_Status : "Online"},this.AddMoney())
      }
      else
      {
        this.setState({connection_Status : "Offline"})
      }
  };


  Show_Custom_Alert(visible) {
 
    this.setState({Alert_Visibility: visible});
    
  }

  async updatePushId(device) {
   AsyncStorage.setItem("device",device.userId)
    console.log(device.userId)
}

  ok_Button=()=>{

       AsyncStorage.removeItem("userID")
          this.setState({userID:null,isLoading:true})
          this.Show_Custom_Alert(!this.state.Alert_Visibility)
          Alert.alert("Logged Out Successfully")
          this.AddMoney()

  }

  
  check=()=>{
   // alert(this.state.userID)
  if(this.state.userID==null || this.state.userID==''){
   // alert("You need to Login first");
    this.props.navigation.navigate("Login")
  }
  else{
    //alert("YR")
   this.apply()
  }
  
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
   check3=()=>{
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


apply=()=>{
  this.setState({
    isLoading:true,
  })
  var dataToSend = { userID:this.state.userID,gameID:this.state.gameID};
    
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //POST request 
    fetch('http://www.radicaltechsupport.com/pubg/activity.php?method=joingame', {
      method: "POST",//Request Type 
      body: formBody,//post body 
      headers: {//Header Defination 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      console.log("apply",responseJson)
       this.setState({
         isLoading:false,
       //  dataSource:responseJson.response
       },function(){
         if(responseJson.response.status==1){
           Alert.alert("Game Joined Successfully")
           this.AddMoney()
         }else{
          Alert.alert(responseJson.response.message)
         }
       })
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
}

  AddMoney = ()=>{
    this.setState({isLoading:true})
   // alert(this.state.date)
    var dataToSend = {date:this.state.date,userID:this.state.userID};
    
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
         dataSource:responseJson.response,
         balance:responseJson.balance
       },
     //  AsyncStorage.setItem("balance",responseJson.balance)
       )
       AsyncStorage.setItem("balance",this.state.balance.toString())
    })
    //If response is not in json then in error
    .catch((error) => {
      //alert(JSON.stringify(error));
      this.setState({
        isLoading:false,
      })
     // console.error(error);
    });
  }


  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View>
      <View style={[styles.card,{borderWidth:1,borderRadius:5,borderColor:'#fff'}]}>
               
      <Image style={{width:'100%',height:200}}  source={{uri:'http://www.radicaltechsupport.com/pubg/images/1.jpg'}}/>
      <View style={styles.cardHeader}>
     
        <Text style={{marginTop:10,fontWeight:'bold',fontSize:20,color:'black'}}>Pubg Night #2335</Text>
        <Text style={{marginTop:10,fontWeight:'bold',fontSize:10}}>{this.state.date} </Text>

      </View>
      <View style={[styles.cardHeader,{marginTop:-20}]}>   
        <Text style={{fontWeight:'bold',fontSize:10}}>WIN PRIZE</Text>
        <Text style={{fontWeight:'bold',fontSize:10}}>PER KILL</Text>
        <Text style={{fontWeight:'bold',fontSize:10}}>ENTRY FEE</Text>   
      </View>

      <View style={[styles.cardHeader,{marginTop:-30}]}>   
        <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}><Ionicons name="rupee"/>400</Text>
        <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}><Ionicons name="rupee"/>20</Text>
        <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}><Ionicons name="rupee"/>40 </Text>   
      </View>

      <View style={[styles.cardHeader,{marginTop:-25}]}>   
        <Text style={{fontWeight:'bold',fontSize:10}}>TYPE</Text>
        <Text style={{fontWeight:'bold',fontSize:10}}>VERSION</Text>
        <Text style={{fontWeight:'bold',fontSize:10}}>MAP</Text>   
      </View>

      <View style={[styles.cardHeader,{marginTop:-30}]}>   
        <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>Solo</Text>
        <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>TPP</Text>
        <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>Erangle</Text>   
      </View>
    
     <View style={[styles.cardHeader,{marginTop:-20}]}>
     <ProgressBarAndroid
   
styleAttr="Horizontal"
indeterminate={false}
progress={1}
style={{width:'70%'}}
color="#2196F3"
/> 
<Text>0 spots left</Text>
     </View>
     
     <View style={[styles.cardFooter,{marginTop:-30}]}>
        <View style={{alignItems:"center", justifyContent:"center"}}>
          {/* <Text style={styles.name}>{item.name}</Text> */}
          {/*  */}
       
          <TouchableOpacity disabled style={styles.followButton}    >
            <Text style={styles.followButtonText}>Join </Text>  
          </TouchableOpacity>
        </View>
      </View> 


    </View>

    <View style={[styles.card,{borderWidth:1,borderRadius:5,borderColor:'#fff'}]}>
               
      <Image style={{width:'100%',height:200}}  source={{uri:'http://www.radicaltechsupport.com/pubg/images/1.jpg'}}/>
      <View style={styles.cardHeader}>
     
        <Text style={{marginTop:10,fontWeight:'bold',fontSize:20,color:'black'}}>Pubg Night #2335</Text>
        <Text style={{marginTop:10,fontWeight:'bold',fontSize:10}}>{this.state.date} </Text>

      </View>
      <View style={[styles.cardHeader,{marginTop:-20}]}>   
        <Text style={{fontWeight:'bold',fontSize:10}}>WIN PRIZE</Text>
        <Text style={{fontWeight:'bold',fontSize:10}}>PER KILL</Text>
        <Text style={{fontWeight:'bold',fontSize:10}}>ENTRY FEE</Text>   
      </View>

      <View style={[styles.cardHeader,{marginTop:-30}]}>   
        <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}><Ionicons name="rupee"/>400</Text>
        <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}><Ionicons name="rupee"/>20</Text>
        <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}><Ionicons name="rupee"/>40 </Text>   
      </View>

      <View style={[styles.cardHeader,{marginTop:-25}]}>   
        <Text style={{fontWeight:'bold',fontSize:10}}>TYPE</Text>
        <Text style={{fontWeight:'bold',fontSize:10}}>VERSION</Text>
        <Text style={{fontWeight:'bold',fontSize:10}}>MAP</Text>   
      </View>

      <View style={[styles.cardHeader,{marginTop:-30}]}>   
        <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>Solo</Text>
        <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>TPP</Text>
        <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>Erangle</Text>   
      </View>
    
     <View style={[styles.cardHeader,{marginTop:-20}]}>
     <ProgressBarAndroid
   
styleAttr="Horizontal"
indeterminate={false}
progress={1}
style={{width:'70%'}}
color="#2196F3"
/> 
<Text>0 spots left</Text>
     </View>
     
     <View style={[styles.cardFooter,{marginTop:-30}]}>
        <View style={{alignItems:"center", justifyContent:"center"}}>
          {/* <Text style={styles.name}>{item.name}</Text> */}
          {/*  */}
       
          <TouchableOpacity disabled style={styles.followButton}    >
            <Text style={styles.followButtonText}>Join </Text>  
          </TouchableOpacity>
        </View>
      </View> 


    </View>
  



    </View>

  
  

    );
  };


  clickEventListener(item) {
     //POST json 
    // alert(item.gameID)
 // alert(this.state.date)
 this.setState({
   //gameID:item.gameID,
   ModalVisibleStatus:false
 },this.check())
 


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
     animated={true}
     animationType="fade"
      visible={this.state.isLoading?true:false}
     >
     <BallIndicator style={{flex:1,backgroundColor:'white'}} size={100}  color='#00BFFF' />
     </Modal>:null}
  {this.state.connection_Status==="Offline"?   <View style={{width:'50%',height:40,backgroundColor:'green',alignSelf:'center'}}>
      <Text style={{alignSelf:"center",padding:10}}>You are {this.state.connection_Status}</Text>
      </View>:null}
        <FlatList style={styles.list}
          //contentContainerStyle={styles.listContainer}
          data={this.state.dataSource}
          horizontal={false}
          ListEmptyComponent={this.ListEmpty}
          //numColumns={2}
          keyExtractor= {(item) => {
            return item.gameID.toString();
          }}
          renderItem={({item}) => {
            return (
              <View style={[styles.card,{borderWidth:1,borderRadius:5,borderColor:'#fff'}]}>
               
                <Image style={{width:'100%',height:200}} source={{uri:item.images}}/>
                <View style={styles.cardHeader}>
               
                  <Text style={{marginTop:10,fontWeight:'bold',fontSize:20,color:'black'}}>{item.title}</Text>
                  <Text style={{marginTop:10,fontWeight:'bold',fontSize:10}}>{item.time} {item.gamedate}</Text>
    
                </View>
                <View style={[styles.cardHeader,{marginTop:-20}]}>   
                  <Text style={{fontWeight:'bold',fontSize:10}}>WIN PRIZE</Text>
                  <Text style={{fontWeight:'bold',fontSize:10}}>PER KILL</Text>
                  <Text style={{fontWeight:'bold',fontSize:10}}>ENTRY FEE</Text>   
                </View>

                <View style={[styles.cardHeader,{marginTop:-30}]}>   
                  <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}><Ionicons name="rupee"/>{item.win}</Text>
                  <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}><Ionicons name="rupee"/>{item.kill}</Text>
                  <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}><Ionicons name="rupee"/>{item.entryFees} </Text>   
                </View>

                <View style={[styles.cardHeader,{marginTop:-25}]}>   
                  <Text style={{fontWeight:'bold',fontSize:10}}>TYPE</Text>
                  <Text style={{fontWeight:'bold',fontSize:10}}>VERSION</Text>
                  <Text style={{fontWeight:'bold',fontSize:10}}>MAP</Text>   
                </View>

                <View style={[styles.cardHeader,{marginTop:-30}]}>   
                  <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>{item.type}</Text>
                  <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>{item.version}</Text>
                  <Text style={{fontWeight:'bold',fontSize:15,color:'black'}}>{item.map}</Text>   
                </View>
              
               <View style={[styles.cardHeader,{marginTop:-20}]}>
               <ProgressBarAndroid
             
          styleAttr="Horizontal"
          indeterminate={false}
          progress={(item.slots)/10}
          style={{width:'70%'}}
          color="#2196F3"
        /> 
        <Text>{item.spot-item.slots}/{item.spot} spot left</Text>
               </View>
                <View style={[styles.cardFooter,{marginTop:-30}]}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    {/* <Text style={styles.name}>{item.name}</Text> */}
                    {/*  */}
                 
                    <TouchableOpacity style={styles.followButton}    onPress={this.ShowModalFunction.bind(this, true,item.gameID)} >
                      <Text style={styles.followButtonText}>Join </Text>  
                    </TouchableOpacity>
                  </View>
                </View> 

        
              </View>
            )
          }}/>
          {
  this.state.ModalVisibleStatus 
  
  ?

   (
     <Modal
   transparent={false}

   animationType={"slide"}

   visible={this.state.ModalVisibleStatus}

   onRequestClose={ () => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >

    

         {/* <Image style={styles.mainImage} source = {{ uri: this.state.TempImageURL }} /> */}

         <ImageBackground style={{flex:1,width:'100%'}} blurRadius={9} source={require('../assets/background.png')} >
           
           <ScrollView style={styles.scrollContainer}>
           
           
        <View style={styles.containers}>
        <TouchableOpacity 
             activeOpacity = { 0.5 }
             style={styles.TouchableOpacity_Style}
             onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >

               <Image source={{uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/close_button.png'}}
               style={{width:25, height: 25}} />

           </TouchableOpacity>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
          <Text style={styles.companyName}>Console</Text>
          <Text style={styles.slogan}>Gaming Rules!</Text>
          <View style={styles.descriptionContent}>
            <Text style={styles.description}>
            # Room id and password will be shared into notification panel before 15 minutes of match starting time. 
            </Text>

         

            <Text style={styles.description}>
            # Don't keep changing your positions and do not turn off your devices untill match starts. Doing so will get you logged out from game room. 
            </Text>
            <Text style={styles.description}>
            # Make sure to enter notification  panel before 15 minutes to grab the room login details. 
</Text>
            <Text style={styles.description}>
            # Its particepents responsibility to join the room on time, In case anyone fails to join the room by the match start time then he is not liable for any refund.</Text>
            <Text style={styles.description}>
            # Matches are paid and any member wants to enter a game needs to pay entry fee first.
  </Text>
            <Text style={styles.description}>
            # Members can add advance money to wallet for hassle free gaming. 
 </Text>
 <Text style={styles.description}>
 # Match spots distribution is based on first come first serve basis.
 </Text>
 <Text style={styles.description}>
 # Each member of team (squad or duo) has to pay the entry fee and register individually
 </Text>
 <Text style={styles.description}>
 # Room details are very confidential and secret do not share it with anyone. 
 </Text>
 <Text style={styles.description}>
 # Leaking room details will be considered as an offence of rules and doing so might block your account permanently and all the winnings will be lost.
 </Text>
 <Text style={styles.description}>
 # Last man standing will get the winning prize, In duo or squad prize will be divided equally in last survivers only.
 </Text>
          
 <Text style={styles.description}>
 # One can earn rewards according to his/her kills also, per kill rewards are mentioned in the match description.

 </Text>
 <Text style={styles.description}>
 # Using hacks, abusing bugs & teaming is against the game rules. Anyone caught doing so will be disqualified and all his winnings will be lost.
 </Text>
             
          
            <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={()=> this.clickEventListener(this.state.gameID)}>
            <Text style={styles.buttonText}>Join Game</Text>
          </TouchableHighlight>
          </View>
         
        </View>
      </ScrollView>
           
           </ImageBackground>  
     

   </Modal>
   ) 

   :

   null

}

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
   // marginTop:20,
  },
  list: {
    paddingHorizontal: 5,
    //backgroundColor:"#E6E6E6",
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
    borderRadius:1
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
    borderRadius:30,
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
     
  modalView:{
   
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  //  backgroundColor: 'rgba(0,0,0,0.4)'
 
   },
   TouchableOpacity_Style:{
   
    width:25, 
    height: 25, 
    top:9, 
    right:9, 
    position: 'absolute'
 
},  scrollContainer:{
  flex: 1,
},
containers: {
  flex: 1,
  alignItems: 'center',
 // backgroundColor: '#EE82EE',
},
logo:{
  width:120,
  height:120,
  justifyContent: 'center',
  marginBottom:10,
  marginTop:30,
},
companyName: {
  fontSize:32,
  fontWeight: '600',
  color: '#FFFFFF',
},
slogan:{
  fontSize:18,
  fontWeight: '600',
  color: '#228B22',
  marginTop:10,
},
descriptionContent:{
  padding:30,
  backgroundColor:'#ffff'
  
},
description:{
  fontSize:12,
 // textAlign:'center',
  marginTop:10,
  
  color: 'black',
},
buttonContainer: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:100,
  borderRadius:30,
  alignSelf:'center'
},
sendButton: {
  backgroundColor: "cyan",
},
buttonText: {
  color: '#EE82EE',
},
 
MainContainer :{
    
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: (Platform.OS == 'ios') ? 20 : 0
  
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