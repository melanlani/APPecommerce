import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Icon } from 'native-base';

import HomeScreen from './HomeScreen'
import ProductDetail from './ProductDetail'
import ListCart from './ListCart'
import Checkout from './Checkout'
import Finished from './Finished'
import ButtomNav from './components/buttomNav'

const MainNavigator = createStackNavigator(
  {
  HomeScreen: { screen: ButtomNav,
    headerMode: 'none',
    navigationOptions: {
      header: null,
  } },
  Home: { screen: HomeScreen,
      headerMode: 'none',
      navigationOptions: {
        header: null,
    } },
  Detail : {screen: ProductDetail,
      headerMode: '',
      navigationOptions: {
      title: 'Detail Page',
      headerStyle: {
        backgroundColor: '#E91E63',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
  Checkout : {screen: Checkout,
      headerMode: '',
      navigationOptions: {
      title: 'Checkout Page',
      headerStyle: {
        backgroundColor: '#E91E63',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
  Finished : {screen: Finished,
      headerMode: '',
      navigationOptions: {
      title: 'Finishing',
      headerStyle: {
        backgroundColor: '#E91E63',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
  ListCart: {
    screen: ListCart,
    navigationOptions: {
      tabBarLabel: "Cart",
      tabBarIcon:
        <Icon name="cart" />

    }
  }
},
  {
   initialRouteName: 'HomeScreen'
  }
)



const AppContainer  = createAppContainer(MainNavigator);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class ShoppingCart extends Component<Props> {
  render(){
    return(
     <AppContainer  />

    );
  }

}


const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
