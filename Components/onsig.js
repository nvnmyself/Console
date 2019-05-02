import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import {Text,Button,View} from 'react-native'

export default class App extends Component {

constructor(properties) {
    super(properties);
    OneSignal.init("4d1b3e8f-4351-4911-a0ea-1e7e3509755e");
  

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds.bind(this));

  }
  componentDidMount(){

    OneSignal.addEventListener('ids', this.updatePushId.bind(this));
    OneSignal.configure()
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device.userId);
   

  }

    
    async updatePushId(device) {
        console.log(device.userId)
    }
  render(){
      return(
          <View>
          <Text>hello</Text>
          <Button title="hello" onPress={()=>this.onIds()}/>
          </View>
      )
  }
}

