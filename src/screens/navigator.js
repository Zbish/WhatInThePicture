import React from 'react';
import { StackNavigator } from 'react-navigation';
import homescreen from './HomeScreen'
import imagescreen from './ImageScreen'

export default RootStackNavigator = StackNavigator(
  {
    HomeScreen: {
      screen: homescreen,
      navigationOptions: {
        title: "What's In The Picture",
        headerStyle: { backgroundColor: '#673AB7' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
      }
    },
    ImageScreen: {
      screen: imagescreen,
      navigationOptions: {
        headerStyle: { backgroundColor: '#673AB7' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
      }
    },
  },
  {
    initialRouteName: 'HomeScreen'
  },
)