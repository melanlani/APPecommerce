import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container,Content,Button,Text,Form,Item as FormItem,Input,Label,Card, Left, Right, CardItem } from 'native-base';
class Register extends Component {

  render() {
    return (
      <Container>
        <Content>
          <Text style={{fontSize:14, marginLeft:130}}>Form Register</Text>

          <Card style={styles.cardSize}>
            <Form >
            <FormItem floatingLabel>
              <Label>Username</Label>
              <Input />
            </FormItem>
              <FormItem floatingLabel>
                <Label>Email</Label>
                <Input />
              </FormItem>
              <FormItem floatingLabel last>
                <Label>Password</Label>
                <Input secureTextEntry={true} />
              </FormItem>
              <FormItem floatingLabel last>
                <Label>Confirm Password</Label>
                <Input secureTextEntry={true} />
              </FormItem>
              <CardItem>
                <Left>
                  <Button full style={styles.buttonSignup}>
                    <Text style={{color:'#E91E63'}}> Login </Text>
                  </Button>
                </Left>
                <Right>
                  <Button full style={styles.buttonLogin} onPress={() => {this.props.navigation.navigate('Home')}}>
                    <Text> Register </Text>
                  </Button>
                </Right>
              </CardItem>
            </Form>
          </Card>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  imageLogo: {
    height: 90 ,
    width: 170,
    marginLeft:90,
    marginTop:40
  },
  buttonLogin: {
    backgroundColor: '#E91E63',
    width: 100,
    marginLeft:20
  },
  buttonSignup: {
    backgroundColor: 'white'
  },
  cardSize: {
    marginTop:30,
    marginLeft:30,
    height: 400,
    width: 300
  }
  });
  export default Register;
