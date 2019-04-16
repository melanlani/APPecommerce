import React, { Component } from 'react';
import {StyleSheet, Alert, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container, Input, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card, Col, Row, Grid, Footer, FooterTab } from 'native-base';
import axios from 'axios';
import Product from "./Product";
import { connect } from 'react-redux';
import { incNumber } from '@redux/actions/contacts';

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount(){
    axios.get('http://192.168.43.192:3333/api/v1/products')
    .then((response) => {
      this.setState({
        products: response.data.data
      });
    })
    .catch((error) => {
      console.log(error);
    });

  }
  increment = () => {
    this.props.dispatch(incNumber());
      return console.error(this.props.count);
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
          <Image source={require('../assets/banner.jpg')} style={{height: 170 ,width: '100%', resizeMode: 'contain'}}/>
          <Card>
            <CardItem>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ marginLeft: 8, marginTop: -11 }}>
                <Input placeholder={this.props.count} style={{ justifyContent: 'center', alignItems: 'center' }} disabled />
              </View>
              <Button success small onPress={ this.increment } style={{ width: 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'#E91E63' }}>
                <Text>+</Text>
              </Button>
            </View>
            </CardItem>
          </Card>
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
                                productName={item.nameProduct}
                                productPrice={item.priceHolder}
                                productImage={item.imageHolder}
                                description={item.description}
                                productID={item.id}
                                getDetails={() => {
                                    this.props.navigation.navigate('Detail', {
                                        id: item.id
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

  const mapStateToProps = (state) =>{
    return {
      count: state.count
    };
  }

export default connect(mapStateToProps)(HomeScreen);
