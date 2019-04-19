import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container,Content,Button,Text,Form,Item as FormItem,Input,Label,Card, Left, Right, CardItem } from 'native-base';
class Login extends Component {

  render() {
    return (
      <Container>
        <Content>
          <Image source={require('./assets/logo.png')} style={styles.imageLogo}/>

          <Card style={styles.cardSize}>
            <Form >
              <FormItem floatingLabel>
                <Label>Email</Label>
                <Input />
              </FormItem>
              <FormItem floatingLabel last>
                <Label>Password</Label>
                <Input secureTextEntry={true} />
              </FormItem>
              <CardItem>
                <Left>
                  <Button full style={styles.buttonSignup}>
                    <Text style={{color:'#E91E63'}}> Sign Up </Text>
                  </Button>
                </Left>
                <Right>
                  <Button full style={styles.buttonLogin} onPress={() => {this.props.navigation.navigate('Home')}}>
                    <Text> Login </Text>
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
    height: 70 ,
    width: 70,
    marginLeft:140,
    marginTop:40
  },
  buttonLogin: {
    backgroundColor: '#E91E63',
    width: 100,
    marginLeft:40
  },
  buttonSignup: {
    backgroundColor: 'white'
  },
  cardSize: {
    marginTop:60
  }
  });
  export default Login;
