import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image,StyleSheet,
Modal,TextInput,ImageBackground,FlatList,Alert} from 'react-native'
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import RNUpiPayment from 'react-native-upi-payment';
import AsyncStorage from '@react-native-community/async-storage';
import {
  BallIndicator,
 } from 'react-native-indicators';
export default class Wallet extends Component {
constructor(props){
    super(props)
   
    this.state={
        ModalVisibleStatus: false,
        ModalVisibleStatus1: false,
        amount:'',
        mobile:'',
        amounts:'',
        Status:"", txnId:"",
       
        userID:'',
        isLoading:true
       
    }
    // AsyncStorage.getItem("userID").then((value) => {
    //   this.setState({userID:value }
     
    //     );this.loadWallet()
    // });
   
}

componentDidMount() {

  const { navigation } = this.props;
  this.focusListener = navigation.addListener("didFocus", () => {
    // The screen is focused
    // Call any action
    AsyncStorage.getItem("userID").then((value) => {
      this.setState({userID:value,isLoading1:true }
     
        );this.loadWallet()
    });
  
  });

}

componentWillUnmount(){

  this.focusListener.remove();
 // this.props.navigation.popToTop()
}

ShowModalFunction(visible) 
{

  this.setState({

    ModalVisibleStatus: visible,

   });
    
}

ShowModalFunction1(visible) 
{

  this.setState({

    ModalVisibleStatus1: visible,

   });
    
}

loadWallet = ()=>{
  // alert("yes")
  //POST json 
this.setState({isLoading1:true})
  var dataToSend = { userID:this.state.userID};
  //making data to send on server
  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  //POST request 
  fetch('http://www.radicaltechsupport.com/pubg/activity.php?method=passbook', {
    method: "POST",//Request Type 
    body: formBody,//post body 
    headers: {//Header Defination 
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
  })
  .then((response) => response.json())
  //If response is in json then in success
  .then((responseJson) => {
    console.log(responseJson);
     this.setState({isLoading1:false,dataSource:responseJson.response,balance:responseJson.balance})
    
  })
  //If response is not in json then in error
  .catch((error) => {
    alert(JSON.stringify(error));
    console.error(error);
  });
}



AddMoney = ()=>{
   this.setState({isLoading1:true})
    //POST json 
    var dataToSend = { amount: this.state.amounts, userID:this.state.userID};
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //POST request 
    fetch('http://www.radicaltechsupport.com/pubg/activity.php?method=addmoney', {
      method: "POST",//Request Type 
      body: formBody,//post body 
      headers: {//Header Defination 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
       // alert(JSON.stringify(responseJson));
        console.log(responseJson);
        this.setState({isLoading1:false,ModalVisibleStatus:false})
    },function(){
      if(responseJson.response.status==1){
        this.loadWallet()
      }else{
        Alert.alert("Transactiona failed") 
      }
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  }


  WithDraw = ()=>{
   
    //POST json 
    var dataToSend = { userID:this.state.userID, amount: this.state.amount,mobile:this.state.mobile};
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //POST request 
    fetch('http://www.radicaltechsupport.com/pubg/activity.php?method=withdraw', {
      method: "POST",//Request Type 
      body: formBody,//post body 
      headers: {//Header Defination 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
       this.setState({isLoading:false,ModalVisibleStatus1:false},function(){if(responseJson.response.status==1){
        this.loadWallet()
}else{
Alert.alert("Something Went Wrong")
}})
       // alert(JSON.stringify(responseJson));
        console.log(responseJson);
       // this.loadWallet()
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  }
  

render(){
  that=this;
  function floo(){
      RNUpiPayment.initializePayment({
          vpa: 'talk2rts@oksbi', // or can be john@ybl or mobileNo@upi
          payeeName: 'Payee Name',
          amount: '1',
          transactionRef: 'some-random-id'
      },successCallback,failureCallback);
  }
  function failureCallback(data){
      if(data['Status']=="SUCCESS"){
          that.setState({Status:"SUCCESS"});
          that.setState({txnId:data['txnId']});
         // successCallback
      }
      else
          that.setState({Status:"FAILURE"}, successCallback)
         
  }
  function successCallback(data){
    this.setState({isLoading1:true})
      var dataToSend = { amount: this.state.amounts, userID:this.state.userID};
      //making data to send on server
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //POST request 
      fetch('http://www.radicaltechsupport.com/pubg/activity.php?method=addmoney', {
        method: "POST",//Request Type 
        body: formBody,//post body 
        headers: {//Header Defination 
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
         // alert(JSON.stringify(responseJson));
         this.setState({isLoading1:false,ModalVisibleStatus:false})
         responseJson.response.status?this.loadWallet():Alert.alert("Transaction Failed")
          console.log(responseJson);
      }
      )
      //If response is not in json then in error
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
      
    
  
      //nothing happened here using Google Pay
  }
    return(
        <View style={styles.container}>
       
        <ImageBackground style={{flex:1,width:'100%',height:250}} blurRadius={9} source={require('../assets/background.png')} >
              <View style={[styles.header,{backgroundColor:'transparent',}]}>
                <View style={styles.headerContent}>
                <Text style={styles.name}>
                     Wallet Balance
                    </Text>
                    <Text style={styles.name}>
                    <Ionicons style={{color:'#F6F6F6',fontSize:20}} name="rupee"/> {this.state.balance}
                    </Text>
                  
                </View>
                {this.state.isLoading1? 
     <Modal
     transparent={true}
      visible={this.state.isLoading1?true:false}
     >
     <BallIndicator style={{flex:1,backgroundColor:'transparent'}} size={100}  color='#00BFFF' />
     </Modal>:null}
                <View style={{flexDirection:'row',width:'100%'}}>
                   <TouchableOpacity style={[styles.buttonContainer,{width:'45%',backgroundColor:'#991313',marginLeft:10}]}
                     onPress={this.ShowModalFunction.bind(this, true)}
                   >
                       <Text style={{color:'white'}}>Add Money</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={[styles.buttonContainer,{width:'45%',backgroundColor:'#991313',marginLeft:10}]}
                    onPress={this.ShowModalFunction1.bind(this, true)}
                   >
                       <Text style={{color:'white'}}>Withdraw Money</Text>
                   </TouchableOpacity>

                   </View>

              </View>
              
    </ImageBackground>
   
    <FlatList 
     style={[styles.eventList,{flex:1}]}
          //contentContainerStyle={styles.listContainer}
          data={this.state.dataSource}
          horizontal={false}
          //numColumns={2}
          keyExtractor= {(item) => {
            return item.transID.toString();
          }}
          renderItem={({item}) => {
            return (
              <View style={styles.containers}>
              <View style={styles.eventBox}>
           
            
                 <View style={[styles.eventContent,{borderWidth:3,borderColor:'#ffff'}]}>
                <Text  style={styles.eventTime}>{item.mop}
                 <Text style={{fontSize:10,marginLeft:30}}>    TransID:{item.transID}</Text>
                </Text>
         
               
                <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={{flex:1,marginLeft:30}}>{item.type}</Text>
                    <Text style={{flex:1,marginLeft:150}}>
                    <Ionicons name="rupee" style={{fontSize:20}}/>
                    </Text>
                    <Text style={{flex:1,}}>{item.amount}</Text>
                   
                </View>
                <Text  style={[styles.description,{alignSelf:'flex-end'}]}>{item.transDtae}</Text>
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
   transparent={true}

   animationType={"fade"}

   visible={this.state.ModalVisibleStatus}

   onRequestClose={ () => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >

     <View style={styles.modalView}>

         {/* <Image style={styles.mainImage} source = {{ uri: this.state.TempImageURL }} /> */}

          
             <View style={{height:200,width:"80%",backgroundColor: "#fff",}}>
             <TouchableOpacity 
             activeOpacity = { 0.5 }
             style={styles.TouchableOpacity_Style}
             onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >

               <Image source={{uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/close_button.png'}}
               style={{width:25, height: 25}} />

           </TouchableOpacity>
               <Text style={{margin:15,alignSelf:'center'}}>Add Money to Wallet</Text>
               <TextInput style={[styles.inputContainer,{alignSelf:'center',backgroundColor:'#ffffff',borderWidth:1}]}
               placeholder="Amount"
              // secureTextEntry={true}
              keyboardType="number-pad"
              maxLength={5}
              underlineColorAndroid='transparent'
               onChangeText={(amounts) => this.setState({amounts})}/>

      

              <TouchableOpacity onPress={()=>{floo()}} style={[styles.buttonContainer,{alignSelf:'center'}]}>
                <Text>Add Money</Text>
              </TouchableOpacity>
               </View>
           
           
             
       </View>

   </Modal>
   ) 

   :

   null

}


{
  this.state.ModalVisibleStatus1 
  
  ?

   (
     <Modal
   transparent={true}

   animationType={"fade"}

   visible={this.state.ModalVisibleStatus1}

   onRequestClose={ () => { this.ShowModalFunction1(!this.state.ModalVisibleStatus1)} } >

     <View style={styles.modalView}>

         {/* <Image style={styles.mainImage} source = {{ uri: this.state.TempImageURL }} /> */}

         
             <View style={{height:280,width:"80%",backgroundColor: "#fff",}}>
             <TouchableOpacity 
             activeOpacity = { 0.5 }
             style={styles.TouchableOpacity_Style}
             onPress={() => { this.ShowModalFunction1(!this.state.ModalVisibleStatus1)} } >

               <Image source={{uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/close_button.png'}}
               style={{width:25, height: 25}} />

           </TouchableOpacity>
               <Text style={{margin:15,alignSelf:'center'}}>Withdraw Amount To Paytm</Text>
               <TextInput style={[styles.inputContainer,{alignSelf:'center',backgroundColor:'#ffffff',borderWidth:1}]}
               placeholder="Amount"
              // secureTextEntry={true}
              keyboardType="phone-pad"
              maxLength={5}
              underlineColorAndroid='transparent'
               onChangeText={(amount) => this.setState({amount})}/>
               
                <TextInput style={[styles.inputContainer,{alignSelf:'center',backgroundColor:'#ffffff',borderWidth:1}]}
               placeholder="Paytm Mobile Numer"
              // secureTextEntry={true}
              keyboardType="phone-pad"
              maxLength={11}
              underlineColorAndroid='transparent'
               onChangeText={(mobile) => this.setState({mobile})}/>

      

              <TouchableOpacity onPress={this.WithDraw} style={[styles.buttonContainer,{alignSelf:'center'}]}>
                <Text>WithDraw Amount</Text>
              </TouchableOpacity>
               </View>
           
           
             
       </View>

   </Modal>
   ) 

   :

   null

}


            </View>
    )
}


}

const styles = StyleSheet.create({
  container:{
    flex:1
  }, 
  containers:{
    backgroundColor: "#DCDCDC",
  },
  header:{
      backgroundColor: "#00CED1",
    },
    headerContent:{
      padding:30,
      alignItems: 'center',
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    profileDetail:{
      alignSelf: 'center',
      marginTop:200,
      alignItems: 'center',
      flexDirection: 'row',
      position:'absolute',
      backgroundColor: "#ffffff"
    },
    detailContent:{
      margin:10,
      alignItems: 'center'
    },
    title:{
      fontSize:20,
      color: "#00CED1"
    },
    count:{
      fontSize:18,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
      marginTop:40
    },
    textInfo:{
      fontSize:18,
      marginTop:20,
      color: "#696969",
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:10,
      backgroundColor: "#00CED1",
    },
    description:{
      fontSize:20,
      color: "#00CED1",
      marginTop:10,
      textAlign: 'center'
    },
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
    mainImage:{
   
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width:'98%',
      resizeMode : 'contain'
   
     },
   
     modalView:{
   
      flex:1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'rgba(0,0,0,0.4)'
   
     },
   
     TouchableOpacity_Style:{
   
      width:25, 
      height: 25, 
      top:9, 
      right:9, 
      position: 'absolute'
   
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:10,
   // borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
    borderRadius:10,
    borderWidth:1
  },
  eventList:{
    marginTop:-135,
  },
  eventBox: {
    padding:10,
    marginTop:5,
    marginBottom:5,
    flexDirection: 'column',
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
   // alignItems: 'flex-start',
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
   