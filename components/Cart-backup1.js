import React, { Component } from 'react';
import {StyleSheet, Alert, Image, Text, TextInput, View, TouchableOpacity, FlatList} from 'react-native';
import { Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  CardItem,
  Card,
  Col,
  Row,
  Grid,
  List,
  ListItem,
  Thumbnail,
  Input
} from 'native-base';

class Cart extends Component {
  constructor(props) {
    super(props);

      this.state = {
        count : this.props.quantity,
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

  handlePlus= () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  handleMinus= () => {
    if(this.state.count > 0) {
      this.setState({
        count:this.state.count - 1
      })
    }
  }

  render() {
    const {id, imageHolder, nameProduct, priceHolder, quantity, getDelete} = this.props;
    let total = 0;
    total += this.state.count * priceHolder;
    return (

            <List key={id}>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={imageHolder } />
              </Left>
              <Body>
                <Text style={styles.textProduct}>{nameProduct}</Text>
                <Text note numberOfLines={1}>Rp {this.formatPrice(priceHolder)}</Text>
                  <View style={{flex: 1, flexDirection: 'row', paddingTop:4}}>
                    <Button info onPress={this.handleMinus} style={{width:20, height:30, backgroundColor:'#E91E63'}}>
                      <Text>   -</Text>
                    </Button>
                    <Text style={styles.textQuantity}>  {this.state.count}  </Text>
                    <Button info title="+" onPress={this.handlePlus} style={{width:20, height:30, backgroundColor:'#E91E63'}}>
                      <Text>  +</Text>
                    </Button>
                  </View>
              </Body>
              <Right>
                <Button transparent onPress={getDelete.bind(this,id)}>
                  <Icon name='trash' style={{color:'#E91E63'}}/>
                </Button >
              </Right>
            </ListItem>
            <ListItem>
              <Text style={styles.textPrice}>Rp. {this.formatPrice(total)}</Text>
            </ListItem>
          </List>

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
    fontWeight: 'bold',
    fontSize: 14,
    left: 220
  },
  textQuantity: {
    color: 'black',
    fontSize: 16
  },
  textProduct: {
    fontWeight: 'bold',
    fontSize: 15
  }
  });
export default Cart;
