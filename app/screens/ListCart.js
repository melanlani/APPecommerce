import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
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
import axios from 'axios';
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

    axios.get(`${baseUrl}/api/v1/orders/${id}`)
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

  deleteCartItem = (product_id, nameProduct) => {
    const baseUrl = "http://192.168.43.192:3333";
      axios.delete(`${baseUrl}/api/v1/order/${product_id}`)
      .then(function (res) {
        alert(`Data ${nameProduct} deleted success `)
        this.setState({
          itemCart: this.state.itemCart
        })
      })
      .catch((error) => {
        console.log(error);
      })
}
  render() {
    const {navigate} = this.props.navigation;
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
              renderItem={({ item }) => (

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
                        onPress={ () => this.deleteCartItem(item.product_id, item.nameProduct) } style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="close" style={{color:'#E91E63'}}/>
                      </Button>
                    </Right>
                  </CardItem>

                  <CardItem>
                  <Left>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Button success small style={{ width: 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'#E91E63' }}>
                      <Text>-</Text>
                    </Button>
                    <View style={{ marginLeft: 8, marginTop: -11 }}>
                      <Input placeholder={`${item.qty}`} style={{ justifyContent: 'center', alignItems: 'center' }} disabled />
                    </View>
                    <Button success small style={{ width: 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'#E91E63' }}>
                      <Text>+</Text>
                    </Button>
                  </View>
                  </Left>
                  <Body style={{ marginRight: -50 }}>
                    <Text style={{fontWeight:'bold'}}>Sub Total:Rp. {this.formatPrice(item.price)}</Text>
                  </Body>
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
