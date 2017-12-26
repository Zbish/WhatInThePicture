import React, { Component } from 'react';
import {Platform} from 'react-native';
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

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;