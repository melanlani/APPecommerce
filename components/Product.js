import React, { Component } from 'react';
import {StyleSheet, Alert, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';

class Product extends Component {

  render() {

    return (

            <View style={{paddingLeft:30, paddingRight: 30}}>
            <Card>
              <CardItem>
                <Left>
                  <Text>{this.props.nameProduct}</Text>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={this.props.imageHolder} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
              <CardItem>
                <Left>
                <Text>Rp {this.props.priceHolder}</Text>
                </Left>
                <Right>
                  <TouchableOpacity onPress={this.props.getDetails}>
                  <Text style={{color: '#E91E63'}}>Detail</Text>
                  </TouchableOpacity>
                </Right>
              </CardItem>
            </Card>
            </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  header: {
  backgroundColor: '#E91E63',
  },
  });
export default Product;
