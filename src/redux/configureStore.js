// configureStore.js

import { createStore, combineReducers } from 'redux'
import rootReducer from './reducers'
import RootStackNavigator from '../screens/navigator';

export default function configureStore() {

  const navReducer = (state, action) => {
    const nextState = RootStackNavigator.router.getStateForAction(action, state);
    return nextState || state;
  };

  const appReducer = combineReducers({
    nav: navReducer,
    rootReducer
  });

  let store = createStore(appReducer)
  return store
}