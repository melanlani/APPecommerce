import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button, CardItem, Card } from 'native-base';
import axios from 'axios';
import { baseUrl } from '../redux/actions/api';
import { connect } from 'react-redux';
import { getDetail } from '../redux/actions/products_detail';
import { addItemCart } from '../redux/actions/orders';

class ProductDetail extends Component {

  componentDidMount(){
    const { navigation } = this.props;
    const id = navigation.getParam("id", "");
    this.props.getDetailDispatch(id)
  }

  render() {
    const { productImage, productName, productPrice, productId, description, quantity, pending } = this.props.products_detail;
    if (pending) {
      return(
        <View style={styles.viewPending}>
          <ActivityIndicator color="#E91E63" size="large"  />
        </View>
      )
    }
    else {

      return (
        <Container>
          <Content>

            <Card>
              <CardItem>
              {
                productImage !== '' ? (
                <Image source={{uri: `${productImage }`}} style={styles.prodImage}/>
              ) : (
                <Text>loading....</Text>
              )
              }
              </CardItem>
              <CardItem>
              <Left>
                <Text style={styles.textProduct}>{productName}</Text>
              </Left>
              <Right>
                <Text style={styles.textPrice}>Rp. {productPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}/pcs</Text>
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
                    {description}
                  </Text>
                </Body>
              </CardItem>
              <Card>
                <CardItem>
                  <Button active style={styles.btnCart}
                  onPress={() => {
                      this.props.addItemCartDispatch(productId, productPrice)
                      this.props.navigation.navigate("ListCart");
                  }}>
                    <Text style={styles.txtBtnCart}>Add to Cart</Text>
                  </Button>
                </CardItem>
              </Card>
            </Card>

          </Content>
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
      fontSize: 16
    },
    textPrice: {
      color: '#E91E63',
      fontSize: 16
    },
    viewPending: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#E91E63'
    },
    prodImage : {
      height: 320,
      flex: 1
    },
    txtBtnCart: {
      left:130,
      color:'white'
    },
    btnCart: {
      width:320,
      backgroundColor:'#E91E63'
    }
    });

  const mapStateToProps = state => ({
    products_detail : state.products_detail
  })

  const mapDispatchToProps = dispatch => {
    return {
      getDetailDispatch : (id) => {
        dispatch(getDetail(id))
      },
      addItemCartDispatch: (productId, productPrice) => {
        dispatch(addItemCart(productId, productPrice))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
