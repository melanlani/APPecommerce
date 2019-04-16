import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Icon } from 'native-base';

import HomeScreen from '../HomeScreen'
import ListCart from '../ListCart'

export const ButtomNav = createBottomTabNavigator({
  //   Home: { screen: HomeScreen },
  //   Settings: { screen: SettingsScreen },
  //   Profile: { screen: ProfileScreen },

  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Product List",
      tabBarIcon: <Icon name="home" style={{ color: "#E91E63"}}/>
    }
  },

  ListCart: {
    screen: ListCart,
    navigationOptions: {
      tabBarLabel: "Cart",
      tabBarIcon: <Icon name="cart" style={{ color: "#E91E63"}}/>
    }
  }
});



//export const SignedOut = createAppContainer(SignedOutNavigator);
export default createAppContainer(ButtomNav);
