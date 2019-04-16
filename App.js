import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Icon } from 'native-base';
import { Provider } from 'react-redux';

import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen'
import ProductDetail from './src/screens/ProductDetail'
import ListCart from './src/screens/ListCart'
import Checkout from './src/screens/Checkout'
import Finished from './src/screens/Finished'
import ButtomNav from './src/screens/routes/buttomNav'

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


type Props = {};
export default class App extends Component<Props> {
  render(){
    return(
      <Provider store={store}>
        {/* {children} */}

       <AppContainer  />
      </Provider>

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
