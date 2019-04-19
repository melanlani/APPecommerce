import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container} from 'native-base';
import { withNavigation } from "react-navigation";

class Finished extends Component {
  constructor(props) {
      super(props);
    }

  render() {
    const { navigation } = this.props;
    const number = navigation.getParam("number");
    const totalPrice = navigation.getParam("totalPrice");
    const courier = navigation.getParam("courier");
    const address = navigation.getParam("address");
    return (

      <Container>
      <View style={styles.container}>
        <Text style={styles.welcome}>Thankyou For Your Order!</Text>
      </View>
        <View style={{ flex: 1, marginTop:100}}>
          <Text style={styles.instructions}>User's number handphone: {number}</Text>
          <Text style={styles.instructions}>User's address: {address}</Text>
          <Text style={styles.instructions}>Your payment order: Rp. {totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
          <Text style={styles.instructions}>Your Courier: {courier}</Text>
        </View>
      <View style={styles.container}>
        <Text style={styles.instructions}>Please send money to store account number</Text>
        <Text style={styles.instructions}>Bank Mandiri 111xxxxxxxx</Text>
      </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  textProduct: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  });
export default withNavigation(Finished);
