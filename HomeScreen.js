import React, { Component } from 'react';
import {StyleSheet, Alert, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';
import {product} from './components/Data'

export default class HomeScreen extends Component {

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
            <View style={{position:'absolute', height:25, width: 20, borderRadius:25, backgroundColor:'#E91E63', right:30, bottom: 15, alignItems:'center', justifyContent:'center', zIndex:2000}}>
              <Text style={{color:'white', fontWeight: 'bold'}}>0</Text>
            </View>
            <Button transparent onPress={() => this.props.navigation.navigate("ListCart")}>
            <Icon name="ios-cart"/>
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
            renderItem={({item}) =>
            <View style={{paddingLeft:30, paddingRight: 30}}>
            <Card>
              <CardItem>
                <Left>
                  <Text>{item.nameProduct}</Text>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: item.imageHolder}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
              <CardItem>
                <Left>
                <Text>Rp {item.priceHolder}</Text>
                </Left>
                <Right>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate(item.navProduct, {
                    imageHolder: item.imageHolder, nameProduct: item.nameProduct, priceHolder: item.priceHolder
                  })}>
                  <Text style={{color: '#E91E63'}}>Detail</Text>
                  </TouchableOpacity>
                </Right>
              </CardItem>
            </Card>
            </View>
          }
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
