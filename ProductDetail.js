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
            <Image source={imageHolder} style={{height: 320, width: null, flex: 1}}/>
          </CardItem>
          <CardItem>
          <Left>
            <Text style={styles.textProduct}>{nameProduct}</Text>
          </Left>
          <Right>
            <Text style={styles.textPrice}>Rp {priceHolder} /pcs</Text>
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
            <Text>>100</Text>
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
          <Left>
            <Text style={styles.textProduct}>Quantity </Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
            <Button info onPress={() => this.setState({ count: this.state.count -1})} style={{width:20, height:30, backgroundColor:'#E91E63'}}>
              <Text>   -</Text>
            </Button>
            <Text style={styles.textProduct}>  {this.state.count}  </Text>
            <Button info title="+" onPress={() => this.setState({ count: this.state.count +1})} style={{width:20, height:30, backgroundColor:'#E91E63'}}>
              <Text>  +</Text>
            </Button>
            </View>
          </Left>
          <Right>
          <Button active style={{backgroundColor:'#E91E63', width:80}}
              onPress={() => {this.props.navigation.navigate('ListCart', {
                key: key,
                imageHolder: imageHolder,
                nameProduct: nameProduct,
                priceHolder: priceHolder,
                quantity: this.state.count,
                totalPrice: priceHolder * this.state.count
              });
            }}>
            <Text style={{color:'white', left:9}}>Add to Cart</Text>
          </Button>
          </Right>
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
    fontSize: 18
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
