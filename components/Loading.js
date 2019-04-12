import React from 'react';
import { StatusBar, View, Image } from 'react-native';

export default class Loading extends React.Component {
  render() {
    return (
        <View>
            <StatusBar barStyle='default'/>
            <View style={{alignItems: 'center', height: '100%', justifyContent: 'center'}}>
                <Image source={require('../assets/images/loading.gif')} />
            </View>
        </View>
    );
  }
}