import React, { Component } from 'react';
import { Alert, StyleSheet, Image, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { Container,Header,Left,Body,Right,Button,Icon,Title,CardItem,Card,Thumbnail,Input } from 'native-base';

import { baseUrl } from '../redux/actions/api';
import Axios from 'axios';
import EmptyCart from "./EmptyCart";
import { connect } from 'react-redux';
import { getCart, deleteItem, handlePlus, handleMin } from '../redux/actions/orders';

class ListCart extends Component {

  componentDidMount(){
    this.props.navigation.addListener("didFocus", route => {
      this.props.getCartDispatch();
    })
  }

  deleteItem(orderId) {
    Alert.alert(
      'Are you sure to delete item?','',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () =>
          {
            this.props.deleteItemDispatch(orderId);
            this.props.getCartDispatch();
          }
        },
      ],
      { cancelable: false },
    );
  }

  handlePlus = (orderId, qty, price,index) => {
    this.props.plusQtyDispatch(orderId, qty + 1, price);
    this.props.getCartDispatch();
  };

  handleMin = (orderId, qty, price,index) => {
    this.props.minQtyDispatch(orderId, qty - 1, price);
    this.props.getCartDispatch();
  };

  render() {

    if (this.props.orders.pending) {
      return(
        <View style={styles.viewPending}>
          <ActivityIndicator color="#E91E63" size="large"  />
        </View>
      )
    }
    else {
    if (this.props.orders.itemCart.length == 0) {
      return (
          <EmptyCart />
      )
    }
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
            </Right>
          </Header>

          <FlatList
            style={{ flex: 1 }}
            keyExtractor={item => item.orderId.toString()}
            data={this.props.orders.itemCart}
            extraData = {this.props}
            renderItem={({ item, index }) => (

            <Card>
              <CardItem>
                <Left>
                  <Thumbnail square source={{uri:  item.imageHolder}} />
                  <Body>
                    <Text style={styles.textProduct}>{ item.nameProduct }</Text>
                    <Text note>{item.priceHolder.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}/pcs</Text>
                  </Body>
                </Left>
                <Right>
                  <Button transparent small
                    onPress={() => this.deleteItem(item.orderId)} style={styles.btnDelete}>
                    <Icon name="close" style={{color:'#E91E63'}}/>
                  </Button>
                </Right>
              </CardItem>

              <CardItem>
                <Left>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Button success small onPress={ () => this.handleMin(item.orderId, item.qty, item.price, index) } style={styles.btnQty}>
                    <Text>-</Text>
                  </Button>
                  <View style={styles.viewQty}>
                    <Input placeholder={`${item.qty}`} style={styles.inputQty} disabled />
                  </View>
                  <Button success small onPress={ () => this.handlePlus(item.orderId, item.qty, item.price, index) } style={styles.btnQty}>
                    <Text>+</Text>
                  </Button>
                </View>
                </Left>
                <Right>
                  <Text style={{fontWeight:'bold'}}>Rp. {item.subtotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
                </Right>
              </CardItem>
            </Card>
          )}
          />

          <Card>
            <CardItem>
              <Left>
                  <Text style={styles.textTotal}>Total</Text>
              </Left>
              <Right>
                <Text style={styles.textPrice}>Rp. {this.props.orders.total}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Button style={styles.btnCheckout} onPress={() => { this.props.navigation.navigate('Checkout', {
                totalPrice: this.props.orders.total,
                itemCart: this.props.orders.itemCart
              });}}>
                <Text style={styles.txtCheckout}>Checkout</Text>
              </Button>
            </CardItem>
          </Card>

        </Container>
      );
    }
  }
}

  const styles = StyleSheet.create({
    header: {
      backgroundColor: '#E91E63',
    },
    textProduct: {
      color: 'black',
      fontSize: 16
    },
    textPrice: {
      color: '#E91E63',
      fontSize: 18
    },
    textPricepsc: {
      fontWeight: 'bold',
      fontSize: 14,
      left: 220
    },
    textTotal: {
      fontWeight: 'bold',
      fontSize: 18
    },
    textQuantity: {
      color: 'black',
      fontSize: 16
    },
    btnDelete: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'center'
    },
    viewQty: {
      marginLeft: 8,
      marginTop: -11
    },
    btnQty: {
      width: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#E91E63'
    },
    inputQty: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnCheckout: {
      width:320,
      backgroundColor:'#E91E63'
    },
    txtCheckout: {
      left:130,
      color:'white'
    },
    viewPending: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#E91E63'
    },
  });

  const mapStateToProps = state => ({
    orders : state.orders
  })

  const mapDispatchToProps = dispatch => {
    return {
      getCartDispatch: () => {
        dispatch(getCart())
      },
      deleteItemDispatch: (orderId) => {
        dispatch(deleteItem(orderId))
      },
      plusQtyDispatch: (orderId, qty, price) => {
        dispatch(handlePlus(orderId, qty, price))
      },
      minQtyDispatch: (orderId, qty, price) => {
        dispatch(handleMin(orderId, qty, price))
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ListCart);
