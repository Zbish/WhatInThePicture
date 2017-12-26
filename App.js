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
import { getImage } from './src/utils'
import Navigator from './src/screens/navigator'
import { connect, Provider } from 'react-redux';
import { addNavigationHelpers } from "react-navigation";
import configureStore from './src/redux/configureStore'

process.nextTick = setImmediate
const store = configureStore()
const AppWithNavigationState = connect(state => {
  return {
    nav: state.nav,
  }
})(({ dispatch, nav }) => (
  <Navigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
));

class App extends Component {

  componentWillMount() {
    // getData()
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;