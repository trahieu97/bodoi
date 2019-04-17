import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View, Text,
    TextInput, Image, StatusBar, TouchableHighlight, AsyncStorage} from 'react-native';
import Loading from '../../components/Loading';

import { HEADER_TOP_BAR_HEIGHT, DEVICE_WIDTH } from '../../commons/LayoutCommon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRICE_COLOR, GREEN, BG_COLOR_GRAY, BG_COLOR_WHITE } from '../../commons/ColorCommon';

const OrderItem = ({item, onPressDelete, onPressPlus, onPressDiv}) => {
    let total = item.product.salePrice * item.quantity;
    return (
    <View style={UserOrderScreenStyles.item}>
        <View style={UserOrderScreenStyles.itemLeft}>
            <Image source={item.product.image.source} style={UserOrderScreenStyles.image}/>
        </View>
        <View style={UserOrderScreenStyles.itemCenter}>
            <View style={UserOrderScreenStyles.itemSpace}>
                <Text style={UserOrderScreenStyles.boldDisplay}>{item.product.name}</Text>
            </View>
            <View style={UserOrderScreenStyles.itemSpace}>
                <Text>                     
                    <Text style={UserOrderScreenStyles.price}>
                        <Text style={UserOrderScreenStyles.boldDisplay}>
                            {item.product.salePrice.toLocaleString('vi')}
                        </Text>đ /
                        <Text style={UserOrderScreenStyles.unitPrice}>
                            {item.product._unit[0].name}
                        </Text>
                    </Text>
                </Text>
                <Text>
                    <Text> x {item.quantity} = </Text>
                    <Text style={UserOrderScreenStyles.price}>
                        <Text style={UserOrderScreenStyles.boldDisplay}>
                            {total.toLocaleString('vi')}
                        </Text>đ
                    </Text>
                </Text>
            </View>
            <View style={UserOrderScreenStyles.addNum}>
                <TouchableHighlight style={UserOrderScreenStyles.buttonDiv}
                    onPress={onPressDiv} underlayColor="transparent">
                    <Text style={UserOrderScreenStyles.buttonDivPlusText}>-</Text>
                </TouchableHighlight>
                <View style={UserOrderScreenStyles.quantityCart}>
                <Text style={UserOrderScreenStyles.quantityCartText}>{item.quantity}</Text>
                </View>
                <TouchableHighlight style={UserOrderScreenStyles.buttonPlus}
                    onPress={onPressPlus} underlayColor="transparent">
                    <Text style={UserOrderScreenStyles.buttonDivPlusText}>+</Text>
                </TouchableHighlight>
            </View>
        </View>
        <View style={UserOrderScreenStyles.itemRight}>
            <TouchableHighlight style={UserOrderScreenStyles.buttonDel}
                onPress={onPressDelete} underlayColor="transparent">
                <Text style={{color: PRICE_COLOR, fontWeight: 'bold'}}>x</Text>
            </TouchableHighlight>
        </View>
    </View>)};

export default class CartScreen extends React.Component {
    static navigationOptions = {
        title: 'Giỏ hàng'
    };
  
    constructor(props) {
        super(props);
        this.state = {
            cartList: [],
            totalSum: 0,
            loading: true,
            errorLoading: null
        };
        this.getCartList = async () => {
            try {
                let cartForm = JSON.parse(await AsyncStorage.getItem("cart"));
                if (cartForm.length > 0) {
                    let totalSum = cartForm.reduce((sum, item) => (sum + item.product.salePrice * item.quantity), 0);
                    this.setState({cartList: cartForm, loading: false, totalSum: totalSum});
                } else {
                    this.setEmptyCartMessage();
                }
            } catch (error) {
                this.setState({errorLoading: 'Có lỗi gì đó xãy ra. Vui lòng thử lại sau', loading: true});
            }
        };

        this.updateCartList = async () => {
            try {
                await AsyncStorage.setItem("cart", JSON.stringify(this.state.cartList));
                let totalSum = this.state.cartList.reduce((sum, item) => (sum + item.product.salePrice * item.quantity), 0);
                this.setState({totalSum: totalSum});
            } catch (error) {
                console.log('Error: ' + error);
            }
        };

        this._removeCartItem = this._removeCartItem.bind(this);
        this._divCartItem = this._divCartItem.bind(this);
        this._plusCartItem = this._plusCartItem.bind(this);
    }

    setEmptyCartMessage() {
        this.setState({errorLoading: 'Bạn chưa thêm sản phẩm nào vào giỏ hàng cả', loading: true});
    }

    _removeCartItem(productId) {
        let cartList = this.state.cartList;
        cartList.splice(cartList.indexOf(cartList.find(item => item.product._id == productId)), 1);
        this.setState({cartList: cartList});
        this.updateCartList();
        if (this.state.cartList.length <= 0) {
            this.setEmptyCartMessage();
        }
    }

    _divCartItem(productId, min) {
        this.executeDivPlusItemCart(productId, min, 'div');
    }

    _plusCartItem(productId, min) {
        this.executeDivPlusItemCart(productId, min, 'plus');
    }

