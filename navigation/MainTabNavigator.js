import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import StoresScreen from '../screens/StoresScreen';
import UserScreen from '../screens/UserScreen';
import PromotionsScreen from '../screens/PromotionsScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ACTIVE_TINT_COLOR = '#056839';
const INACTIVE_TINT_COLOR = '#707070';
const TAB_BAR_ICON_SIZE = 29;

// Create Home Page Stack
const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Trang chính',
  tabBarIcon: ({ focused }) => (
    <Icon name="home" 
          color={(focused) ? ACTIVE_TINT_COLOR : INACTIVE_TINT_COLOR} 
          size={TAB_BAR_ICON_SIZE} />
  ),
  tabBarOptions: {
    activeTintColor: ACTIVE_TINT_COLOR,
    inactiveTintColor: INACTIVE_TINT_COLOR
  }
};

// Create Promotion Stack
const PromotionsStack = createStackNavigator({
  PromotionStack: PromotionsScreen,
});

PromotionsStack.navigationOptions = {
  tabBarLabel: 'Khuyến Mãi',
  tabBarIcon: ({ focused }) => (
    <Icon name="sale" 
          color={(focused) ? ACTIVE_TINT_COLOR : INACTIVE_TINT_COLOR} 
          size={TAB_BAR_ICON_SIZE - 2} />
  ),
  tabBarOptions: {
    activeTintColor: ACTIVE_TINT_COLOR,
    inactiveTintColor: INACTIVE_TINT_COLOR
  }
};

// Create Stores Stack
const StoresStack = createStackNavigator({
  StoresStack: StoresScreen,
});

StoresStack.navigationOptions = {
  tabBarLabel: 'Đại lý',
  tabBarIcon: ({ focused }) => (
    <Icon name='store' 
          color={(focused) ? ACTIVE_TINT_COLOR : INACTIVE_TINT_COLOR} 
          size={TAB_BAR_ICON_SIZE} />
  ),
  tabBarOptions: {
    activeTintColor: ACTIVE_TINT_COLOR,
    inactiveTintColor: INACTIVE_TINT_COLOR
  }
};

const UserStack = createStackNavigator({
  UserStack: UserScreen,
});

UserStack.navigationOptions = {
  tabBarLabel: 'Tài khoản',
  tabBarIcon: ({ focused }) => (
    <Icon name='account-circle' 
          color={(focused) ? ACTIVE_TINT_COLOR : INACTIVE_TINT_COLOR} 
          size={TAB_BAR_ICON_SIZE} />
  ),
  tabBarOptions: {
    activeTintColor: ACTIVE_TINT_COLOR,
    inactiveTintColor: INACTIVE_TINT_COLOR
  }
};

export default createBottomTabNavigator({
  HomeStack,
  PromotionsStack,
  StoresStack,
  UserStack
});
