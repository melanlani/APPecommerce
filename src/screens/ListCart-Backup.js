import React, { Component } from 'react';
import { Alert, StyleSheet, Image, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { Container,Header,Left,Body,Right,Button,Icon,Title,CardItem,Card,Thumbnail,Input } from 'native-base';
import EmptyCart from "./EmptyCart";
import { baseUrl } from '../redux/actions/api';
import Axios from 'axios';
import { connect } from 'react-redux';
import { getCart, deleteItem, handlePlus, handleMin } from '../redux/actions/orders';

class ListCart extends Component {

  componentDidMount() {
    this.props.getCartDispatch();
    }

  deleteItem(id) {
        this.props.deleteItemDispatch(id);
        this.props.getCartDispatch();
    }

  handlePlus = (product_id, qty, priceHolder) => {
    this.props.plusQtyDispatch(product_id, qty + 1, priceHolder);
    this.props.getCartDispatch();
  };

  handleMin = (product_id, qty, priceHolder) => {
    this.props.minQtyDispatch(product_id, qty - 1, priceHolder);
    this.props.getCartDispatch();
  };

  totalFormula = arr => arr.reduce((accumulator, currentValue) => parseInt(accumulator, 10) + parseInt(currentValue, 10))

  render() {
    const { pending, itemCart } = this.props.orders;
    if (pending) {
      return(
        <View style={styles.viewPending}>
          <ActivityIndicator color="#E91E63" size="large"  />
        </View>
      )
    }
    else {
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
            data={this.props.orders.itemCart}
            renderItem={({ item }) => (

            <Card>
              <CardItem>
                <Left>
                  <Thumbnail square source={{uri:  item.imageHolder}} />
                  <Body>
                    <Text style={styles.textProduct}>{ item.nameProduct } { item.orderId } { item.product_id }</Text>
                    <Text note>{item.priceHolder.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}/pcs</Text>
                  </Body>
                </Left>
                <Right>
                  <Button transparent small
                    onPress={() => this.deleteItem(item.id)} style={styles.btnDelete}>
                    <Icon name="close" style={{color:'#E91E63'}}/>
                  </Button>
                </Right>
              </CardItem>

              <CardItem>
                <Left>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Button success small onPress={() => this.handleMin(item.product_id, item.qty, item.priceHolder)} style={styles.btnQty}>
                    <Text>-</Text>
                  </Button>
                  <View style={{ marginLeft: 8, marginTop: -11 }}>
                    <Input placeholder={`${item.qty}`} style={styles.inputQty} disabled />
                  </View>
                  <Button success small onPress={() => this.handlePlus(item.product_id, item.qty+ 1, item.priceHolder)} style={styles.btnQty}>
                    <Text>+</Text>
                  </Button>
                </View>
                </Left>
                <Right>
                  <Text style={{fontWeight:'bold'}}>Rp. {item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
                </Right>
              </CardItem>
            </Card>
          )}
          keyExtractor={(item, index) => index.toString()}
          />


          <Card>
            <CardItem>
              <Left>
                  <Text style={styles.textTotal}>Total</Text>
              </Left>
              <Right>
                <Text style={styles.textPrice}>Rp.  </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Button style={styles.btnCheckout} onPress={() => { this.props.navigation.navigate('Checkout', {
                totalPrice: this.state.total,
                itemCart: this.state.itemCart
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
    viewIcon: {
      justifyContent: "center",
      alignItems: "center",
      flex:1
    },
    iconCart: {
      color: "#E91E63",
      fontSize: 200
    },
    txtCart: {
      fontSize: 20,
      fontWeight: "bold",
      color: 'black'
    }
  });

  const mapStateToProps = state => ({
    orders : state.orders
  })

  const mapDispatchToProps = dispatch => {
    return {
      getCartDispatch: () => {
        dispatch(getCart())
      },
      deleteItemDispatch: (id) => {
        dispatch(deleteItem(id))
      },
      plusQtyDispatch: (product_id, qty, priceHolder) => {
        dispatch(handlePlus(product_id, qty, priceHolder))
      },
      minQtyDispatch: (product_id, qty, priceHolder) => {
        dispatch(handleMin(product_id, qty, priceHolder))
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ListCart);
