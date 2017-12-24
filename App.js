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
import Navigator from './src/screens/navigator'

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
 getImage().then((newImage)=>{ 
  var images = _.cloneDeep(this.state.images)
  images.push(newImage)
  this.setState({images:images})
  })
 }

  render() {
    return (
     <Navigator />
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
