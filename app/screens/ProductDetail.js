import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';
import axios from 'axios';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

      this.state = {
        productId: '',
        productImage: '',
        productName: '',
        productPrice: '',
        description: '',
        quantity: 1
      }
  }

  componentDidMount() {
    //memanggil id produk dari list produk
    const { navigation } = this.props;
    const id = navigation.getParam("id", "");
    const baseUrl = "http://192.168.43.192:3333";

    axios.get(`${baseUrl}/api/v1/products/${id}`)
    //mengambil data state dari database
    .then((response) => {
      const res = response.data.data;
      this.setState({
        productId: res.id,
        productImage: res.imageHolder,
        productName: res.nameProduct,
        productPrice: res.priceHolder,
        description: res.description,
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


  render() {
    return (
      <Container>
        <Content>

        <Card>
          <CardItem>
          </CardItem>
          <CardItem>
            <Image source={{uri: `${this.state.productImage}`}} style={{height: 320, flex: 1}}/>
          </CardItem>
          <CardItem>
          <Left>
            <Text style={styles.textProduct}>{this.state.productName}</Text>
          </Left>
          <Right>
            <Text style={styles.textPrice}>Rp {this.formatPrice(this.state.productPrice)} /pcs</Text>
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
                  {this.state.description}
                </Text>
              </Body>
            </CardItem>
          <Card>
            <CardItem>
            <Button active style={{width:320, backgroundColor:'#E91E63'}}
            onPress={() => {
                        const baseUrl = "http://192.168.43.192:3333";
                        axios.post(`${baseUrl}/api/v1/order`, {
                                product_id: this.state.productId,
                                qty: this.state.quantity,
                                price: this.state.productPrice
                            })
                            .then(function (response) {
                              alert('Product added successfully ')
                              console.log(response)

                            })
                            .catch(function (error) {
                              console.log(error);
                            });
                            this.props.navigation.navigate("ListCart");
                    }}

              >
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
