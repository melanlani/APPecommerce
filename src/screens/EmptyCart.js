import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container,Header,Left,Body,Right,Button,Icon,Title } from 'native-base';

class EmptyCart extends Component {
  render() {
    return (

      <Container >
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
          </Right>
        </Header>
        <View style={styles.viewIcon}>
          <Icon style={styles.iconCart} name="cart" position="bottomRight" />
          <Text style={styles.txtCart}>Cart Still Empty</Text>
        </View>
      </Container>
    );
  }
}

export default EmptyCart;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E91E63',
  },
  viewIcon: {
    justifyContent: "center",
    alignItems: "center",
    flex:1
  },
  iconCart: {
    color: "#E91E63",
    fontSize: 200
  },
  txtCart: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'black'
  }
  });