    executeDivPlusItemCart(productId, min, type) {
        let cartList = this.state.cartList;
        let cartItem = cartList.find(item => item.product._id == productId);
        let currentQuantity = cartItem.quantity;
        if (type === 'plus' && cartItem.quantity >= min) {
            cartItem.quantity += min;
        }
        if (type === 'div' && cartItem.quantity > min) {
            cartItem.quantity -= min;
        }
        if (currentQuantity != cartItem.quantity) {
            this.setState({cartList: cartList});
            this.updateCartList();
        }
    }

    componentDidMount() {
        this.getCartList();
    }

    render() {
        if (this.state.loading) {
            return <Loading message={this.state.errorLoading} navigation={this.props.navigation}/>
        }
        const cartList = this.state.cartList;
        // console.log(cartList)
        const displayStatus = {
            'none' : 'Chưa tiếp nhận',
            'accept' : 'Đã tiếp nhận'
        };
        return (
            <View style={UserOrderScreenStyles.container}>
                <StatusBar barStyle='default'/>
                <ScrollView style={{padding: 8}}>
                    {cartList.map((item, i) => (
                        <OrderItem key={i} item={item} 
                            onPressDelete={() => this._removeCartItem(item.product._id)} 
                            onPressDiv={() => this._divCartItem(item.product._id, item.product._unit[0].minUnit)} 
                            onPressPlus={() => this._plusCartItem(item.product._id, item.product._unit[0].minUnit)} 
                            displayStatus={displayStatus} />
                    ))}
                </ScrollView>
                <KeyboardAvoidingView behavior="position" scrollEnabled={true}>
                <View style={{position: 'relative', width: DEVICE_WIDTH, height: 150, bottom: 0, backgroundColor: '#fff', borderTopWidth: 0.5, borderTopColor: BG_COLOR_GRAY}}>
                    <View style={{width: DEVICE_WIDTH, alignItems: 'center', paddingTop: 16, paddingBottom: 16, paddingLeft: 24, paddingRight: 24}}>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput style={{width: 180, height: 40, borderWidth: 0.5, marginRight: 8, borderColor: GREEN, paddingLeft: 8}}/>
                            <TouchableHighlight style={{height: 40, width: 90, marginLeft: 8, backgroundColor: '#056839', 
                                justifyContent: 'center', alignItems: 'center'}} 
                                underlayColor="transparent">
                                <Text style={{color: '#fff'}}>Áp dụng</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'row', padding: 8}}>
                                <Text>Tạm tính: </Text>
                                <Text style={UserOrderScreenStyles.price}>
                                    <Text style={UserOrderScreenStyles.boldDisplay}>
                                        {this.state.totalSum.toLocaleString('vi')}
                                    </Text>đ
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableHighlight style={{height: 40, width: 180, marginLeft: 8, backgroundColor: '#056839', 
                                justifyContent: 'center', alignItems: 'center'}} 
                                onPress={() => this.props.navigation.navigate('ShippingAddressScreen')}
                                underlayColor="transparent">
                                <Text style={{color: '#fff'}}>Tiến hành đặt hàng</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const UserOrderScreenStyles = StyleSheet.create({
    container: {
      width: DEVICE_WIDTH,
      flex: 1,
      paddingBottom: 0,
      backgroundColor: BG_COLOR_GRAY,
    },
    itemLeft: {
      width: '30%',
      paddingRight: 8
    },
    itemCenter: {
      width: '65%'
    },
    itemRight: {
      width: '5%'
    },
    buttonDel: {
      position: 'absolute',
      height: 16, 
      width: 16,
      right: 8,
      top: 8
    },
    input: {
      width: '100%',
      alignSelf: 'center',
      height: 40, 
      marginTop: 8,
      borderColor: GREEN, 
      borderWidth: 0.5, 
      paddingLeft: 8,
      borderRadius: 8
    },
    image: {
      width: 80,
      minHeight: 80,
      resizeMode: 'contain', 
      alignSelf: 'center',
    },
    item: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        padding: 8,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: BG_COLOR_GRAY,
        backgroundColor: BG_COLOR_WHITE
    },
    itemSpace: {
        marginTop: 3,
        marginBottom: 3
    },
    addNum: {
        flexDirection: 'row',
    },
    price: {
        color: PRICE_COLOR
    },
    unitPrice: {textTransform: 'lowercase'},
    boldDisplay: {
        fontWeight: 'bold',
    },
    statusNone: {
        color: PRICE_COLOR,
        fontWeight: 'bold'
    },
    statusInprocess: {
        color: '#FAC917',
        fontWeight: 'bold'
    },
    statusShipping: {
        color: '#2680EB',
        fontWeight: 'bold'
    },
    statusCancel: {
        color: PRICE_COLOR,
        fontWeight: 'bold'
    },
    statusSuccess: {
        color: '#1BC597',
        fontWeight: 'bold'
    },
    buttonDiv: {
        height: 24, 
        width: '20%',
        backgroundColor: BG_COLOR_GRAY, 
        justifyContent: 'center', 
        alignSelf: 'flex-end', 
        alignItems: 'center'
    },
    buttonPlus: {
        height: 24, 
        width: '20%',
        backgroundColor: BG_COLOR_GRAY, 
        justifyContent: 'center', 
        alignSelf: 'flex-end', 
        alignItems: 'center'
    },
    buttonDivPlusText: {
        color: '#999',
        fontSize: 18,
        fontWeight: 'bold'
    },
    quantityCart: {
      width: '25%',
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: BG_COLOR_GRAY
    },
    quantityCartText: {
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center'
    },
});