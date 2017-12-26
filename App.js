import React, { Component } from 'react';
import {Platform} from 'react-native';
import Navigator from './src/screens/navigator'
import { connect, Provider } from 'react-redux';
import { addNavigationHelpers } from "react-navigation";
import configureStore from './src/redux/configureStore'
import {getData} from'./src/utils'

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
  componentWillMount(){
    var to = getData().then((value) => {
      console.log('getData2' , value)
    
      return(value)
    })
    console.log('to' , to)
    // persistStore(store, { storage: AsyncStorage }, () => {
    //   this.setState({ rehydrated: true })
    // })
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