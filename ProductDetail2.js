import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';

export default class ProductDetail2 extends React.Component {
  static navigationOptions = {
    title: 'Detail Product',
  };
  constructor (){
    super();
    this.state = {
      image2Holder: 'https://s4.bukalapak.com/img/4842381758/s-160-160/609114_081a450a_45d9_46b6_964a_d3b48fda20e4.png',
      name2Product: 'Atasan Wanita Maroon',
      price2Holder: '79000'
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
            <Image source={{uri: this.state.image2Holder}} style={{height: 300, width: null, flex: 1}}/>
          </CardItem>
          <CardItem>
            <Icon name='star' style={styles.starColor} /><Icon name='star' style={styles.starColor}/>
            <Icon name='star' style={styles.starColor}/><Icon name='star' style={styles.starColor} />
            <Icon name='star-half' style={styles.starColor} />
          </CardItem>
          <CardItem>
            <Text style={styles.textProduct}>{this.state.name2Product}</Text>
          </CardItem>
          <CardItem>
          <Left>
            <Text style={styles.textPrice}>Rp {this.state.price2Holder}</Text>
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
