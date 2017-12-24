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
  FlatList
} from 'react-native';
import ListItem from '../component/ListItem'


export default class HomeScreen extends Component {

onPress(){
    // this.props.navigation.navigate("ImageScreen");
    this.props.screenProps.addImage()
 }

  render() {
      console.log('screenprops' , this.props.screenProps.images)
    return (
      <View style={styles.container}>
            <FlatList
                          data={this.props.screenProps.images}
                          renderItem={({ item }) => <ListItem item={item}></ListItem>}
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
  
});
