
import React, {Component} from 'react';
import {View,Text} from 'react-native'; 
import RNUpiPayment from 'react-native-upi-payment';

/*
    npm install react-native-upi-payment
    react-native link
*/

export default class App extends Component{
    constructor(props){
        super();
        this.state={
            Status:"", txnId:"",
        }
    }

    success(){
        alert("hello")
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
            alert("hello")
            var dataToSend = { amount: '100000000', userID:'1'};
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
            
          
        
            //nothing happened here using Google Pay
        }
        return (
        <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
            <Text onPress={()=>{floo()}}>OPEN</Text>
            <Text>{this.state.Status+" "+this.state.txnId}</Text>
        </View>
        );
    }
}