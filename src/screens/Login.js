import React, { Component } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import { Container,Content,Button,Text,Form,Item as FormItem,Input,Label,Card, Left, Right, CardItem } from 'native-base';
import axios from 'axios';
import { baseUrl } from '../redux/actions/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <Container>
        <Content>
          <Image source={require('./assets/logo2.png')} style={styles.imageLogo}/>

          <Card style={styles.cardSize}>
            <Form >
              <FormItem floatingLabel>
                <Label>Email</Label>
                <Input onChangeText={(email) => this.setState({email})}
                  value={this.state.email}/>
              </FormItem>
              <FormItem floatingLabel last>
                <Label>Password</Label>
                <Input secureTextEntry={true} onChangeText={(password) => this.setState({password})}
                  value={this.state.password} />
              </FormItem>
              <CardItem>
                <Left>
                  <Button full style={styles.buttonSignup} onPress={() => {this.props.navigation.navigate('Register')}}>
                    <Text style={{color:'#E91E63'}}> Sign Up </Text>
                  </Button>
                </Left>
                <Right>
                  <Button full style={styles.buttonLogin} onPress={() => {
                    axios.post(`${baseUrl}/api/v1/login`, {
                            email: this.state.email,
                            password: this.state.password,
                    })
                      .then(res => {
                      Alert.alert(``,`${JSON.stringify(res.data.message )}`)

                      })
                      .catch(e => {
                          Alert.alert(``,`${JSON.stringify(e.message )}`)
                      });
                      this.props.navigation.navigate("Home");
                  }}>
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
    height: 200,
    width: 300
  }
  });
  export default Login;
