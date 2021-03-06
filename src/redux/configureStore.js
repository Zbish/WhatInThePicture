// configureStore.js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import {persistStore, persistCombineReducers} from 'redux-persist';
import thunk from 'redux-thunk';
import data from './reducers/data'
import loading from './reducers/loading'
import RootStackNavigator from '../screens/navigator';
import storage from 'redux-persist/lib/storage'

const navReducer = (state, action) => {
  const nextState = RootStackNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
const config = {
  key: 'root',
  blacklist: ['nav','loading'],
  storage,
};
const appReducer = persistCombineReducers(config, {
  nav: navReducer,
  data, 
  loading
});

export default function configureStore() {

  const store = createStore(
    appReducer,
    applyMiddleware(thunk)
  );

  const persistor = persistStore(store
  )
  return { persistor, store };
}