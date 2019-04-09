import React, { Component } from 'react';
import {StyleSheet, Text} from 'react-native';
import { Container, Content, Left, Body, Right, Button, Icon, Title, CardItem, Card, Form, Textarea, Input, Item, Picker} from 'native-base';

class Checkout extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selected: "Tiki",
        number: "",
        address: ""
      };
    }
    onValueChange(value: string) {
      this.setState({
        selected: value
      });
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

  render() {
    const { navigation } = this.props;
    const totalPrice = navigation.getParam("totalPrice");
    return (
      <Container>

        <Card>
          <CardItem>
            <Text style={styles.textProduct}>Contact Receiver</Text>
          </CardItem>
          <CardItem>
            <Content padder>
              <Text style={{fontWeight: 'bold'}}>Address</Text>
              <Form>
                <Textarea rowSpan={3} bordered placeholder="Fill the blank" onChangeText={(address) => this.setState({address})}
                value={this.state.address}/>
              </Form>
              <Text style={{fontWeight: 'bold'}}>Number Phone</Text>
              <Item regular>
                <Input placeholder='08xx xx xx xxx' onChangeText={(number) => this.setState({number})}
                  value={this.state.number} />
              </Item>
              <Text style={{fontWeight: 'bold'}}>Courier</Text>
              <Form>
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
            </Content>
          </CardItem>
        </Card>

        <Card style={{height:230}}>
          <CardItem>
            <Text style={styles.textProduct}>Payment</Text>
          </CardItem>
          <CardItem>
          <Left>
            <Text>Total Price</Text>
          </Left>
          <Right>
          <Text>Rp. {this.formatPrice(totalPrice)}</Text>
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
