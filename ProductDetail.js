import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';

export default class ProductDetail extends React.Component {
  static navigationOptions = {
    title: 'Detail Product',
  };
  constructor(props) {
    super(props);
      const { imageHolder, nameProduct, priceHolder } = props.navigation.state.params;

      this.state = {
        count : 1,

        product: {
          imageHolder,
          nameProduct,
          priceHolder
        }
      }
  }
  

  render() {
    const { imageHolder, nameProduct, priceHolder } = this.state.product;
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
            <Image source={{uri: imageHolder}} style={{height: 300, width: null, flex: 1}}/>
          </CardItem>
          <CardItem>
            <Icon name='star' style={styles.starColor} /><Icon name='star' style={styles.starColor}/>
            <Icon name='star' style={styles.starColor}/><Icon name='star' style={styles.starColor} />
            <Icon name='star-half' style={styles.starColor} />
          </CardItem>
          <CardItem>
            <Text style={styles.textProduct}>{nameProduct}</Text>
          </CardItem>
          <CardItem>
          <Left>
            <Text style={styles.textPrice}>Rp {priceHolder}</Text>
          </Left>
          <Right>
          <Text>Quantity</Text>
          <Button info title="+" onPress={() => this.setState({ count: this.state.count +1})} style={{width:20, height:30}}>
            <Text>  +</Text>
          </Button>
          <Text>{this.state.count}</Text>
          <Button info onPress={() => this.setState({ count: this.state.count -1})} style={{width:20, height:30}}>
            <Text>  -</Text>
          </Button>
          </Right>
          </CardItem>
        </Card>

        <Footer>
          <FooterTab style={styles.footer}>
            <Button vertical>
              <Icon name="chatboxes" />
            </Button>
            <Button active style={styles.header} onPress={() => this.props.navigation.navigate('ListCart', {
              imageHolder: imageHolder, nameProduct: nameProduct, priceHolder: priceHolder, quantity: this.state.count
            })}>
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
