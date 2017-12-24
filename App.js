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
import ImagePicker from 'react-native-image-picker'
import Clarifai from 'clarifai';
import {chooseAnImage,getImageConcepts2} from './src/utils'

process.nextTick = setImmediate
const app = new Clarifai.App({
  apiKey: 'b5bfcb7aba854f9da7b6d6e418d778cb'
 });


export default class App extends Component {
  constructor(){
    super()
  this.state = {
    images:[]
  }
}
async lunchCamera(){
  const imagebase64 = await chooseAnImage(ImagePicker)
  const concepts = await getImageConcepts2(Clarifai,imagebase64,app)
  var item = {image:imagebase64,concepts:concepts,date:new Date()}
  console.log('item' ,item)
 }
  render() {
    return (
      <View style={styles.container}>
          <Image style={styles.picture} source={{uri:this.state.pic}} ></Image>
        <Button title={'Add Photo'} onPress={()=> this.lunchCamera()}></Button>
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
