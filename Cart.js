import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab,List,ListItem, Thumbnail} from 'native-base';
import ListCart from './ListCart';

export default class Cart extends React.Component {
  static navigationOptions = {
    title: 'Cart',
  };
  constructor() {
    super();
      this.state = {
        cartArray: []
      }
  }
  componentWillMount(){
        const {navigation} = this.props;
        const willFocusSubs = navigation.addListener("willFocus", () =>{
            const {navigation} = this.props;

            const itemId = navigation.getParam("varFromAddNewToDo", "quantity");
            if (itemId !== ""){

                this.setState({
                    cartArray: this.state.cartArray.concat(itemId)
                });
            }
        });
    }

  render() {
    let carts = this.state.cartArray.map((val, key) => {
      return <ListCart key={key} keyval={key} val={val} deleteMethod={()=> this.deleteCart(key)}/>
    });
        return(
          <Container>
            <Header style={styles.header}>
            <Left>
              <Button transparent>
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

            <FlatList
                        //data itu properti dari Flatlist
                        data = {this.state.cartArray}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem = {
                            //item itu built in dari FlatList
                            ({item}) => (
                              <List>
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
                            )
                        }
                    />


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
