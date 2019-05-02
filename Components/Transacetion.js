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
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
export default class EventsView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {day:1, month: 'Sep'}, 
        {day:2, month: 'Jan'}, 
        {day:3, month: 'Aug'}, 
        {day:4, month: 'Dec'}, 
        {day:5, month: 'Jul'}, 
        {day:6, month: 'Oct'}, 
        {day:7, month: 'Sep'},
        {day:8, month: 'Jan'},
        {day:9, month: 'May'},
      ]),
    };
  }

  eventClickListener = (viewId) => {
    Alert.alert("alert", "event clicked");
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView enableEmptySections={true}
          style={styles.eventList}
          dataSource={this.state.dataSource}
          renderRow={(event) => {
            return (
              <TouchableOpacity onPress={() => this.eventClickListener("row")}>
                <View style={styles.eventBox}>
                  {/* <View style={styles.eventDate}>
                     <Text  style={styles.eventDay}>{event.day}</Text>
                     <Text  style={styles.eventMonth}>{event.month}</Text>
            </View> */}
                
                     <View style={styles.eventContent}>
                    <Text  style={styles.eventTime}>Debited by paytm</Text>
                   
                    <View style={{flex:1,flexDirection:'row'}}>
                        <Text style={{flex:1,marginLeft:30}}>Debit</Text>
                        <Text style={{flex:1,marginLeft:150}}>
                        <Ionicons name="rupee" style={{fontSize:20}}/>
                        </Text>
                        <Text style={{flex:1,}}>100</Text>
                       
                    </View>
                    <Text  style={[styles.description,{alignSelf:'flex-end'}]}>27/03/2014</Text>
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
 