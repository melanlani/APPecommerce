import React, { Component } from 'react';
import {StyleSheet, Alert, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Input, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';
import Product from "./Product";
import { connect } from 'react-redux';
import { getProduct } from '../redux/actions/products';

class HomeScreen extends Component {

  componentDidMount(){
    this.props.getProductDispatch()
  }

  render() {

    return (
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
        <Content>
          <Image source={require('./assets/banner.jpg')} style={{height: 170 ,width: '100%', resizeMode: 'contain'}}/>

          <Card>
            <CardItem>
            <Text style={{fontWeight: 'bold'}}>List Product</Text>
            </CardItem>
          </Card>

          <FlatList
            data={this.props.products.products}
            numColumns={2}
            renderItem={({item}) =>(
              <Product
                  // _onPress={this._onPress}
                  productName={item.nameProduct}
                  productPrice={item.priceHolder}
                  productImage={item.imageHolder}
                  description={item.description}
                  productID={item.id}
                  getDetails={() => {
                      this.props.navigation.navigate('Detail', {
                          id: item.id
                      });
                  }}
              />
            )}

          keyExtractor={(item, index) => index.toString()}
          />
        </Content>

      </Container>
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
  });

  const mapStateToProps = state => ({
    products : state.products
  })

  const mapDispatchToProps = dispatch => {
    return {
      getProductDispatch: () => {
      dispatch(getProduct())
    }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
