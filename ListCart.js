import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab, List, ListItem, Thumbnail } from 'native-base';
import EmptyCart from "./components/EmptyCart";
export default class ListCart extends React.Component {
  constructor() {
        super();
        this.state = {
            cartList: []
        };
    }

  render() {
    const { navigation } = this.props;
        this.focusListener = navigation.addListener("willFocus", () => {
            const { navigation } = this.props;
            const imageHolder = navigation.getParam("imageHolder", "");
            const nameProduct = navigation.getParam("nameProduct", "");
            const priceHolder = navigation.getParam("priceHolder", "");

            const getProductQuantity = navigation.getParam(
                "quantity",
                ""
            );

            if (nameProduct !== "") {
                this.setState({
                    cartList: [
                        ...this.state.cartList,
                        {
                            imageHolder: imageHolder,
                            nameProduct: nameProduct,
                            priceHolder: priceHolder,
                            quantity: getProductQuantity
                        }
                    ]
                });
            }
        });
        if (this.state.cartList.length) {

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
              </Right>
            </Header>


            <FlatList
              data={this.state.cartList}
              renderItem={({item}) =>
              <List key={this.props.keyval}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={{ uri: item.imageHolder }} />
                </Left>
                <Body>
                  <Text>{item.nameProduct}</Text>
                  <Text note numberOfLines={1}>Rp {item.priceHolder}</Text>
                  <Text style={{fontWeight: 'bold'}}>Qty: {item.quantity}</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Icon name='trash' />
                  </Button>
                </Right>
              </ListItem>
            </List>
            }
            keyExtractor={(item, index) => index.toString()}
            />

          <Footer>
            <FooterTab style={styles.footer}>
              <Button active style={styles.footer}>
                <Text>Bayar</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
  } else {
      return <EmptyCart />;
  }
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
