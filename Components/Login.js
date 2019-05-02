import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground,Modal
  
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  PulseIndicator,
} from 'react-native-indicators';
export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username   : '',
      password: '',
      userID:'',
      isLoading:true,
      device:''
    }
  }

  componentDidMount(){
    AsyncStorage.getItem("device").then((value) => {
      this.setState({device:value,isLoading:false }
     
        );
        console.log(this.state.device)
    });
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  Login = ()=>{
   this.setState({isLoading:true})
    //POST json 
    var dataToSend = { username: this.state.username, password: this.state.password,device:this.state.device};
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
   //   alert(JSON.stringify(responseJson))
       this.setState({
         isLoading:false,
       },function(){
         if(responseJson.response.status=='1'){
          AsyncStorage.setItem("userID",responseJson.response.userID)
         Alert.alert("Login Successfull")
           this.props.navigation.goBack()
         
         
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
  render() {
    return (
      <ImageBackground style={{flex:1,width:'100%',height:'100%'}} blurRadius={7} source={require('../assets/background.png')}>
      <View style={styles.container}>
      <Image style={[styles.inputIcon,{width:150,height:150,marginBottom:10,borderRadius:90,borderColor:'#fff',borderWidth:3}]} source={require('../assets/logo.png')}/>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Username"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({username})}/>
        </View>
        {this.state.isLoading? 
     <Modal
     transparent={true}
      visible={this.state.isLoading?true:false}
     >
     <PulseIndicator style={{flex:1,backgroundColor:'transparent'}} size={100}  color='#00BFFF' />
     </Modal>:null}
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>

        </View>

        <TouchableHighlight style={[styles.buttonContainer,{marginTop:-10,marginLeft:130,}]} onPress={() => this.onClickListener('restore_password')}>
            <Text  style={{color:'#fff'}}>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.Login}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate("Register")}>
            <Text style={{color:'#fff'}}>Create New Account</Text>
        </TouchableHighlight>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:15,
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
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:10,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
 