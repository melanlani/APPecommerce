import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab, List, ListItem, Thumbnail } from 'native-base';

export default class ListCart extends React.Component {
  static navigationOptions = {
  title: 'Cart',
};
  constructor(props) {
    super(props);
      const { imageHolder, nameProduct, priceHolder, quantity } = props.navigation.state.params;

      this.state = {
        product: {
          imageHolder,
          nameProduct,
          priceHolder,
          quantity
        }
      }
  }

  render() {
    const { imageHolder, nameProduct, priceHolder, quantity } = this.state.product;
        return(
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
            <List key={this.props.keyval}>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: imageHolder }} />
              </Left>
              <Body>
                <Text>{nameProduct}</Text>
                <Text note numberOfLines={1}>Rp {priceHolder}</Text>
                <Text style={{fontWeight: 'bold'}}>Qty: {quantity}</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Icon name='trash' />
                </Button>
              </Right>
            </ListItem>
          </List>
          <Footer>
            <FooterTab style={styles.footer}>
              <Button active style={styles.footer}>
                <Text>Bayar</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
            )

    }

}
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
