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
      subtotal: 0
    }
  }

  componentDidMount() {
    //memanggil id produk dari list produk

    axios.get('http://192.168.43.192:3333/api/v1/orders/20')
    //mengambil data state dari database
    .then((res) => {
      this.setState({
        itemCart: res.data.data
      })


    })
    .catch((error) => {
      console.log(error);
    })
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

  render() {
    const {navigate} = this.props.navigation;

        if (this.state.itemCart.length < 1) {
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
              renderItem={({ item }) => (
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail square source={{uri: item.imageHolder}} />
                      <Body>
                        <Text style={styles.textProduct}>{ item.nameProduct }</Text>
                        <Text note>{this.formatPrice(item.priceHolder)}/pcs</Text>
                      </Body>
                    </Left>
                    <Right>
                      <Button transparent small
                      onPress={() =>{
                        axios.delete(`http://192.168.43.192:3333/api/v1/order/${item.id}`)
                      }}
                      style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
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
                  <Body style={{ marginRight: -90 }}>
                    <Text style={{fontWeight:'bold'}}>Sub Total: {item.price}</Text>
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
                <Text style={styles.textPrice}>Rp.  </Text>
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
