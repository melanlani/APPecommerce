import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

      this.state = {
        count : 1,
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
    const { navigation } = this.props;
    const imageHolder = navigation.getParam("imageHolder", "No Image");
    const nameProduct = navigation.getParam("nameProduct", "No Product");
    const priceHolder = navigation.getParam("priceHolder", "No Price");
    const key = navigation.getParam("key", "");
    // alert(key);
    return (
      <Container>

        <Card>
          <CardItem>
          </CardItem>
          <CardItem>
            <Image source={{uri: imageHolder}} style={{height: 320, width: null, flex: 1}}/>
          </CardItem>
          <CardItem>
          <Left>
            <Text style={styles.textProduct}>{nameProduct}</Text>
          </Left>
          <Right>
            <Text style={styles.textPrice}>Rp {this.formatPrice(priceHolder)} /pcs</Text>
          </Right>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Text style={styles.textProduct}>Information</Text>
          </CardItem>
          <CardItem>
            <Left>
            <Text>Stock</Text>
            </Left>
            <Right>
            <Text>{`>100`}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left>
            <Text>Sold Out</Text>
            </Left>
            <Right>
            <Text>0</Text>
            </Right>
          </CardItem>
          <Card>
            <CardItem>
            <Button active style={{width:320, backgroundColor:'#E91E63'}}
                onPress={() => {this.props.navigation.navigate('ListCart', {
                  key: key,
                  imageHolder: imageHolder,
                  nameProduct: nameProduct,
                  priceHolder: priceHolder,
                  totalPrice: priceHolder * this.state.count
                });
              }}>
              <Text style={{left:130, color:'white'}}>Add to Cart</Text>
            </Button>
            </CardItem>
          </Card>
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
    fontSize: 18
  },
  textPrice: {
    color: '#E91E63',
    fontSize: 16
  },
  starColor: {
    color: 'orange',
    fontSize: 18
  },
  footer: {
    backgroundColor: 'white',
  }
  });
  export default ProductDetail;
