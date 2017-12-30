// configureStore.js
import { createStore, combineReducers } from 'redux'
import {persistReducer, persistStore, persistCombineReducers} from 'redux-persist';
import images from './reducers/images'
import RootStackNavigator from '../screens/navigator';
import { AsyncStorage } from 'react-native';
import storage from 'redux-persist/lib/storage'

const navReducer = (state, action) => {
  const nextState = RootStackNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
const config = {
  key: 'root',
  storage: storage,
  images: ['@MySuperStore:key'],
};
const appReducer = persistCombineReducers(config, {
  nav: navReducer,
  images
});

export default function configureStore() {

  const store = createStore(
    appReducer,
  );

  const persistor = persistStore(store
  )
  return { persistor, store };
}