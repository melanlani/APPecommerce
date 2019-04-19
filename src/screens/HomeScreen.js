import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { Container, Drawer, Content, Header, Left, Body, Right, Button, Icon, Title, CardItem, Card} from 'native-base';
import Product from "./Product";
import { connect } from 'react-redux';
import { getProduct } from '../redux/actions/products';

import SideBar from './SideBar';

class HomeScreen extends Component {

  componentDidMount(){
    this.props.getProductDispatch()
  }


  closeDrawer () {
    this._drawer._root.close()
  }
  openDrawer () {
    this._drawer._root.open()
  }

  render() {

    const { products, pending } = this.props.products;
    if (pending) {
      return(
        <View style={styles.viewPending}>
          <ActivityIndicator color="#E91E63" size="large"  />
        </View>
      )
    }
    else {
      return (

        <Drawer ref={(ref) => { this._drawer = ref; }}
          content={<SideBar navigator={this._navigator} />}
          onClose={() => this.closeDrawer()} >

        <Container>
          <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.openDrawer()}>
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
            <Image source={require('./assets/banner.jpg')} style={styles.banner}/>

            <Card>
              <CardItem>
              <Text style={{fontWeight: 'bold'}}>List Product</Text>
              </CardItem>
            </Card>

            <FlatList
              data={products}
              numColumns={2}
              renderItem={({item}) =>(
                <Product
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
        </Drawer>

      );
    }
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
  viewPending: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#E91E63'
  },
  banner: {
    height: 170 ,
    width: '100%',
    resizeMode: 'contain'
  }

});

  const mapStateToProps = state => ({
    products : state.products
  })

  const mapDispatchToProps = dispatch => {
    return {
      getProductDispatch: () => {
      dispatch(getProduct())
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
