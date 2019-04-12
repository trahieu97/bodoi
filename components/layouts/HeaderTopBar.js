import React from 'react';
import { Dimensions, StyleSheet, TouchableHighlight, StatusBar,
          View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { STATUSBAR_HEIGHT, APPBAR_HEIGHT } from '../../commons/LayoutCommon';
import HeaderSearchModule from '../modules/layouts/HeaderSearchModule';
import HeaderFunctionButtonModule from '../modules/layouts/HeaderFunctionButtonModule';

const CustomStatusBar = ({backgroundColor, ...props}) => (
    <View style={[HeaderTopBarStyles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class HeaderTopBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
    this._onPressSearchButton = this._onPressSearchButton.bind(this);
    this._onPressFunctionButton = this._onPressFunctionButton.bind(this);
  }
  
  _onPressSearchButton(value) {
      alert(value);
  }

  _onPressFunctionButton(type) {
    const {navigate} = this.props.navigation;
    switch(type) {
      case 'cart' : navigate('CartScreen'); break;
      default: null;
    }
  }

  render() {
      return (
          <View style={HeaderTopBarStyles.contain}>
              <CustomStatusBar backgroundColor="#056839" barStyle="light-content" />
              <View style={HeaderTopBarStyles.appBar}>
                <View style={HeaderTopBarStyles.viewLeft}>
                  {(this.props.type === 'home') ? 
                    <HeaderSearchModule onPressSearch={this._onPressSearchButton}/>
                  : (this.props.type === 'normal') ? 
                  (<View >
                    <Text numberOfLines={2} style={{color: '#fff', fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize', 
                      width: 0.6 * DEVICE_WIDTH - 40, paddingLeft: 16}}>{this.props.title}</Text>
                    {/* <Text style={{color: '#fff', fontWeight: 'bold'}}>{this.props.title}</Text> */}
                  </View>
                  )
                  :
                  (<View >
                      <TouchableHighlight 
                      onPress={() => alert('djsak')}
                      underlayColor="transparent">
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="chevron-left" color="#fff" size={40}/>
                        <Text numberOfLines={2} style={{color: '#fff', fontWeight: 'bold', textTransform: 'capitalize', 
                              width: 0.6 * DEVICE_WIDTH - 40, left: -5}}>{this.props.title}</Text>
                      </View>
                      </TouchableHighlight>
                      {/* <Text style={{color: '#fff', fontWeight: 'bold'}}>{this.props.title}</Text> */}
                    </View>
                  )}
                </View>
                <View style={HeaderTopBarStyles.viewRight}>
                  <View style={HeaderTopBarStyles.viewRightContain}>
                    <HeaderFunctionButtonModule
                      type="notification" iconName="bell-outline"
                      onPressButton={this._onPressFunctionButton} />
                    <HeaderFunctionButtonModule
                      type="cart" iconName="cart-outline"
                      onPressButton={this._onPressFunctionButton} />
                    <HeaderFunctionButtonModule
                      type="logout" iconName="logout-variant"
                      onPressButton={this._onPressFunctionButton} />
                  </View>
                </View>
              </View>
          </View>
      );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const SEARCH_FORM_HEIGHT = 28;

const HeaderTopBarStyles = StyleSheet.create({
  contain: {
    flex: 1,
    height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
    zIndex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    flexDirection: 'row',
    backgroundColor:'#056839',
    height: APPBAR_HEIGHT,
    width: DEVICE_WIDTH
  },
  button: {
    width: SEARCH_FORM_HEIGHT,
    height: SEARCH_FORM_HEIGHT
  },
  viewLeft: {
    width: 0.6 * DEVICE_WIDTH,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingRight: 8
  },
  viewRight: {
    width: 0.4 * DEVICE_WIDTH,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 16,
    paddingLeft: 8
  },
  viewRightContain: {
    flexDirection: 'row'
  },
});
