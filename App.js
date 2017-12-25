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
import {connect, Provider} from 'react-redux';
import { addNavigationHelpers } from "react-navigation";
import configureStore from './src/redux/configureStore'

process.nextTick = setImmediate
const store = configureStore()

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
const AppWithNavigationState = connect(state => {
  return {
    nav: state.nav,
  }
})(({dispatch, nav}) => (
  <Navigator navigation={addNavigationHelpers({ dispatch, state: nav })}/>
));
 class App extends Component {
  constructor(){
    super()
  this.state = {
    images:[],
    searchResult:[]
  } 
}
componentWillMount()
{
  // getData()
}

addImage(){
 getImage().then((newImage)=>{ 
  var images = _.cloneDeep(this.state.images)
  images.push(newImage)
  this.setState({images:images})
  })
 }
addSearch(array){
this.setState({searchResult:array})
}

  render() {
    console.log('store ' , store)
    return (
      <Provider store={store}>
       <Navigator screenProps={{
                images:this.state.images,
                searchResult:this.state.searchResult,
                addSearch:(array)=>this.addSearch(array),
                addImage:()=>this.addImage()
     }}/>
  </Provider>
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

export default App;