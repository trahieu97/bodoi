import React from 'react';
import { Dimensions, StyleSheet, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HeaderFunctionButtonModule extends React.Component {

  constructor(props) {
    super(props);
    this._onPressButton = this._onPressButton.bind(this);
  }
  
  _onPressButton() {
    this.props.onPressButton(this.props.type);
  }
  
  render() {
        return (
            <TouchableHighlight style={HeaderFunctionButtonModuleStyles.contain}
                onPress={this._onPressButton} 
                underlayColor="transparent">
                <View>
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
  }
});