import React, { Component } from 'react';
import {StyleSheet, Alert, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome Shopping',
  };
  constructor (){
    super();
    this.state = {
      imageHolder: 'https://s3.bukalapak.com/img/8660752382/s-160-160/BajuAtasanTunikKattyBlouseBajuMuslimBlusMuslimNavy_1_scaledj.jpg',
      nameProduct: 'Baju Gamis',
      priceHolder: '62000',
      image2Holder: 'https://s4.bukalapak.com/img/4842381758/s-160-160/609114_081a450a_45d9_46b6_964a_d3b48fda20e4.png',
      name2Product: 'Atasan Wanita Maroon',
      price2Holder: '79000',
      image3Holder: 'https://s4.bukalapak.com/img/4125871758/s-160-160/Flies___Denim_Shirt_2648___Biru.jpg',
      name3Product: 'Denim Shirt',
      price3Holder: '329000',
      image4Holder: 'https://s1.bukalapak.com/img/6434710082/s-160-160/BajuAtasanWanitaHannyTunikBlouseBajuMuslimBlusMuslim_1_scale.jpg',
      name4Product: 'Baju Atasan Gloria',
      price4Holder: '81000'
    }
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
            <Button transparent onPress={() => this.props.navigation.navigate("Cart")}>
              <Icon name="cart" />
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
            data={[
              {imageHolder: this.state.imageHolder,
                nameProduct: this.state.nameProduct, priceHolder: this.state.priceHolder, navProduct: 'Detail' },
              {imageHolder: this.state.image2Holder,
                nameProduct: this.state.name2Product, priceHolder: this.state.price2Holder, navProduct: 'Detail' },
              {imageHolder: this.state.image3Holder,
                nameProduct: this.state.name3Product, priceHolder: this.state.price3Holder, navProduct: 'Detail' },
              {imageHolder: this.state.image4Holder,
                nameProduct: this.state.name4Product, priceHolder: this.state.price4Holder, navProduct: 'Detail' },
            ]}
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
