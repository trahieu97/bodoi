import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from '../../commons/LayoutCommon';

export default class TitleBarModule extends React.Component {

    render() {
        return( 
            <Text style={TitleBarModuleStyles.contain}>
                {this.props.title}
            </Text>
        )
    }
}

const TitleBarModuleStyles = StyleSheet.create({
    contain: {
        color: '#000', 
        width: '100%', 
        height: 80, 
        paddingTop: 32, 
        paddingLeft: 24, 
        fontSize: 16
    }
});