import React, { Component } from 'react';
import {StyleSheet, Alert, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';
import {product} from './components/Data'
import Product from "./components/Product";

class HomeScreen extends Component {

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

          <Image source={{uri: 'https://s4.bukalapak.com/uploads/flash_banner/45483/mobile/s-960-390/Banner_Mobilerzkpesta.jpg'}} style={{height: 170 ,width: '100%', resizeMode: 'contain'}}/>
          <Card>
            <CardItem>
            <Text style={{fontWeight: 'bold'}}>List Product</Text>
            </CardItem>
          </Card>

          <FlatList
            data={product}
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
