import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card } from 'native-base';
import { withNavigation } from "react-navigation";

import EmptyCart from "./components/EmptyCart";
import Cart from "./components/Cart";

class ListCart extends Component {
  constructor(props) {
        super(props);

        this.state = {
            totalPrice: 0,
            itemDetail: [],
        };
    }
    componentDidMount(){
        // this.addData();

        this.props.navigation.addListener("willFocus", route => {
            this.addData();
        })
    }
    addData() {
        const { navigation } = this.props;
        const imageHolder = navigation.getParam("imageHolder", "");
        const nameProduct = navigation.getParam("nameProduct", "");
        const priceHolder = navigation.getParam("priceHolder", "");
        const key = navigation.getParam("key", "");
        const quantity = navigation.getParam("quantity","");
        // alert(key);
        if (key !== "") {
            // alert(key);
            const findKey = this.state.itemDetail.findIndex((val,i)=>{
                return val.key === key;
            });

            if(findKey === -1){
                this.setState({
                    itemDetail: [
                        ...this.state.itemDetail,
                        {
                            key: key,
                            imageHolder: imageHolder,
                            nameProduct: nameProduct,
                            priceHolder: priceHolder,
                            quantity: quantity
                        }
                    ]
                });
            }

        }
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
    let totalPrice = 0;
    this.state.itemDetail.forEach((item) => {
      totalPrice += item.quantity * item.priceHolder;
    })
    const {navigate} = this.props.navigation;

        if (this.state.itemDetail.length < 1) {
            return (
                <EmptyCart />
            );
        } else {

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
              data={this.state.itemDetail}
              renderItem={({item}) =>(

                <Cart
                    nameProduct={item.nameProduct}
                    priceHolder={item.priceHolder}
                    imageHolder={item.imageHolder}
                    navProduct={item.navProduct}
                    quantity={item.quantity}
                    key={item.key}

                    getDelete={(index) => {
                        this.state.itemDetail.splice(index, 1);
                        this.setState({ itemDetail: this.state.itemDetail})
                    }}
                />
              )}

            keyExtractor={(item, index) => index.toString()}
            />

            <Card>
              <CardItem>
              <Left>
                  <Text style={styles.textTotal}>Total</Text>
              </Left>
              <Right>
                <Text style={styles.textPrice}>Rp. {this.formatPrice(totalPrice)}</Text>
              </Right>
              </CardItem>
            <CardItem>
            <Button style={{width:320, backgroundColor:'#E91E63'}} onPress={() => {this.props.navigation.navigate('Checkout', { totalPrice: totalPrice });}}>
              <Text style={{left:130, color:'white'}}>Checkout</Text>
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
    fontSize: 18
  },
  textPrice: {
    color: '#E91E63',
    fontSize: 18
  },
  textTotal: {
    fontWeight: 'bold',
    fontSize: 18
  },
  starColor: {
    color: 'orange'
  },
  footer: {
    backgroundColor: 'white',
  }
  });
  export default withNavigation(ListCart);