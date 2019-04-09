import React, { Component } from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  CardItem,
  Card,
  Col,
  Row,
  Grid,
  List,
  ListItem,
  Thumbnail,
  Input
} from 'native-base';
import { withNavigation } from "react-navigation";

import EmptyCart from "./components/EmptyCart";

class ListCart extends Component {
  constructor(props) {
        super(props);

        this.state = {
            count : 1,
            itemDetail: [],
        };
    }
    componentDidMount(){
        // this.addData();

        this.props.navigation.addListener("willFocus", route => {
            this.addData();
        })
    }
    addData() {
        const { navigation } = this.props;
        const imageHolder = navigation.getParam("imageHolder", "");
        const nameProduct = navigation.getParam("nameProduct", "");
        const priceHolder = navigation.getParam("priceHolder", "");
        const key = navigation.getParam("key", "");
        // alert(key);
        if (key !== "") {
            // alert(key);
            const findKey = this.state.itemDetail.findIndex((val,i)=>{
                return val.key === key;
            });

            if(findKey === -1){
                this.setState({
                    itemDetail: [
                        ...this.state.itemDetail,
                        {
                            key: key,
                            imageHolder: imageHolder,
                            nameProduct: nameProduct,
                            priceHolder: priceHolder
                        }
                    ]
                });
            }

        }
    }
    formatPrice = (num)=> {
      num = num.toString().replace(/\Rp|/g,'');
      if(isNaN(num))
        num = "0";
      sign = (num == (num = Math.abs(num)));
      num = Math.floor(num*100+0.50000000001);
      cents = num%100;
      num = Math.floor(num/100).toString();
      if(cents<10)
        cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+'.'+
        num.substring(num.length-(4*i+3));
        return `${num},${cents}`
    }

    handlePlus= () => {
      this.setState({
        count: this.state.count + 1
      })
    }

    handleMinus= () => {
      if(this.state.count > 0) {
        this.setState({
          count:this.state.count - 1
        })
      }
    }


  render() {

    const {navigate} = this.props.navigation;

        if (this.state.itemDetail.length < 1) {
            return (
                <EmptyCart />
            );
        } else {

        return(
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
              </Right>
            </Header>

            <FlatList
              data={this.state.itemDetail}
              renderItem={({item}) =>(

                <List key={item.id}>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={item.imageHolder } />
                  </Left>
                  <Body>
                    <Text style={styles.textProduct}>{item.nameProduct}</Text>
                    <Text note numberOfLines={1}>Rp {this.formatPrice(item.priceHolder)}</Text>
                      <View style={{flex: 1, flexDirection: 'row', paddingTop:4}}>
                        <Button info onPress={this.handleMinus} style={{width:20, height:30, backgroundColor:'#E91E63'}}>
                          <Text>   -</Text>
                        </Button>
                        <Text style={styles.textQuantity}>  {this.state.count}  </Text>
                        <Button info title="+" onPress={this.handlePlus} style={{width:20, height:30, backgroundColor:'#E91E63'}}>
                          <Text>  +</Text>
                        </Button>
                      </View>
                  </Body>
                  <Right>
                    <Button transparent >
                      <Icon name='trash' style={{color:'#E91E63'}}/>
                    </Button >
                  </Right>
                </ListItem>
                <ListItem>
                  <Text style={styles.textPrice}>Rp. </Text>
                </ListItem>
              </List>
              )}

            keyExtractor={(item, index) => index.toString()}
            />

            <Card>
              <CardItem>
              <Left>
                  <Text style={styles.textTotal}>Total</Text>
              </Left>
              <Right>
                <Text style={styles.textPrice}>Rp. </Text>
              </Right>
              </CardItem>
            <CardItem>
            <Button style={{width:320, backgroundColor:'#E91E63'}} onPress={() => {this.props.navigation.navigate('Checkout');}}>
              <Text style={{left:130, color:'white'}}>Checkout</Text>
            </Button>
            </CardItem>
            </Card>
        </Container>
      );
      }
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
  textTotal: {
    fontWeight: 'bold',
    fontSize: 18
  },
  starColor: {
    color: 'orange'
  },
  footer: {
    backgroundColor: 'white',
  }
  });
  export default withNavigation(ListCart);
