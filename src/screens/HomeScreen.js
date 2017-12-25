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
    this.props.screenProps.addImage()
 }
navigateTo(item){
this.props.navigation.navigate("ImageScreen",{item:item});
}
  render() {
      console.log('screenprops' , this.props.screenProps.images)
    return (
      <View style={styles.container}>
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
  
});
