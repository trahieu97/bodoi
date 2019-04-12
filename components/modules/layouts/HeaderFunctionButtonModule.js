import React from 'react';
import { Text, StyleSheet, AsyncStorage, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HeaderFunctionButtonModule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0
    }
    this.getCartCount = async () => {
      try {
        let cartForm = JSON.parse(await AsyncStorage.getItem("cart"));
        if (cartForm) {
          this.setState({cartCount: cartForm.length});
        }
      } catch (error) {
        console.log('Error: ' + error);
      }
    };
    this._onPressButton = this._onPressButton.bind(this);
  }
  
  _onPressButton() {
    this.props.onPressButton(this.props.type);
  }

  componentDidMount() {
    setInterval(() => this.getCartCount(), 1000);
  }
  
  render() {
        return (
            <TouchableHighlight style={HeaderFunctionButtonModuleStyles.contain}
                onPress={this._onPressButton} 
                underlayColor="transparent">
                <View>
                  { (this.props.type == 'cart' && this.state.cartCount > 0) ? 
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
const VIEW_RIGHT_BUTTON_ICON = '#fff';

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