/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  TextInput
} from 'react-native';
import ListItem from '../component/ListItem'


export default class HomeScreen extends Component {

componentWillMount() {
    this.setState({
      currentValue: '',
    });
  }
onPress(){
    this.props.screenProps.addImage()
 }
navigateTo(item){
this.props.navigation.navigate("ImageScreen",{item:item});
}
onChange(val)
{
    this.setState({currentValue:val})
}
  render() {
      console.log('screenprops' , this.state.currentValue)
    return (
      <View style={styles.container}>
          <TextInput underLineColorAndroid='transparent'
              placeholderTextColor="black"
              placeholder='Search'
              style={styles.textInput}
              onChangeText={(val) => this.onChange(val)}
              value={this.state.currentValue}
            />
            <FlatList
                          data={this.props.screenProps.images}
                          renderItem={({ item }) => <ListItem item={item} 
                                                              onPress={(item)=>this.navigateTo(item)}/>}
                          keyExtractor={(item, index) => index}
                        />
        <Button title={'Add Photo 2'} onPress={()=> this.onPress()}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    color: '#000000',
    alignSelf: 'stretch',
    padding: 5,
    margin:10,
    marginBottom: 10,
    backgroundColor: 'rgba(122, 186, 122,0.7)',
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.6,
  },
});
