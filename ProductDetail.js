import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';

export default class ProductDetail extends React.Component {
  static navigationOptions = {
    title: 'Detail Product',
  };
  constructor (){
    super();
    this.state = {
      imageHolder: 'https://s3.bukalapak.com/img/8660752382/s-160-160/BajuAtasanTunikKattyBlouseBajuMuslimBlusMuslimNavy_1_scaledj.jpg'
    }
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
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
            <Button transparent>
              <Icon name="cart" />
            </Button>
          </Right>
        </Header>

        <Card>
          <CardItem>
          </CardItem>
          <CardItem cardBody>
            <Image source={{uri: this.state.imageHolder}} style={{height: 300, width: null, flex: 1}}/>
          </CardItem>
          <CardItem>
            <Icon name='star' style={styles.starColor} /><Icon name='star' style={styles.starColor}/>
            <Icon name='star' style={styles.starColor}/><Icon name='star' style={styles.starColor} />
            <Icon name='star-half' style={styles.starColor} />
          </CardItem>
          <CardItem>
            <Text style={styles.textProduct}>Baju Gamis</Text>
          </CardItem>
          <CardItem>
          <Left>
            <Text style={styles.textPrice}>Rp 62.000</Text>
          </Left>
          <Right>
            <Text>Stock >100psc</Text>
          </Right>
          </CardItem>
        </Card>

        <Footer>
          <FooterTab style={styles.footer}>
            <Button vertical>
              <Icon name="chatboxes" />
            </Button>
            <Button active style={styles.header}>
              <Text>Beli</Text>
            </Button>
            <Button vertical>
              <Text>Nego di App</Text>
            </Button>
          </FooterTab>
        </Footer>
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
    color: 'orange'
  },
  footer: {
    backgroundColor: 'white',
  }
  });
