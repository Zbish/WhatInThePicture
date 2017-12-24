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
 function getImageConcepts2(image){
  
  return  new Promise(function(resolve, reject) {
      app.models.predict(Clarifai.GENERAL_MODEL, {base64: image}).then(
          function(response) {
           resolve(response.outputs[0].data.concepts)
          },
          function(err) {
         
          }
        );
    });
  }
  async function getfromimage(image){
    var concepts = await getImageConcepts2(image) 
    return concepts
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
  
  return  new Promise(function(resolve, reject) {
      app.models.predict(Clarifai.GENERAL_MODEL, {base64: image}).then(
          function(response) {
           resolve(response.outputs[0].data.concepts)
          },
          function(err) {
         
          }
        );
    });
  }
onPress(){
  // var images = [...this.state.images]
  ImagePicker.showImagePicker(options, (response)  => {
    console.log('stateeeee' ,response)
    // var item2 = {uri:response.uri}
    var cons =  this.getImageConcepts2(response.data).then((value) => {
         console.log('stateewwww' ,this.state)
         console.log('stateewwww' ,value)
         console.log('stateewwww' ,response.data)
    } )
    // .then( function(value){
      // item2 = {...item2,consept:value}
      // console.log('stateewwww' ,this.state)
      // try {
      //   saveData(item2,images)
      // }catch (error){
      //   console.log('constffffffffffffffffffffig' , error)
      // }
    // })
    // console.log('gggg' ,cons)
    // images.push(item2)
    // this.setState({images:images,pic:response.uri})
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
