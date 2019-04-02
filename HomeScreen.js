import React, { Component } from 'react';
import {StyleSheet, Alert, Image, Text, View, TouchableOpacity} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome Shopping',
  };
  constructor (){
    super();
    this.state = {
      imageHolder: 'https://s3.bukalapak.com/img/8660752382/s-160-160/BajuAtasanTunikKattyBlouseBajuMuslimBlusMuslimNavy_1_scaledj.jpg',
      image2Holder: 'https://s4.bukalapak.com/img/4842381758/s-160-160/609114_081a450a_45d9_46b6_964a_d3b48fda20e4.png',
      image3Holder: 'https://s4.bukalapak.com/img/4125871758/s-160-160/Flies___Denim_Shirt_2648___Biru.jpg',
      image4Holder: 'https://s1.bukalapak.com/img/6434710082/s-160-160/BajuAtasanWanitaHannyTunikBlouseBajuMuslimBlusMuslim_1_scale.jpg'
    }
  }

  render() {

    return (
      <Container>
        <Header style={styles.header}>
        <Left>
          <Button transparent onPress={this._onPressButton}>
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

          <Image source={{uri: 'https://s4.bukalapak.com/uploads/flash_banner/45483/mobile/s-960-390/Banner_Mobilerzkpesta.jpg'}} style={{height: 170 ,width: '100%', resizeMode: 'contain'}}/>

          <Grid>
          <Col>
          <Card>
            <CardItem>
              <Left>
                <Text>Baju Gamis</Text>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: this.state.imageHolder}} style={{height: 120, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
              <Text>Rp 62.000</Text>
              </Left>
              <Right>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail')}>
                <Text style={{color: '#E91E63'}}>Detail</Text>
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
          </Col>

          <Col>
          <Card>
            <CardItem>
              <Left>
                <Text>Atasan Wanita Maroon</Text>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: this.state.image2Holder}} style={{height: 120, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
              <Text>Rp 79.000</Text>
              </Left>
              <Right>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail2')}>
                <Text style={{color: '#E91E63'}}>Detail</Text>
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
          </Col>
          </Grid>

          <Grid>
          <Col>
          <Card>
            <CardItem>
              <Left>
                <Text>Denim Shirt</Text>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: this.state.image3Holder}} style={{height: 120, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
              <Text>Rp 329.000</Text>
              </Left>
              <Right>
                <TouchableOpacity>
                <Text style={{color: '#E91E63'}}>Detail</Text>
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
          </Col>
          <Col>
          <Card>
            <CardItem>
              <Left>
                <Text>Baju Atasan Gloria</Text>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: this.state.image4Holder}} style={{height: 120, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
              <Text>Rp 81.000</Text>
              </Left>
              <Right>
                <TouchableOpacity>
                <Text style={{color: '#E91E63'}}>Detail</Text>
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
          </Col>
          </Grid>




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
