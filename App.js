import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Navigator from './src/screens/navigator'
import { connect, Provider } from 'react-redux';
import { addNavigationHelpers } from "react-navigation";
import configureStore from './src/redux/configureStore'
import { PersistGate } from 'redux-persist/es/integration/react'

process.nextTick = setImmediate
console.disableYellowBox = true;

const { persistor, store } = configureStore()

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
        <PersistGate persistor={persistor}>
          <StatusBar backgroundColor="#512DA8" />
          <AppWithNavigationState />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;