import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Share,
  Alert,
  
  ImageBackground

} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {
 BallIndicator,
 } from 'react-native-indicators';
export default class ProfileView extends Component {
 constructor(props){
   super(props);
   this.state={
    ModalVisibleStatus: false,
    ModalVisibleStatus1: false,
    ModalVisibleStatus2:false,
    ModalVisibleStatus3:false,
    ModalVisibleStatus4:false,
    TextInputValueHolder: '',
    userID:'',
    auth:false,
    name:'',
    username:'',
    email:'',
    mobile:'',
    matches:'',
    balance:'',
    kills:'',
    isLoading:true,
    Alert_Visibility: false ,
    uname:'',
    phone:''

   }
 }

 componentDidMount(){



  const { navigation } = this.props;
  this.focusListener = navigation.addListener("didFocus", () => {
    // The screen is focused
    // Call any action
    AsyncStorage.getItem("userID").then((value) => {
      this.setState({userID:value,isLoading:true }
     
        );   this.check()
    });
  
  });
 }

 ok_Button=()=>{

  AsyncStorage.removeItem("userID")
     this.setState({userID:null,isLoading:true,auth:true})
     this.Authentication(true)
     this.Show_Custom_Alert(!this.state.Alert_Visibility)
     Alert.alert("Logged Out Successfully")
    // this.check()

}

check=()=>{
 

if(this.state.userID==null || this.state.userID==''){

  this.Authentication(true)
}
else{
 // alert("YR")
 
 this.Profile()
}

}
componentWillUnmount(){
 
  this.focusListener.remove();
}


ShowModalFunction(visible) 
 {

   this.setState({

     ModalVisibleStatus: visible,

    });
     
 }

 
 
 Authentication=(visible)=> 
 {

   this.setState({

     auth: visible,

    });
     
 }

 ShowModalFunction1(visible) 
 {

   this.setState({

     ModalVisibleStatus1: visible,

    });
     
 }

 ShowModalFunction2(visible) 
 {

   this.setState({

     ModalVisibleStatus2: visible,

    });
     
 }

 ShowModalFunction3(visible) 
 {

   this.setState({

     ModalVisibleStatus3: visible,

    });
     
 }

 ShowModalFunction4(visible) 
 {

   this.setState({

     ModalVisibleStatus4: visible,

    });
     
 }

 Show_Custom_Alert(visible) {
 
  this.setState({Alert_Visibility: visible});
  
}

