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
      productId: '',
      productImage: '',
      productName: '',
      productPrice: '',
      quantity: 1
    }
  }

  componentDidMount() {
    //memanggil id produk dari list produk
    const { navigation } = this.props;
    const productId = navigation.getParam("productId", "");
    const baseUrl = "http://192.168.43.192:3333";

    axios.get(`${baseUrl}/api/v1/products/${productId}`)
    //mengambil data state dari database
    .then((response) => {
      const res = response.data.data;
      this.setState({
        productId: res.productId,
        productImage: res.imageHolder,
        productName: res.nameProduct,
        productPrice: res.priceHolder
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

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
  // getDelete = (index) => {
  //     this.state.itemCart.splice(index, 1);
  //     this.setState({ itemCart: this.state.itemCart, total_price: total2})
  // }

  handlePlus= () => {
    this.setState({
      quantity: this.state.quantity + 1
    })
  }

  handleMinus= () => {
    if(this.state.quantity > 0) {
      this.setState({
        quantity:this.state.quantity - 1
      })
    }
  }

  render() {
    let subTotal = 0;
    subTotal += this.state.quantity * this.state.productPrice;

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

            <Card>
              <CardItem>
                <Left>
                  <Thumbnail square source={{uri: this.state.productImage}} />
                  <Body>
                    <Text style={styles.textProduct}>{this.state.productName }</Text>
                    <Text note>{this.formatPrice(this.state.productPrice)}/pcs</Text>
                  </Body>
                </Left>
                <Right>
                  <Button transparent small style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="close" style={{color:'#E91E63'}}/>
                  </Button>
                </Right>
              </CardItem>
              <CardItem>
              <Left>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Button success small onPress={this.handleMinus } style={{ width: 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'#E91E63' }}>
                  <Text>-</Text>
                </Button>
                <View style={{ marginLeft: 8, marginTop: -11 }}>
                  <Input placeholder={`${this.state.quantity}`} style={{ justifyContent: 'center', alignItems: 'center' }} disabled />
                </View>
                <Button success small onPress={this.handlePlus } style={{ width: 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'#E91E63' }}>
                  <Text>+</Text>
                </Button>
              </View>
              </Left>
              <Body style={{ marginRight: -90 }}>
                <Text style={{fontWeight:'bold'}}>Sub Total: {this.formatPrice(subTotal)}</Text>
              </Body>
              </CardItem>
            </Card>

            <Card>
              <CardItem>
              <Left>
                  <Text style={styles.textTotal}>Total</Text>
              </Left>
              <Right>
                <Text style={styles.textPrice}>Rp. </Text>
              </Right>
              </CardItem>
            <CardItem>
            <Button style={{width:320, backgroundColor:'#E91E63'}} onPress={() => {this.props.navigation.navigate('Checkout');}}>
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
