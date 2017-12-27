import React from 'react';
import { StackNavigator } from 'react-navigation';
import homescreen from './HomeScreen'
import imagescreen from './ImageScreen'

export default RootStackNavigator = StackNavigator(
  {
    HomeScreen: {
      screen: homescreen,
      navigationOptions: {
        title: 'What In The Picture',
        headerStyle: { backgroundColor: '#388E3C' },
        headerTitleStyle: { color: '#FFFFFF' },
        headerTintColor: '#FFFFFF'
      }
    },
    ImageScreen: {
        screen: imagescreen,
        navigationOptions: {
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