 ShareMessage=()=>
 {
         Share.share(
         {
             
           message: this.state.TextInputValueHolder.toString()
         
         }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
 }


 Profile = ()=>{
   
  //POST json 
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
  fetch('http://www.radicaltechsupport.com/pubg/activity.php?method=viewprofile', {
    method: "POST",//Request Type 
    body: formBody,//post body 
    headers: {//Header Defination 
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
  })
  .then((response) => response.json())
  //If response is in json then in success
  .then((responseJson) => {
    this.setState({
      isLoading:false,
      dataSource:responseJson.response,
      name:responseJson.response.name,
      username:responseJson.response.username,
      email:responseJson.response.email,
      mobile:responseJson.response.mobile,
      balance:responseJson.response.balance,
      matches:responseJson.response.matches,
      kills:responseJson.response.kills,
    })
     
  })
  //If response is not in json then in error
  .catch((error) => {
    alert(JSON.stringify(error));
    console.error(error);
  });
}


AddMoney = ()=>{
   
  //POST json 
  var dataToSend = { };
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
      alert(JSON.stringify(responseJson));
      console.log(responseJson);
  })
  //If response is not in json then in error
  .catch((error) => {
    alert(JSON.stringify(error));
    console.error(error);
  });
}


WithDraw = ()=>{
   
  //POST json 
  var dataToSend = {};
  //making data to send on server
  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  //POST request 
  fetch('http://www.radicaltechsupport.com/pubg/activity.php?method=login', {
    method: "POST",//Request Type 
    body: formBody,//post body 
    headers: {//Header Defination 
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
  })
  .then((response) => response.json())
  //If response is in json then in success
  .then((responseJson) => {
      alert(JSON.stringify(responseJson));
      console.log(responseJson);
  })
  //If response is not in json then in error
  .catch((error) => {
    alert(JSON.stringify(error));
    console.error(error);
  });
}

UpdateProfile = ()=>{
   
  //POST json 
  var dataToSend = {name:this.state.uname,phone:this.state.phone,userID:this.state.userID };
  //making data to send on server
  var formBody = [];
  for (var key in dataToSend) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  //POST request 
  fetch('http://www.radicaltechsupport.com/pubg/activity.php?method=updateprofile', {
    method: "POST",//Request Type 
    body: formBody,//post body 
    headers: {//Header Defination 
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
  })
  .then((response) => response.json())
  //If response is in json then in success
  .then((responseJson) => {
    this.setState({
      isLoading:false,
      ModalVisibleStatus3:false
    },function(){
      if(responseJson.response.status==1){
        Alert.alert("Profile Updated Successfully")
        this.Profile()
      }else{
        Alert.alert("Something Went wrong")
      }
    })
      //alert(JSON.stringify(responseJson));
      console.log(responseJson);
  })
  //If response is not in json then in error
  .catch((error) => {
    this.setState({
      isLoading:false,
    })
    //alert(JSON.stringify(error));
    //console.error(error);
  });
}

  render() {
    return (
      
      <View style={styles.container}>
        <ScrollView>   
        <ImageBackground style={{flex:1,width:'100%',height:'100%'}} blurRadius={9} source={require('../assets/background.png')}>
          <View style={[styles.header,{backgroundColor:'dark',height:300}]}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={require('../assets/logo.png')}/>
                <Text style={styles.name}>
                 {this.state.username}
                </Text>
                
            </View>
          </View>
          {this.state.isLoading? 
     <Modal
     transparent={true}
      visible={this.state.isLoading?true:false}
     >
     <BallIndicator style={{flex:1,backgroundColor:'transparent'}} size={100}  color='#00BFFF' />
     </Modal>:null}

          <View style={[styles.profileDetail,{backgroundColor:'transparent',}]}>
            <View style={[styles.detailContent]}>
              <Text style={[styles.title,{color:'#ffff'}]}>{this.state.matches  }</Text>
              <Text style={[styles.count,{color:'red'}]}>Match Played</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={[styles.title,{color:'#ffff'}]}>{this.state.kills}</Text>
              <Text style={[styles.count,{color:'red'}]}>Total Kill</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={[styles.title,{color:'#ffff'}]}>{this.state.balance}</Text>
              <Text style={[styles.count,{color:'red'}]}>Wallet Amount</Text>
            </View>
          
          </View>
          </ImageBackground>
          <View style={[styles.body,{backgroundColor:'white'}]}>
            <View style={styles.bodyContent}>
         
             <Text >{this.state.name}</Text>
             <Text >{this.state.mobile}</Text>

             <Text >{this.state.email}</Text>

              <TouchableOpacity style={[styles.buttonContainer]}
              onPress={ this.ShareMessage }
              >
                <Text style={{color:'white'}}>Share And Earn</Text>  
              </TouchableOpacity> 

              <TouchableOpacity style={[styles.buttonContainer]}>
                <Text style={{color:'white'}}>Terms Conditions</Text>  
              </TouchableOpacity> 
              
              <TouchableOpacity style={[styles.buttonContainer]}
              onPress={()=>this.setState({ModalVisibleStatus3:true})}
              >
                <Text style={{color:'white'}}>Edit Profile</Text>  
              </TouchableOpacity> 
              
              <TouchableOpacity style={[styles.buttonContainer]} 
              onPress={()=> this.Show_Custom_Alert(true) }
              >
                <Text style={{color:'white'}}>Logout</Text>  
              </TouchableOpacity> 
            </View>

               
        </View>
        {
             this.state.ModalVisibleStatus 
             
             ?
 
              (
                <Modal
              transparent={false}
 
              animationType={"fade"}
 
              visible={this.state.ModalVisibleStatus}
 
              onRequestClose={ () => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >
    <View style={styles.container}>
    <ScrollView>
          <View style={styles.header}>
          <TouchableOpacity 
                        activeOpacity = { 0.5 }
                        style={styles.TouchableOpacity_Style}
                        onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >
  
                          <Image source={{uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/close_button.png'}}
                          style={{width:25, height: 25}} />
  
                      </TouchableOpacity>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar2.png'}}/>
                <Text style={styles.name}>
                  John Doe
                </Text>
            </View>
          </View>

          <View style={styles.profileDetail}>
         
            <View style={styles.detailContent}>
              <Text style={styles.title}>200</Text>
              <Text style={styles.count}>Wallet Amount</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <TouchableOpacity style={[styles.buttonContainer,{height:100}]}
              onPress={this.ShowModalFunction2.bind(this, true)}
              >
                <Text>ADD Money To wallet</Text>  
              </TouchableOpacity> 
               

              <TouchableOpacity style={[styles.buttonContainer,{height:100}]}
              onPress={this.ShowModalFunction1.bind(this, true)}
              >
                <Text>WithDraw Money</Text>  
              </TouchableOpacity> 

              <TouchableOpacity style={[styles.buttonContainer,{height:100}]}
              onPress={ this.ShareMessage }
              >
                <Text>Transaction</Text>  
              </TouchableOpacity> 

             
            </View>
            
               
        </View>
        </ScrollView>
        </View>

        
{
  this.state.ModalVisibleStatus2 
  
  ?

   (
     <Modal
   transparent={false}

   animationType={"slide"}

   visible={this.state.ModalVisibleStatus2}

   onRequestClose={ () => { this.ShowModalFunction2(!this.state.ModalVisibleStatus2)} } >

     <View style={styles.modalView}>

         {/* <Image style={styles.mainImage} source = {{ uri: this.state.TempImageURL }} /> */}

           <TouchableOpacity 
             activeOpacity = { 0.5 }
             style={styles.TouchableOpacity_Style}
             onPress={() => { this.ShowModalFunction2(!this.state.ModalVisibleStatus2)} } >

               <Image source={{uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/close_button.png'}}
               style={{width:25, height: 25}} />

           </TouchableOpacity>
             <View style={{height:200,width:"80%",backgroundColor: "#fff",}}>
               <Text style={{margin:15,alignSelf:'center'}}>Add Money to Wallet</Text>
               <TextInput style={[styles.inputContainer,{alignSelf:'center',backgroundColor:'grey'}]}
               placeholder="Amount"
              // secureTextEntry={true}
              underlineColorAndroid='transparent'
               onChangeText={(password) => this.setState({password})}/>

      

              <TouchableOpacity style={[styles.buttonContainer,{alignSelf:'center'}]}>
                <Text>Add To Wallet</Text>
              </TouchableOpacity>
               </View>
           
           
             
       </View>

   </Modal>
   ) 

   :

   null

}
 
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
              transparent={false}
 
              animationType={"slide"}
 
              visible={this.state.ModalVisibleStatus1}
 
              onRequestClose={ () => { this.ShowModalFunction1(!this.state.ModalVisibleStatus1)} } >
 
                <View style={styles.modalView}>
 
                    {/* <Image style={styles.mainImage} source = {{ uri: this.state.TempImageURL }} /> */}
 
                      <TouchableOpacity 
                        activeOpacity = { 0.5 }
                        style={styles.TouchableOpacity_Style}
                        onPress={() => { this.ShowModalFunction1(!this.state.ModalVisibleStatus1)} } >
  
                          <Image source={{uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/close_button.png'}}
                          style={{width:25, height: 25}} />
  
                      </TouchableOpacity>
                        <View style={{height:250,width:"80%",backgroundColor: "#fff",}}>
                          <Text style={{margin:15,alignSelf:'center'}}>WithDraw Money</Text>
                          <TextInput style={[styles.inputContainer,{alignSelf:'center',backgroundColor:'grey'}]}
                          placeholder="Amount"
                         // secureTextEntry={true}
                         underlineColorAndroid='transparent'
                          onChangeText={(password) => this.setState({password})}/>

                         <TextInput style={[styles.inputContainer,{alignSelf:'center',backgroundColor:'grey'}]}
                          placeholder="Mobile NUmber"
                         // secureTextEntry={true}
                         underlineColorAndroid='transparent'
                          onChangeText={(password) => this.setState({password})}/>

                         <TouchableOpacity style={[styles.buttonContainer,{alignSelf:'center'}]}>
                           <Text>WithDraw</Text>
                         </TouchableOpacity>
                          </View>
                      
                      
                        
                  </View>
                  
 
              </Modal>
              ) 
 
              :
 
              null
 
           }

{
  this.state.ModalVisibleStatus3 
  
  ?

   (
     <Modal
   transparent={false}

   animationType={"slide"}

   visible={this.state.ModalVisibleStatus3}

   onRequestClose={ () => { this.ShowModalFunction3(!this.state.ModalVisibleStatus3)} } >

     <View style={styles.modalView}>

         {/* <Image style={styles.mainImage} source = {{ uri: this.state.TempImageURL }} /> */}

 
             <View style={{height:250,width:"80%",backgroundColor: "#fff",}}>
             <TouchableOpacity 
             activeOpacity = { 0.5 }
             style={styles.TouchableOpacity_Style}
             onPress={() => { this.ShowModalFunction3(!this.state.ModalVisibleStatus3)} } >

               <Image source={{uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/close_button.png'}}
               style={{width:25, height: 25}} />

           </TouchableOpacity>
               <Text style={{margin:15,alignSelf:'center'}}>Update Profile</Text>
               <TextInput style={[styles.inputContainer,{alignSelf:'center',backgroundColor:'grey'}]}
               placeholder="Name"
              // secureTextEntry={true}
              underlineColorAndroid='transparent'
               onChangeText={(uname) => this.setState({uname})}/>

               <TextInput style={[styles.inputContainer,{alignSelf:'center',backgroundColor:'grey'}]}
                placeholder="Mobile"
               // secureTextEntry={true}
                underlineColorAndroid='transparent'
                 onChangeText={(phone) => this.setState({phone})}/>

      

              <TouchableOpacity style={[styles.buttonContainer,{alignSelf:'center'}]}
              onPress={this.UpdateProfile}
              >
                <Text>Update Profile</Text>
              </TouchableOpacity>
               </View>
           
           
             
       </View>

   </Modal>
   ) 

   :

   null

}



{
  this.state.auth 
  
  ?

   (
     <Modal
   transparent={false}

   animationType={"slide"}

   visible={this.state.auth}

   onRequestClose={ () =>  {
     this.setState({auth:false,isLoading:false})
     this.props.navigation.navigate("Play") }} >
      <ImageBackground style={{flex:1,width:'100%',height:'100%'}} blurRadius={4} source={require('../assets/background.png')}>

     <View style={styles.modalView}>
          <Text style={{margin:15,alignSelf:'center',color:'white'}}>You Need To Login First</Text>
          <Image style={{width:100,height:100,borderRadius:30}} source={require('../assets/logo.png')} /> 

        
             <View style={{height:200,width:"80%",backgroundColor: "transparent",}}>
               
              
               <TouchableOpacity style={[styles.buttonContainer,{alignSelf:'center',backgroundColor:'#7C0000'}]}
               onPress={()=>{this.setState({auth:false,isLoading:false})
               this.props.navigation.popToTop()
               this.props.navigation.navigate("Login")
              
              }}
               >
                <Text style={{color:'white'}}>Login</Text>
              </TouchableOpacity>

      

              <TouchableOpacity style={[styles.buttonContainer,{alignSelf:'center',backgroundColor:'#991313'}]}
              onPress={()=>{
                this.setState({auth:false,isLoading:false})
                this.props.navigation.navigate("Register")}}
              >
                <Text style={{color:'white'}}>Signup</Text>
              </TouchableOpacity>
               </View>
           
           
             
       </View>

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

</ScrollView>
   
      </View>
    
    
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00CED1",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
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
    backgroundColor: "#00BFFF",
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
 