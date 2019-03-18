import React from 'react';
import { Dimensions, StyleSheet, TouchableHighlight, StatusBar,
          View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HeaderSearchModule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchValue: ''};
    this._onPressSearchButton = this._onPressSearchButton.bind(this);
  }
  
  _onPressSearchButton() {
    this.props.onPressSearch(this.state.searchValue);
  }
  
  render() {
        return (
            <View style={HeaderSearchModuleStyles.contain}>
                <TextInput 
                    style={HeaderSearchModuleStyles.input}
                    placeholder='Nhập từ khoá cần tìm'
                    onChangeText={(searchValue) => this.setState({searchValue})} />
                <TouchableHighlight style={HeaderSearchModuleStyles.button} 
                    onPress={this._onPressSearchButton}
                    underlayColor="transparent">
                    <View style={HeaderSearchModuleStyles.buttonIcon}>
                        <Icon name='magnify' color='#707070' size={24} />
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const SEARCH_FORM_HEIGHT = 32;

const HeaderSearchModuleStyles = StyleSheet.create({
    contain: {
        flexDirection: 'row',
        paddingLeft: 16
    },
    buttonIcon: {
        width: SEARCH_FORM_HEIGHT,
        height: SEARCH_FORM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 2,
        right: 36
    },
    button: {
        width: SEARCH_FORM_HEIGHT,
        height: SEARCH_FORM_HEIGHT
    },
    input: {
        width: '100%',
        height: SEARCH_FORM_HEIGHT,
        backgroundColor: '#fff',
        color: '#707070',
        paddingLeft: 8,
        borderRadius: 8
    }
});
