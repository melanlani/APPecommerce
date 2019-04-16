import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';
import axios from 'axios';
import { connect } from 'react-redux';
import { getDetail } from '../redux/actions/products';

class ProductDetail extends Component {

  componentDidMount(){
    const { navigation } = this.props;
    const id = navigation.getParam("id", "");
    this.props.getDetailDispatch(id)
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
    return (
      <Container>
        <Content>

        <Card>
          <CardItem>
          </CardItem>
          <CardItem>

          {
            this.props.products.productImage !== '' ? (
            <Image source={{uri: `${this.props.products.productImage }`}} style={{height: 320, flex: 1}}/>
          ) : (
            <Text>loading....</Text>
          )
          }

          </CardItem>
          <CardItem>
          <Left>
            <Text style={styles.textProduct}>{this.props.products.productName}</Text>
          </Left>
          <Right>
            <Text style={styles.textPrice}>Rp {this.props.products.productPrice}/pcs</Text>
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
        </Card>

        <Card>
          <CardItem header>
            <Text style={styles.textProduct}>Description</Text>
          </CardItem>
          <CardItem>
              <Body>
                <Text>
                  {this.props.products.description}
                </Text>
              </Body>
            </CardItem>
          <Card>
            <CardItem>
            <Button active style={{width:320, backgroundColor:'#E91E63'}}
            onPress={() => {
              const baseUrl = "http://192.168.43.192:3333";
              axios.post(`${baseUrl}/api/v1/order`, {
                      product_id: this.props.products.productId,
                      qty: this.props.products.quantity,
                      price: this.props.products.productPrice
              })
                .then(function (response) {
                  console.log(response);

                })
                .catch(function (error) {
                  console.log(error);
                });
                this.props.navigation.navigate("ListCart", {
                  product_id: this.props.products.productId
                });
            }}>
              <Text style={{left:130, color:'white'}}>Add to Cart</Text>
            </Button>
            </CardItem>
          </Card>
        </Card>

        </Content>
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

  const mapStateToProps = state => ({
    products : state.products
  })

  const mapDispatchToProps = dispatch => {
    return {
      getDetailDispatch : (id) => {
        dispatch(getDetail(id))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);