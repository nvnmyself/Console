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
  ImageBackground,
  Modal
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PulseIndicator,} from 'react-native-indicators';
export default class SignUpView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email   : '',
      password: '',
      username:'',
      mobile:'',
      promo:'',
      isLoading:true
      
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  componentDidMount(){
    this.setState({isLoading:false})
  }

  Register = ()=>{

    if(this.state.fullName!=''){
        if(this.state.email!=''){
           if(this.state.mobile!='' && this.state.mobile.length>=10 ){
               if(this.state.password !='' || this.state.password.length>=8){
                    if(this.state.username!=''){
                      this.setState({isLoading:true})
                      //POST json 
                      var dataToSend = {name: this.state.fullName, email: this.state.email, password: this.state.password, username: this.state.username, mobile: this.state.mobile, promo:this.state.promo};
                      //making data to send on server
                      var formBody = [];
                      for (var key in dataToSend) {
                        var encodedKey = encodeURIComponent(key);
                        var encodedValue = encodeURIComponent(dataToSend[key]);
                        formBody.push(encodedKey + "=" + encodedValue);
                      }
                      formBody = formBody.join("&");
                      //POST request 
                      fetch('http://www.radicaltechsupport.com/pubg/activity.php?method=register', {
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
                          },function(){
                                if(responseJson.response.status=='1'){
                                 Alert.alert("Registration Successfull")
                                  this.props.navigation.goBack()
                                }else{
                                  Alert.alert("Something Went Wrong")
                                }
                          }
                          )
                      })
                      //If response is not in json then in error
                      .catch((error) => {
                        alert(JSON.stringify(error));
                        this.setState({
                          isLoading:false
                        })
                      //  console.error(error);
                      });
                   
                    }else{
                      alert("User name is required")
                    }
               }else{
                 alert("password is too short(min 8) or empty ")
               }
           }else{
             alert("Mobile number is not correct")
           }
        }else{
          alert("Email is not correct")
        }
    }else{
      alert("First name is required")
    }
  }


  render() {
    return (
      <ImageBackground style={{flex:1,width:'100%',height:'100%'}} blurRadius={7} source={require('../assets/background.png')}>
       <ScrollView style={{flex:1,}}>
      <View style={styles.container}>
    
      <Image style={[styles.inputIcon,{width:150,height:150,marginBottom:10,borderRadius:90,borderColor:'#fff',borderWidth:3}]} source={require('../assets/logo.png')}/>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Full name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(fullName) => this.setState({fullName})}/>
        </View>
        {this.state.isLoading? 
     <Modal
     transparent={true}
      visible={this.state.isLoading?true:false}
     >
     <PulseIndicator style={{flex:1,backgroundColor:'transparent'}} size={100}  color='#00BFFF' />
     </Modal>:null}
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('../assets/username.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Username(pubg)"
              keyboardType="name-phone-pad"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({username})}/>
        </View>


        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('../assets/mobile.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Mobile"
              keyboardType="number-pad"
              maxLength={10}
              underlineColorAndroid='transparent'
              onChangeText={(mobile) => this.setState({mobile})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="promo code (optional)"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(promo) => this.setState({promo})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton,{ backgroundColor: "#00b5ec",}]} onPress={this.Register}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableHighlight>
        
      </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40
  //  backgroundColor: '#00b5ec',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:15,
      //borderBottomWidth: 1,
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
    borderRadius:15,
  },
  signupButton: {
    backgroundColor: "#FF4DFF",
  },
  signUpText: {
    color: 'white',
  }
});
 