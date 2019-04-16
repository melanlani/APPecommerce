import React, { Component } from 'react';
import {Alert, StyleSheet, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  CardItem,
  Card,
  Thumbnail,
  Input
} from 'native-base';
import Axios from 'axios';
import EmptyCart from "./EmptyCart";

class ListCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCart: [],
      total: 0
    }
  }

  componentWillMount(){

      this.props.navigation.addListener("willFocus", route => {
          this.addData();
      })
  }

  addData() {

    const { navigation } = this.props;
    const id = navigation.getParam("product_id", "");
    const baseUrl = "http://192.168.43.192:3333";

    Axios.get(`${baseUrl}/api/v1/orders/${id}`)
    .then((res) => {
      // console.error(res.data.data);
      const products= res.data.data;
      products.forEach((item) => {
      const orderId = item.id;
      const imageHolder = item.imageHolder;
      const nameProduct = item.nameProduct;
      const priceHolder = item.priceHolder;
      const qty = item.qty;
      const price = item.price;
      const product_id = item.product_id;
      // console.error(priceHolder);
      if (product_id !== undefined) {
        const findId = this.state.itemCart.findIndex((val, i) => {
          return val.product_id === product_id;
        });
        if (findId === -1) {

          const itemCart = this.state.itemCart;
          itemCart.push({
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
            total: total2,
            itemCart: itemCart
          })
        }
      }
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  componentDidMount() {
  }

  totalFormula = arr => arr.reduce((accumulator, currentValue) => parseInt(accumulator, 10) + parseInt(currentValue, 10))

  formatPrice = (num)=> {
    num = num.toString().replace(/\Rp|/g,'');
    if(isNaN(num))
      num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
      cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
      num = num.substring(0,num.length-(4*i+3))+'.'+
      num.substring(num.length-(4*i+3));
      return `${num},${cents}`
  }

  deleteCartItem = (product_id) => {
    for (var i = 0; i < this.state.itemCart.length; i++) {
    	if (this.state.itemCart[i].product_id == product_id ) {
    		this.state.itemCart.splice(i, 1);
    	}
    }
    Axios.delete(`http://192.168.43.192:3333/api/v1/order/${product_id}`)
    .then(res => {
      const total1 = this.state.itemCart.map(item => item.price)
      const total2 = this.totalFormula(total1)
      this.setState({
        itemCart: this.state.itemCart,
        total: total2
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  handlePlus = (orderId,index) => {
    this.state.itemCart[index].qty = this.state.itemCart[index].qty+1
    this.state.itemCart[index].price = parseInt(this.state.itemCart[index].qty, 10)*parseInt(this.state.itemCart[index].priceHolder, 10)
    this.forceUpdate()

    const total1 = this.state.itemCart.map(item => item.price)
    const total2 = this.totalFormula(total1)
    this.setState({
      total: total2
    })
  }

  handleMin = (orderId,index) => {
    if(this.state.itemCart[index].qty > 1) {
    this.state.itemCart[index].qty = this.state.itemCart[index].qty-1
    this.state.itemCart[index].price = parseInt(this.state.itemCart[index].qty, 10)*parseInt(this.state.itemCart[index].priceHolder, 10)
    this.forceUpdate()

    const total1 = this.state.itemCart.map(item => item.price)
    const total2 = this.totalFormula(total1)
    this.setState({
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
            extraData = {this.state}
            renderItem={({ item, index }) => (

              <Card>

                <CardItem>
                  <Left>
                    <Thumbnail square source={{uri:  item.imageHolder}} />
                    <Body>
                      <Text style={styles.textProduct}>{ item.nameProduct }</Text>
                      <Text note>{this.formatPrice(item.priceHolder)}/pcs</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Button transparent small
                      onPress={ () => this.deleteCartItem(item.product_id) } style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="close" style={{color:'#E91E63'}}/>
                    </Button>
                  </Right>
                </CardItem>

                <CardItem>
                <Left>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Button success small onPress={ () => this.handleMin(item.orderId, index) } style={{ width: 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'#E91E63' }}>
                    <Text>-</Text>
                  </Button>
                  <View style={{ marginLeft: 8, marginTop: -11 }}>
                    <Input placeholder={`${item.qty}`} style={{ justifyContent: 'center', alignItems: 'center' }} disabled />
                  </View>
                  <Button success small onPress={ () => this.handlePlus(item.orderId, index) } style={{ width: 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'#E91E63' }}>
                    <Text>+</Text>
                  </Button>
                </View>
                </Left>
                <Right>
                  <Text style={{fontWeight:'bold'}}>Rp. {this.formatPrice(item.price)}</Text>
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
              <Text style={styles.textPrice}>Rp. {this.formatPrice(this.state.total)} </Text>
            </Right>
            </CardItem>
          <CardItem>
          <Button style={{width:320, backgroundColor:'#E91E63'}} onPress={() => {this.props.navigation.navigate('Checkout', {
                      totalPrice: this.state.total
                    });}}>
            <Text style={{left:130, color:'white'}}>Checkout</Text>
          </Button>
          </CardItem>

          </Card>

        </Container>
    );
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
  starColor: {
    color: 'orange'
  },
  textQuantity: {
    color: 'black',
    fontSize: 16
  },
  footer: {
    backgroundColor: 'white',
  }
  });
  export default ListCart;
