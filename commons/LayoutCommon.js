import { Platform, Dimensions } from 'react-native';

const APPBAR_EXTRA_HEIGHT = 8;
export const STATUSBAR_HEIGHT = (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight;
export const APPBAR_HEIGHT = (Platform.OS === 'ios') ? (44 + APPBAR_EXTRA_HEIGHT) : (56 + APPBAR_EXTRA_HEIGHT);
export const HEADER_TOP_BAR_HEIGHT = STATUSBAR_HEIGHT + APPBAR_HEIGHT;
export const DEVICE_WIDTH = Dimensions.get('window').width;
