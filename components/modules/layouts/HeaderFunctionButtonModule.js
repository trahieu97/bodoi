import React from 'react';
import socketIO from 'socket.io-client';
import { Text, StyleSheet, AsyncStorage, TouchableHighlight, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../../../constants/Api';
import { GREEN } from '../../../commons/ColorCommon';

export default class HeaderFunctionButtonModule extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0
    }
    this._onPressButton = this._onPressButton.bind(this);
  }
  
  _onPressButton() {
    this.props.onPressButton(this.props.type);
  }

  componentDidMount() {
    const carts = ['cart', 'detail-cart'];
    if (carts.indexOf(this.props.type) === -1) 
      return;
    let token = 'hieutt30';
    console.log((this.state.cartCount === 0))
    if (this.state.cartCount === 0) {
      fetch(API.GET_CART_TOTAL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: 'dkjflkewfleflewlfijewifjiweof'
        }),
      })
      .then(async (response) => {
          if (response.status === 200) {
              let body = JSON.parse(response._bodyInit);
              let total =  body.data;
              console.log(body)
              if (total)
                this.setState({cartCount: total})
          }
      }).catch((error) => {
          Alert.alert('Thông báo', 'Không thể truy xuất giỏ hàng');
      });
    }
    let socket = socketIO('http://127.0.0.1:3000', {
      transports: ['websocket'], 
      jsonp: false 
    });
    socket.connect();
    socket.on(token, (response) => 
      this.setState({cartCount: response.total})
    );
  }

  render() {
        const VIEW_RIGHT_BUTTON_ICON = (this.props.type == 'detail-cart') ? GREEN : '#fff';
        return (
            <TouchableHighlight style={HeaderFunctionButtonModuleStyles.contain}
                onPress={this._onPressButton} 
                underlayColor="transparent">
                <View>
                  { (this.props.type == 'cart' && this.state.cartCount > 0 || 
                    this.props.type == 'detail-cart' && this.state.cartCount > 0) ? 
                  <View style={HeaderFunctionButtonModuleStyles.viewNum}>
                    <Text style={HeaderFunctionButtonModuleStyles.num}>{this.state.cartCount}</Text>
                  </View> : null }
                  <Icon name={this.props.iconName}
                    color={VIEW_RIGHT_BUTTON_ICON} size={SEARCH_FORM_HEIGHT}/>
                </View>
            </TouchableHighlight>
        );
    }
}

const SEARCH_FORM_HEIGHT = 32;

const HeaderFunctionButtonModuleStyles = StyleSheet.create({
  contain: {
    paddingLeft: 5,
    paddingRight: 5
  },
  viewNum: {
    position: 'absolute',
    width: 20,
    backgroundColor: 'orange',
    height: 20,
    borderRadius: 16,
    zIndex: 600,
    top: -7,
    right: -5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  num: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  }
});