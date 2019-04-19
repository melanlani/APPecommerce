import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Content,Button,Text,Card,Left, Right, CardItem, Icon, Thumbnail } from 'native-base';

class SideBar extends Component {
  render(){
    return(
      <Content style={{backgroundColor: '#E91E63'}}>
        <Thumbnail circle source={require('./assets/foto.jpg')} style={styles.imageLogo}/>
        <Text style={styles.txtlogo}>Shopping</Text>
        <Card style={styles.sizeCard}>
          <CardItem>
            <Button transparent onPress={() => this.props.navigation.navigate('Login')}>
              <Icon name="person" style={{ color: "#E91E63"}}/>
              <Text style={{ color: "#E91E63"}}>Login</Text>
            </Button>
          </CardItem>
          <CardItem>
            <Button transparent>
              <Icon name="home" style={{ color: "#E91E63"}}/>
              <Text style={{ color: "#E91E63"}}>Home</Text>
            </Button>
          </CardItem>
          <CardItem>
            <Button transparent>
              <Icon type="FontAwesome" name="info-circle" style={{ color: "#E91E63"}}/>
              <Text style={{ color: "#E91E63"}}>About</Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    )
  }
}

export default withNavigation(SideBar);

const styles = StyleSheet.create({
  imageLogo: {
    height: 70 ,
    width: 70,
    marginLeft:100,
    marginTop:40
  },
  txtlogo: {
    marginLeft:96,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 18
  },
  buttonLogin: {
    backgroundColor: '#E91E63',
    width: 100,
    marginLeft:40
  },
  buttonSignup: {
    backgroundColor: 'white'
  },
  sizeCard: {
    marginTop:60,
    height:400
  }
  });
