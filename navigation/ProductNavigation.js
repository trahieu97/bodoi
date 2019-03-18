import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import DetailScreen from '../screens/DetailScreen';
import StoresScreen from '../screens/StoresScreen';
import UserScreen from '../screens/UserScreen';
import PromotionsScreen from '../screens/PromotionsScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ACTIVE_TINT_COLOR = '#056839';
const INACTIVE_TINT_COLOR = '#707070';
const TAB_BAR_ICON_SIZE = 29;

// Create Home Page Stack
const DetailScreenStack = createStackNavigator({
    Home: DetailScreen,
});

export default createStackNavigator({
    DetailScreenStack
});
