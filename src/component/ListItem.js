
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';

export default class ListItem extends Component {

onPress(){

 }

  render() {
      var item = this.props.item
      console.log('item',item.taken)
    return (
      <View style={styles.container}>
       <Image style={styles.image} source={{uri:item.image}}></Image>
       <Text>2</Text>
       <Text>3</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image:{
    width:150,
    height:150
  },
 
});
