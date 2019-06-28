import React from 'react';
import { Image, Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { DEVICE_WIDTH } from '../../commons/LayoutCommon';

export default class ProductItemModule extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let product = this.props.value;
        return( 
            <TouchableHighlight style={ProductItemModuleStyles.contain} 
                onPress={this.props.onPress.bind(this, product._id)} 
                underlayColor="transparent">
                <View style={ProductItemModuleStyles.content}>
                    <Image style={ProductItemModuleStyles.image} 
                        source={product.image.source} />
                    {(product.name.length <= 16) ? 
                        (<Text style={ProductItemModuleStyles.name} numberOfLines={1}>
                            {product.name}
                        </Text>)
                        : 
                        (<Text style={ProductItemModuleStyles.name} numberOfLines={2}>
                            {product.name}
                        </Text>)
                    }
                    <Text style={ProductItemModuleStyles.price}>
                        <Text style={ProductItemModuleStyles.priceDisplay}>
                            {product.salePrice.toLocaleString('vi')}
                        </Text>đ / 
                        <Text style={ProductItemModuleStyles.unitPrice}>
                            {product._unit[0].name}
                        </Text>
                    </Text>
                    <Text style={{fontSize: 12, textDecorationLine: 'line-through'}}>
                        {product.inputPrice.toLocaleString('vi')}đ
                    </Text>
                    {(product.saleOff != 0) ?
                        (<View style={ProductItemModuleStyles.labelSale}>
                            <Text style={ProductItemModuleStyles.salePercent}>
                                -{product.salePercent}%
                            </Text>
                        </View>)
                    : null}
                </View>
            </TouchableHighlight>
        )
    }
}

const ProductItemModuleStyles = StyleSheet.create({
    contain: {
        height: 240, 
        width: DEVICE_WIDTH/2 - 19, 
        backgroundColor: '#fff', 
        alignItems: 'center', 
        position: 'relative', 
        margin: 5, 
        borderRadius: 8
    },
    content: {padding: 5},
    image: {
        width: DEVICE_WIDTH/2 - 36, 
        height: 160, 
        resizeMode: 'contain', 
        alignSelf: 'center'
    },
    name: {
        fontSize: 14, 
        height: 36, 
        fontWeight: 'bold'
    },
    price: {
        color: '#D8260E'
    },
    priceDisplay: {
        fontWeight: 'bold'
    },
    labelSale: {
        position: 'absolute',
        top: 0, 
        left: -3, 
        paddingTop: 6, 
        paddingBottom: 6, 
        paddingLeft: 12, 
        paddingRight: 12, 
        backgroundColor: '#D8260E',
        borderTopLeftRadius: 8, 
        borderBottomRightRadius: 8
    },
    unitPrice: {textTransform: 'lowercase'},
    salePercent: {
        color: '#fff', 
        padding: 0, 
        fontWeight: 'bold'
    }
});