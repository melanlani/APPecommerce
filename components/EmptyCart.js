import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab, List, ListItem, Thumbnail } from 'native-base';

class EmptyCart extends Component {
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
                </Right>
              </Header>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Cart Still Empty
              </Text>

          </Container>
        );
    }
}

export default EmptyCart;

const styles = StyleSheet.create({
  header: {
  backgroundColor: '#E91E63',
  },
  textProduct: {
    color: 'black',
    fontSize: 18
  },
  textPrice: {
    color: '#E91E63',
    fontSize: 18
  },
  starColor: {
    color: 'orange'
  },
  footer: {
    backgroundColor: 'white',
  }
  });
