import React, { Component } from 'react';
import {StyleSheet, Alert, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';
import Axios from 'axios';
import Product from "./Product";

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount(){
    Axios.get('http://192.168.43.192:3333/api/v1/products')
    .then((response) => {
      this.setState({
        products: response.data.data
      });
    })
    .catch((error) => {
      console.log(error);
    });

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
          <Image source={{uri: 'https://s4.bukalapak.com/uploads/flash_banner/45483/mobile/s-960-390/Banner_Mobilerzkpesta.jpg'}} style={{height: 170 ,width: '100%', resizeMode: 'contain'}}/>
          <Card>
            <CardItem>
            <Text style={{fontWeight: 'bold'}}>List Product</Text>
            </CardItem>
          </Card>

          <FlatList
            data={this.state.products}
            numColumns={2}
            renderItem={({item}) =>(
                            <Product
                                // _onPress={this._onPress}
                                nameProduct={item.nameProduct}
                                priceHolder={item.priceHolder}
                                imageHolder={item.imageHolder}
                                navProduct={item.navProduct}
                                key={item.key}
                                getDetails={() => {
                                    this.props.navigation.navigate(item.navProduct, {
                                        key: item.id,
                                        nameProduct: item.nameProduct,
                                        priceHolder: item.priceHolder,
                                        imageHolder: item.imageHolder,
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
export default HomeScreen;
