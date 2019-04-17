import React from 'react';
import { StatusBar, View, Image, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { GREEN } from '../commons/ColorCommon';

export default class SuccessScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
        <View>
            <StatusBar barStyle='default'/>
            <View style={LoadingStyles.view}>
                { (this.props.message) ?
                <View style={LoadingStyles.error}>
                    <Text style={LoadingStyles.message}>{this.props.message}</Text>
                    <TouchableHighlight style={LoadingStyles.backButton}
                        onPress={() => navigate('Home')} underlayColor="transparent">
                        <Text style={{color: '#FFFFFF'}}>Trang chính</Text>
                    </TouchableHighlight>
                </View> :
                <Image source={require('../assets/images/loading.gif')} />}
            </View>
        </View>
    );
  }
}

const LoadingStyles = StyleSheet.create({
    view: {
        alignItems: 'center', 
        height: '100%', 
        padding: 48,
        justifyContent: 'center'
    },
    error: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 8
    },
    backButton: {
        height: 40, 
        width: 160,
        marginTop: 8, 
        backgroundColor: GREEN,
        justifyContent: 'center', 
        alignSelf: 'center', 
        alignItems: 'center'
    }
});