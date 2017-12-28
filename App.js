import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, Image, View, StyleSheet } from 'react-native';
import Navigator from './src/screens/navigator'
import { connect, Provider } from 'react-redux';
import { addNavigationHelpers } from "react-navigation";
import configureStore from './src/redux/configureStore'
import { getData } from './src/utils'
import { PersistGate } from 'redux-persist/es/integration/react'
import splash from './src/image/splashAndroid.png'

process.nextTick = setImmediate
console.disableYellowBox = true;

const { persistor, store } = configureStore()
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

  splash(){
    return<View style={styles.splashContainer}>
          <Image style={styles.splash} source={splash}>
            </Image></View>
    }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={this.splash()}
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

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
  },
  splash: {
    flex: 1,
    width: '100%',
    height: '100%',
  }

});
export default App;