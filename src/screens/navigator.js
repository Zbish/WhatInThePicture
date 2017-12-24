import React from 'react';
import { StackNavigator } from 'react-navigation';
import homescreen from './HomeScreen'
import imagescreen from './ImageScreen'

export default RootStackNavigator = StackNavigator(
  {
    HomeScreen: {
      screen: homescreen,
      navigationOptions: {
        title: 'HomeScreen',
        headerStyle: { backgroundColor: '#388E3C' },
        headerTitleStyle: { color: '#FFFFFF' },
        headerTintColor: '#FFFFFF'
      }
    },
    ImageScreen: {
        screen: imagescreen,
        navigationOptions: {
          title: 'ImageScreen',
          headerStyle: { backgroundColor: '#388E3C' },
          headerTitleStyle: { color: '#FFFFFF' },
          headerTintColor: '#FFFFFF'
        }
      },
  },
  {
    initialRouteName: 'HomeScreen'
  },
)