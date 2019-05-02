import React from 'react';
import { Text, View,Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {  createAppContainer, createStackNavigator } from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import ProfileView from './Components/UserProfile1';
import Games from './Components/GameList1';
import Results from './Components/Result';
import LoginView from './Components/Login';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Splash from './Components/Splash';
import Wallet from './Components/Wallet';
import SignUpView from './Components/Register';
import Ongoing from './Components/Ongoing';
import Notification from './Components/Notification';
import MatchResult from './Components/MatchResult';
import Earning from './Components/Earn';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class Earn extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}




class Notifications extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}


class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // /If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  let iconColor;
  let iconSize;
  
  if (routeName === 'Play') {
    
    iconName = `play${focused ? '' : ''}`;
    iconColor = focused?'#991313':'#00BFFF';
    iconSize=focused?27:25
    // We want to add badges to home tab icon
   
  } else if (routeName === 'Me') {
    iconName = `smile-o${focused ? '' : ''}`;
    iconColor = focused?'#991313':'#00BFFF';
    iconSize=focused?28:25
  }
  else if (routeName === 'Tournament') {
  

 
    iconName = `certificate${focused ? '' : ''}`;
    iconColor = focused?'#991313':'#00BFFF';
    iconSize=focused?28:25
  }
  else if (routeName === 'Challenges') {
    iconName = `star${focused ? '' : ''}`;
    iconColor = focused?'#991313':'#00BFFF';
    iconSize=focused?27:25;
    // IconComponent = HomeIconWithBadge;
  }
  else if (routeName === 'Result') {
    iconName = `rocket${focused ? '' : ''}`;
    iconColor = focused?'#991313':'#00BFFF';
    iconSize=focused?26:25
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={iconSize} color={iconColor} />;
};

const Earns =createStackNavigator({
   Earn:{
     screen:Earning
   },
},{
 
  headerMode:'none'
}

)

const Ongoings =createStackNavigator({
  Challenges:{
    screen:Ongoing
  },
  Notifications:{
    screen:Notifications
  }

},{

 headerMode:'none'
     
    },
)




const Plays =createStackNavigator({


  Games:{
    screen:Games
  },
  Login:{
    screen:LoginView
  },
  Register:{
    screen:SignUpView
  },
  Notification:{
    screen:Notification
  },Wallet:{
    screen:Wallet
  }
 
  
 
},{
  headerMode:'none'
}

  // defaultNavigationOptions: {
  //    headerStyle: {
  //      backgroundColor: '#0091EA',
  //    },
  //    headerTintColor: '#FFFFFF',
  //    title: 'Pubg Paytm',
  //   headerRight:  (
  //    <View style={{flexDirection:'row'}}>
  //      <TouchableOpacity onPress={()=>this.props.navigation.navigate("Notifications")}>
  //     <Ionicons style={{fontSize:30,margin:10}} name="ios-wallet"/>
  //     </TouchableOpacity>

  //     <TouchableOpacity >
  //     <Ionicons style={{fontSize:30,margin:10}} name="ios-notifications">
     
  //     </Ionicons>
  //     </TouchableOpacity>
      
  //     <TouchableOpacity>
  //     <Ionicons style={{fontSize:30,margin:10}} name="ios-power"/>
  //     </TouchableOpacity>

  //     </View>
  //      )   },
   
)

const Resultss =createStackNavigator({
  Result:{
    screen:Results
  },
  MatchResult:{
    screen:MatchResult
  }
},{
headerMode:'none'
})

const ProfileViews =createStackNavigator({
  ProfileView:{
    screen:ProfileView
  },
  
},{
  headerMode:'none'
 
})


export default createAppContainer(
  createMaterialBottomTabNavigator(
    { 
      Tournament:{screen:Earns},
      Challenges:{screen:Ongoings},
      Play: { screen: Plays },
      Result:{screen:Resultss},
      Me: { screen: ProfileViews },
     
    },
 
   
    {
       initialRouteName:'Play',
       shifting:true,
     activeTintColor:'#00BFFF',
      barStyle:{backgroundColor:'#241212',height:60,},
     labeled:true,
     
      defaultNavigationOptions: ({ navigation }) => ({
        
        
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
        
          
          
      }),
   
      tabBarOptions: {
        activeTintColor: 'tomato',
       
        inactiveTintColor: 'gray',
       
      },
    }
  )
);
Plays.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length >0) {
    navigation.state.routes.map(route => {
      if (route.routeName === "Login" ||route.routeName === "Register" || route.routeName=== "Notification" ) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }

    
    });
  }

  return {
    tabBarVisible
  };
};