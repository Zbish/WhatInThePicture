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
  Button
} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import Clarifai from 'clarifai';

process.nextTick = setImmediate
const app = new Clarifai.App({
  apiKey: 'b5bfcb7aba854f9da7b6d6e418d778cb'
 });
 async function getImageConcepts(image){
   app.models.predict(Clarifai.GENERAL_MODEL, {base64: image}).then(
     function(response) {
      console.log('response' ,response.outputs[0].data.concepts);
      console.log('image' ,image);
     },
     function(err) {
    
     }
   );
 }

var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
export default class App extends Component {
  constructor(){
    super()
  this.state = {
    images:[]
  }
}
lunchCamera(){
  console.log('sabbba')
  ImagePicker.launchCamera(options, (response)  => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else{
      console.log('response' , response)
      this.setState({pic:'data:image/png;base64,' + response.data})
     getImageConcepts(response.data)
     
    }
  });
 }
 launchCameraRoll(){
  console.log('sabbba bataba')
  ImagePicker.launchImageLibrary(options, (response)  => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else{
      console.log('response' , response)
      this.setState({pic:'data:image/png;base64,' + response.data})
    }
  });
 }
  render() {
    return (
      <View style={styles.container}>
          <Image style={styles.picture} source={{uri:this.state.pic}} ></Image>
        <Button title={'camera'} onPress={()=> this.lunchCamera()}></Button>
        <Button title={'cameraroll'} onPress={()=> this.launchCameraRoll()}></Button>
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
      width:200,
      height:200
    }
});
