import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, FlatList, Alert } from 'react-native';
import { Container, Content, Left, Thumbnail, Body, Right, Button, Icon, Title, CardItem, Card, Form, Textarea, Input, Item, Picker } from 'native-base';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Tiki",
      name: "",
      email: "",
      number: "",
      address: ""
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  render() {
    const { navigation } = this.props;
    const totalPrice = navigation.getParam("totalPrice");
    const itemCart = navigation.getParam("itemCart");
    let courprice = 12000;
    let payment = totalPrice + courprice;
    return (
      <Container>
        <ScrollView>
          <Card>
            <CardItem>
              <Text style={styles.textProduct}>Contact Receiver</Text>
            </CardItem>
            <CardItem>
              <Content padder>
                <Text style={{fontWeight: 'bold'}}>Name</Text>
                <Item regular>
                  <Input onChangeText={(name) => this.setState({name})}
                    value={this.state.name} />
                </Item>
                <Text style={{fontWeight: 'bold'}}>E-mail</Text>
                <Item regular>
                  <Input placeholder='email@domain.com' onChangeText={(email) => this.setState({email})}
                    value={this.state.email} />
                </Item>
                <Text style={{fontWeight: 'bold'}}>Number Phone</Text>
                <Item regular>
                  <Input placeholder='08xx xx xx xxx' onChangeText={(number) => this.setState({number})}
                    value={this.state.number} />
                </Item>
              </Content>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Text style={styles.textProduct}>Address Received</Text>
            </CardItem>
            <CardItem>
              <Content padder>
                <Form>
                  <Textarea rowSpan={5} bordered placeholder="Fill the blank" onChangeText={(address) => this.setState({address})}
                  value={this.state.address}/>
                </Form>
                <CardItem>
                  <Left>
                    <Text>Courier</Text>
                  </Left>
                  <Form style={{width:100}}>
                    <Picker
                      mode="dropdown"
                      iosHeader="Select your SIM"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange.bind(this)}
                    >
                      <Picker.Item label="JNE" value="JNE" />
                      <Picker.Item label="J&T" value="J&T" />
                      <Picker.Item label="Tiki" value="Tiki" />
                    </Picker>
                  </Form>
                </CardItem>
              </Content>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Text style={styles.textProduct}>Payment</Text>
            </CardItem>
            <FlatList
              style={{ flex: 1 }}
              data={itemCart}
              renderItem={({ item, index }) => (
              <CardItem>
                <Left>
                  <Thumbnail square style={{width:30, height:30}} source={{uri:  item.imageHolder}} />
                  <Body>
                    <Text style={{fontSize:10}}>{ item.nameProduct }</Text>
                  </Body>
                </Left>
                <Right>
                <Text style={{fontSize:10}}>Rp. {item.priceHolder.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
                </Right>
              </CardItem>
              )}
            keyExtractor={(item, index) => index.toString()}
            />
            </Card>

            <Card>
              <CardItem>
                <Left>
                  <Text style={{fontWeight:'bold'}}>Total</Text>
                </Left>
                <Right>
                  <Text style={{fontWeight:'bold'}}>Rp. {totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
                </Right>
              </CardItem>
              <CardItem>
              <Left>
                <Text style={{fontWeight:'bold'}}>Courier</Text>
              </Left>
              <Right>
                <Text style={{fontWeight:'bold'}}>Rp. {courprice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
              </Right>
              </CardItem>
            </Card>

            <Card>
              <CardItem>
              <Left>
                <Text style={{fontWeight:'bold'}}>Total Payment</Text>
              </Left>
              <Right>
                <Text style={{fontWeight:'bold', color:'#E91E63'}}>Rp. {payment.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
              </Right>
              </CardItem>
            </Card>

            <Card>
              <CardItem>
                <Left></Left>
                <Body>
                  <Button style={{width:100, backgroundColor:'#E91E63'}} onPress={() => {this.props.navigation.navigate('Finished', {
                    number: this.state.number,
                    totalPrice: totalPrice,
                    courier: this.state.selected,
                    address: this.state.address
                    });
                  }}>
                    <Text style={{left:22, color:'white'}}>Received</Text>
                  </Button>
                </Body>
                <Right></Right>
              </CardItem>
            </Card>
        </ScrollView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  textProduct: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  }
  });
  export default Checkout;
