import React, { Component } from 'react';
import {StyleSheet, Alert, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';

class Product extends Component {

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

    return (

        <Grid>
          <Col style={{ height: 250 }}>
            <TouchableOpacity onPress={this.props.getDetails}>
            <Card>
              <CardItem>
                <Left>
                  <Text>{this.props.nameProduct}</Text>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={this.props.imageHolder} style={{height: 150, width: 175}}/>
              </CardItem>
              <CardItem>
                <Text style={styles.textPrice}>Rp {this.formatPrice(this.props.priceHolder)}</Text>
              </CardItem>
            </Card>
            </TouchableOpacity>
          </Col>
        </Grid>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  header: {
  backgroundColor: '#E91E63',
  },
  textPrice: {
    color: '#E91E63',
    fontSize: 12
  }
  });
export default Product;
