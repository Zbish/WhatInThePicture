import React, { Component } from 'react';
import {Platform,ActivityIndicator,StatusBar} from 'react-native';
import Navigator from './src/screens/navigator'
import { connect, Provider } from 'react-redux';
import { addNavigationHelpers } from "react-navigation";
import configureStore from './src/redux/configureStore'
import {getData} from'./src/utils'
import { PersistGate } from 'redux-persist/es/integration/react'

process.nextTick = setImmediate
console.disableYellowBox = true;
const { persistor, store }  = configureStore()
const onBeforeLift = () => {
 
}
const AppWithNavigationState = connect(state => {
  return {
    nav: state.nav,
  }
})(({ dispatch, nav }) => (
  <Navigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
));

class App extends Component {
  componentWillMount(){

    
  }
  render() {
    return (
      <Provider store={store}>
      <PersistGate 
        loading={<ActivityIndicator size="large" color="#0000ff" />}
        onBeforeLift={onBeforeLift}
        persistor={persistor}>
        <StatusBar
          backgroundColor="#512DA8"
        />
        <AppWithNavigationState />
      </PersistGate>
    </Provider>
    );
  }
}

export default App;