import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import PersonalInfoScreen from '../screens/user_screen/PersonalInfoScreen';
import UpdateInfoScreen from '../screens/user_screen/UpdateInfoScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen}
});

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator, MainNavigator
}));