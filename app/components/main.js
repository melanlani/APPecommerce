import React from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput} from 'react-native';

export default class Main extends React.Component{

constructor(props){
  super(props);
    this.state = {
      list: [
      ],
      arrayHolder: [],
      textInput_Holder: ''
    }
  }

  componentDidMount() {
      this.setState({ arrayHolder: [...this.state.list] })
    }

    joinData = () => {
      const { TextInputValue } = this.state;
      this.state.list.push(
        {
          name: TextInputValue
        }
      );
      this.setState({ arrayHolder: [...this.state.list] })
    }


render() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}> -Notes- </Text>
      </View>

      <FlatList
        data={this.state.arrayHolder}
        extraData={this.state.arrayHolder}
        keyExtractor={(index) => index.toString()}
        renderItem={({item, index}) => <Text>{item.name}</Text>}
      />

      <View style={styles.footer}>
      <TextInput
        style={styles.textInput}
        placeholder="Write note here" placeholderTextColor="white" onChangeText={(TextInputValue) => this.setState({TextInputValue})}/>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={this.joinData}>
      <Text style={styles.addButtonText}> + </Text>
      </TouchableOpacity>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  header: {
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  textHeader: {
    color: 'white',
    fontSize: 18,
    paddingTop: 40,
    paddingBottom: 15,
  },
  scrollContainer:{
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 30,
    backgroundColor: '#252525',
    borderTopWidth:2,
    borderTopColor: '#ededed',
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 10,
    bottom: 90,
    backgroundColor: '#E91E63',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  }
});
