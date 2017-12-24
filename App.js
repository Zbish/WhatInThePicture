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
import _ from 'lodash';
import {chooseAnImage} from './src/utils'

process.nextTick = setImmediate
const app = new Clarifai.App({
  apiKey: 'b5bfcb7aba854f9da7b6d6e418d778cb'
 });
 const options = {
  title: 'Select',
  customButtons: [
  //   {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
 async function getData(){
 
  try {
    var data = await  AsyncStorage.getItem('@MySuperStore:key')
    if (data !== null){
      // We have data!!
      console.log('we have data2' ,JSON.parse(data))
    }
  } catch (error) {
    console.log('get eroor' ,error)
  }
 }

  function saveData(data,images){
    
    var array = images
    console.log('array', array)
    array.push(data)
    
    try {
      
      AsyncStorage.setItem('@MySuperStore:key',JSON.stringify(array));
      console.log('data savw')
    } catch (error) {
      console.log('get eroor' ,error)
    }
   }
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
getImageConcepts2(image){
  var concept = app.models.predict(Clarifai.GENERAL_MODEL, {base64: image})
  return  concept
  }
onPress(){
  ImagePicker.showImagePicker(options, (response)  => {
    var cons = this.getImageConcepts2(response.data).then((value) => {
         var images =  _.cloneDeep(this.state.images)
         var concepts = value.outputs[0].data.concepts
         var item = {image:response.uri,consepts:concepts}
         images.push(item)
         this.setState({images:images})
    } )
   })
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
