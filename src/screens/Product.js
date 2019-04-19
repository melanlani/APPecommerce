import React, { Component } from 'react';
import { StyleSheet, Alert, Image, Text, TouchableOpacity } from 'react-native';
import { CardItem, Card, Col, Row, Grid, Left } from 'native-base';

class Product extends Component {

  render() {
    return (

      <Grid>
        <Col>
          <TouchableOpacity onPress={this.props.getDetails}>
            <Card>
              <CardItem>
                <Left>
                  <Text style={styles.textProduct}>{this.props.productName}</Text>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{ uri: this.props.productImage }} style={styles.prodImage}/>
              </CardItem>
              <CardItem>
                <Text style={styles.textPrice}>Rp. {this.props.productPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
              </CardItem>
            </Card>
          </TouchableOpacity>
        </Col>
      </Grid>

    );
  }
}
const styles = StyleSheet.create({
  textPrice: {
    color: '#E91E63',
    fontSize: 12
  },
  textProduct: {
    fontSize:12
  },
  prodImage: {
    height: 150,
    width: 175
  }
  });
export default Product;
