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
  AsyncStorage
} from 'react-native';
import _ from 'lodash';
import {getImage} from './src/utils'

process.nextTick = setImmediate

//  async function getData(){

//   try {
//     var data = await  AsyncStorage.getItem('@MySuperStore:key')
//     if (data !== null){
//       // We have data!!
//       console.log('we have data2' ,JSON.parse(data))
//     }
//   } catch (error) {
//     console.log('get eroor' ,error)
//   }
//  }

//   function saveData(data){
//     try {
//       AsyncStorage.setItem('@MySuperStore:key',JSON.stringify(data));
//       console.log('data save')
//     } catch (error) {
//       console.log('get eroor' ,error)
//     }
//    }
export default class App extends Component {
  constructor(){
    super()
  this.state = {
    images:[],
  } 
}
componentWillMount()
{
  // getData()
}

onPress(){
 var newImae = getImage().then((value)=>{ console.log('newImage' , value)})
 }

  render() {
    console.log('state' , this.state)
    return (
      <View style={styles.container}>
          <Image style={styles.picture} source={{uri:this.state.pic}} ></Image>
        <Button title={'Add Photo'} onPress={()=> this.onPress()}></Button>
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
    picture:{
      width:300,
      height:300
    }
});
