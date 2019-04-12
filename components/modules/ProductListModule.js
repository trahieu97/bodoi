import React from 'react';
import { Image, Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { DEVICE_WIDTH } from '../../commons/LayoutCommon';
import ProductItemModule from './ProductItemModule';

export default class ProductListModule extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let productList = this.props.dataSource;
        // console.log(productList);
        return( 
            <View style={ProductListModuleStyles.contain}>
                {productList.map((product, i) => (
                    <ProductItemModule onPress={this.props.onPress.bind(this, product._id)} key={i} value={product} />
                ))}
            </View>
        )
    }
}

const ProductListModuleStyles = StyleSheet.create({
    contain: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}
});