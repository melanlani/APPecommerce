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

import EmptyCart from "./EmptyCart";

class ListCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCart: [],
    }
  }

  componentWillMount() {
    this.props.navigation.addListener("willFocus", route => {
      const { navigation } = this.props;
      const imageHolder = navigation.getParam("imageHolder", "");
      const nameProduct = navigation.getParam("nameProduct", "");
      const priceHolder = navigation.getParam("priceHolder", "");
      const key = navigation.getParam("key", "");

      if (key !== undefined) {
        const findKey = this.state.itemCart.findIndex((val, i) => {
          return val.key === key;
        });
        if (findKey === -1) {
          let itemCart = this.state.itemCart;
          itemCart.push({
            key: key,
            imageHolder: imageHolder,
            nameProduct: nameProduct,
            priceHolder: priceHolder,
            quantity: 1,
            sub_total_priceHolder: priceHolder
          });

          const total1 = this.state.itemCart.map(item => item.sub_total_priceHolder)
          const total2 = this.totalFormula(total1)
          this.setState({
            itemCart: itemCart,
            total_price: total2
          })
        }
      }
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
  getDelete = (index) => {
      this.state.itemCart.splice(index, 1);

      this.forceUpdate()

      const total1 = this.state.itemCart.map(item => item.sub_total_priceHolder)
      const total2 = this.totalFormula(total1)
      this.setState({ itemCart: this.state.itemCart, total_price: total2})
  }

  handlePlus = (index) => {
    this.state.itemCart[index].quantity = this.state.itemCart[index].quantity+1
    this.state.itemCart[index].sub_total_priceHolder = parseInt(this.state.itemCart[index].quantity, 10)*parseInt(this.state.itemCart[index].priceHolder, 10)
    this.forceUpdate()

    const total1 = this.state.itemCart.map(item => item.sub_total_priceHolder)
    const total2 = this.totalFormula(total1)
    this.setState({
      total_price: total2
    })
  }

  handleMin = (index) => {
    if(this.state.itemCart[index].quantity > 1) {
    this.state.itemCart[index].quantity = this.state.itemCart[index].quantity-1
    this.state.itemCart[index].sub_total_priceHolder = parseInt(this.state.itemCart[index].quantity, 10)*parseInt(this.state.itemCart[index].priceHolder, 10)
    this.forceUpdate()

    const total1 = this.state.itemCart.map(item => item.sub_total_priceHolder)
    const total2 = this.totalFormula(total1)
    this.setState({
      total_price: total2
    })
  }
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
              style={{ flex: 1 }}
              data={this.state.itemCart}
              renderItem={({ item, index }) => (
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
                      <Button transparent small onPress={this.getDelete.bind(this,index)} style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="close" style={{color:'#E91E63'}}/>
                      </Button>
                    </Right>
                  </CardItem>
                  <CardItem>
                  <Left>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Button success small onPress={ () => this.handleMin(index) } style={{ width: 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'#E91E63' }}>
                      <Text>-</Text>
                    </Button>
                    <View style={{ marginLeft: 8, marginTop: -11 }}>
                      <Input placeholder={`${item.quantity}`} style={{ justifyContent: 'center', alignItems: 'center' }} disabled />
                    </View>
                    <Button success small onPress={ () => this.handlePlus(index) } style={{ width: 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'#E91E63' }}>
                      <Text>+</Text>
                    </Button>
                  </View>
                  </Left>
                  <Body style={{ marginRight: -90 }}>
                    <Text style={{fontWeight:'bold'}}>Sub Total: {this.formatPrice(item.sub_total_priceHolder)}</Text>
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
                <Text style={styles.textPrice}>Rp. {this.formatPrice(this.state.total_price)} </Text>
              </Right>
              </CardItem>
            <CardItem>
            <Button style={{width:320, backgroundColor:'#E91E63'}} onPress={() => {this.props.navigation.navigate('Checkout', {
                        totalPrice: this.state.total_price
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
