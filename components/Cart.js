import React, { Component } from 'react';
import {StyleSheet, Alert, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab,List,ListItem, Thumbnail} from 'native-base';

class Cart extends Component {

  render() {
    let total = 0;
    total += this.props.quantity * this.props.priceHolder;
    return (

            <List key={this.props.id}>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={this.props.imageHolder } />
              </Left>
              <Body>
                <Text>{this.props.nameProduct}</Text>
                <Text note numberOfLines={1}>Rp {this.props.priceHolder} x {this.props.quantity}pcs</Text>
                <Text style={{fontWeight: 'bold'}}>Price: Rp. {total}</Text>
              </Body>
              <Right>
                <Button transparent onPress={this.props.getDelete}>
                  <Icon name='trash' />
                </Button >
              </Right>
            </ListItem>
          </List>
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
export default Cart;
