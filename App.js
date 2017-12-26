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
  //  getData().then((value) => {
  //     console.log('getData2' , value)
    // persistStore(store, { storage: AsyncStorage }, () => {
    //   this.setState({ rehydrated: true })
    // })
  
    // })
    
  }
  render() {
    // if (!this.state.rehydrate) return <Text>Loading...</Text>
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;