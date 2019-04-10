import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ShoppingCart from './components/routes/ShoppingCart';

export default class App extends React.Component {
  render() {
    return (
      <ShoppingCart />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
