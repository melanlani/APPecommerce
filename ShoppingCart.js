import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './HomeScreen'
import ProductDetail from './ProductDetail'
import ListCart from './ListCart'
import Cart from './Cart'

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: 'Welcome Shopping'
    })
},
  Detail: {
    screen: ProductDetail,
    navigationOptions: () => ({
      title: 'Detail Product'
    })
  },
  ListCart: {
    screen: ListCart,
    navigationOptions: () => ({
      title: 'Cart'
    })
  }
});

const ShoppingCart = createAppContainer(MainNavigator);

export default ShoppingCart;
const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  header: {
  backgroundColor: '#E91E63',
  },
  });
