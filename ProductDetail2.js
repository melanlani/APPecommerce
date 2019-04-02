import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';

export default class ProductDetail2 extends React.Component {
  static navigationOptions = {
    title: 'Detail Product',
  };

  render() {
    return (
      <Container>
        <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
            <Icon name='menu' />
          </Button>
        </Left>
          <Body>
            <Title>Shopping</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>
            <Button transparent>
              <Icon name="cart" />
            </Button>
          </Right>
        </Header>

        <Text>This is Product Detail Page Duaa</Text>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  header: {
  backgroundColor: '#E91E63',
  },
  });
