import React, { Component } from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab, Badge } from 'native-base';
export default class App extends Component {
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

        <Image source={{uri: 'https://s4.bukalapak.com/uploads/flash_banner/45483/mobile/s-960-390/Banner_Mobilerzkpesta.jpg'}} style={{height: 200, width: 500}}/>
        <Card>
        <CardItem>
        <Grid>
          <Col style={{ height: 50 }}><Icon active name="logo-googleplus" /><Text>Google Plus</Text></Col>
          <Col style={{ height: 50 }}><Icon active name="logo-facebook" /><Text>Facebook</Text></Col>
          <Col style={{ height: 50 }}><Icon active name="logo-twitter" /><Text>Twitter</Text></Col>
          <Col style={{ height: 50 }}><Icon active name="logo-youtube" /><Text>Youtube</Text></Col>
        </Grid>
        </CardItem>
      </Card>

      <View style={styles.footer}>
      <Text> &copy; Copyright by Melan </Text>
      </View>
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
  footer: {
    backgroundColor: '#E91E63',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  });
