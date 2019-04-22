import React, { Component } from 'react';
import { Alert, StyleSheet, Image, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { Container,Header,Left,Body,Right,Button,Icon,Title,CardItem,Card,Thumbnail,Input } from 'native-base';

import { baseUrl } from '../redux/actions/api';
import Axios from 'axios';
import EmptyCart from "./EmptyCart";
import { connect } from 'react-redux';
import { getCart, deleteItem, handlePlus, handleMin } from '../redux/actions/orders';

class ListCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCart: [],
      total: 0,
      pending: true
    }
  }

  componentDidMount(){
    this.props.navigation.addListener("willFocus", route => {
        this.addData();
    })
  }

  addData() {
    Axios.get(`${baseUrl}/api/v1/orders/`)
    .then((res) => {
      const products= res.data.data;
      products.forEach((item) => {
      const orderId = item.orderId;
      const imageHolder = item.imageHolder;
      const nameProduct = item.nameProduct;
      const priceHolder = item.priceHolder;
      const qty = item.qty;
      const price = item.price;
      const product_id = item.product_id;
      if (product_id !== undefined) {
        const findId = this.state.itemCart.findIndex((val, i) => {
          return val.product_id === product_id;
        });
        if (findId === -1) {

          const itemNewCart = this.state.itemCart;
          itemNewCart.push({
            orderId: orderId,
            product_id: product_id,
            imageHolder: imageHolder,
            nameProduct: nameProduct,
            priceHolder: priceHolder,
            qty: qty,
            price: price
          });
          const total1 = this.state.itemCart.map(item => item.price)
          const total2 = this.totalFormula(total1)
          this.setState({
            itemCart :[...itemNewCart],
            total: total2,
            pending: false,
            refresh: !this.state.itemCart
          })
        }
      }
      })

    })
    .catch((error) => {
      console.log(error);
    })

  }

  totalFormula = arr => arr.reduce((accumulator, currentValue) => parseInt(accumulator, 10) + parseInt(currentValue, 10))

  deleteCartItem = (product_id) => {
    Alert.alert(
      'Are you sure?',
      'You wont be able to revert this',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () =>
          {
            for (var i = 0; i < this.state.itemCart.length; i++) {
            	if (this.state.itemCart[i].product_id == product_id ) {
            		this.state.itemCart.splice(i, 1);
            	}
            }
            Axios.delete(`${baseUrl}/api/v1/order/${product_id}`)
            .then(res => {
              const total1 = this.state.itemCart.map(item => item.price)
              const total2 = this.totalFormula(total1)
              this.setState({
                itemCart: [...this.state.itemCart],
                total: total2,
                pending: false
              })
            })
            .catch(error => {
              console.log(error);
            })
            this.setState({
              itemCart: [...this.state.itemCart],
              pending: false
            })
          }
        },
      ],
      { cancelable: false },
    );
  }

  handlePlus = (orderId,qty, price, index) => {
    this.state.itemCart[index].qty = this.state.itemCart[index].qty+1
    this.state.itemCart[index].price = parseInt(this.state.itemCart[index].qty, 10)*parseInt(this.state.itemCart[index].priceHolder, 10)

    const quantity = qty+1;
    const subtotal = price;
    Axios.patch(`${baseUrl}/api/v1/order/${orderId}`,{
      qty: quantity,
      price: subtotal
    })
    .then(res => {
      const total1 = this.state.itemCart.map(item => item.price)
      const total2 = this.totalFormula(total1)
      this.setState({
        itemCart: [...this.state.itemCart],
        total: total2
      })
    })
    .catch(error => {
      console.log(error);
    })
    const total1 = this.state.itemCart.map(item => item.price)
    const total2 = this.totalFormula(total1)
    this.setState({
      itemCart: [...this.state.itemCart],
      total: total2
    })

  }

  handleMin = (orderId,qty, price, index) => {
    if(this.state.itemCart[index].qty > 1) {
    this.state.itemCart[index].qty = this.state.itemCart[index].qty-1
    this.state.itemCart[index].price = parseInt(this.state.itemCart[index].qty, 10)*parseInt(this.state.itemCart[index].priceHolder, 10)
    const quantity = qty-1;
    const subtotal = price;
    Axios.patch(`${baseUrl}/api/v1/order/${orderId}`,{
      qty: quantity,
      price: subtotal
    })
    .then(res => {
      const total1 = this.state.itemCart.map(item => item.price)
      const total2 = this.totalFormula(total1)
      this.setState({
        itemCart: [...this.state.itemCart],
        total: total2
      })
    })
    .catch(error => {
      console.log(error);
    })
    const total1 = this.state.itemCart.map(item => item.price)
    const total2 = this.totalFormula(total1)
    this.setState({
      itemCart: [...this.state.itemCart],
      total: total2
    })
  }
}

  render() {

    if (this.state.itemCart.length == 0) {
      return (
          <EmptyCart />
      )
    }
    if (this.state.pending) {
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
            data={this.state.itemCart}
            extraData = {this.state.refresh}
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
                    onPress={ () => this.deleteCartItem(item.product_id) } style={styles.btnDelete}>
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
                <Text style={styles.textPrice}>Rp. {this.state.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} </Text>
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
      deleteItemDispatch: (id) => {
        dispatch(deleteItem(id))
      },
      plusQtyDispatch: (product_id, qty, price) => {
        dispatch(handlePlus(product_id, qty, price))
      },
      minQtyDispatch: (product_id, qty, price) => {
        dispatch(handleMin(product_id, qty, price))
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ListCart);
