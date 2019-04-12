import React from 'react';
import { ScrollView, StyleSheet, View, Text,
  Modal, TextInput, StatusBar, TouchableHighlight, Picker} from 'react-native';
// import ImagesCarousel from '../components/modules/product/DetailImageScroll';

import { HEADER_TOP_BAR_HEIGHT, DEVICE_WIDTH } from '../../commons/LayoutCommon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRICE_COLOR, GREEN, BG_COLOR_GRAY, BG_COLOR_WHITE } from '../../commons/ColorCommon';

const OrderItem = ({item, displayStatus}) => (
    <View style={UserOrderScreenStyles.item}>
        <View style={UserOrderScreenStyles.itemSpace}>
            <Text style={UserOrderScreenStyles.boldDisplay}>Đơn hàng #{item.orderNo}</Text>
        </View>
        <View style={UserOrderScreenStyles.itemSpace}>
            <Text>Ngày tạo: <Text style={UserOrderScreenStyles.boldDisplay}>{item.createDate}</Text></Text>
        </View>
        <View style={UserOrderScreenStyles.itemSpace}>
            <Text>Tổng tiền:                      
                <Text style={UserOrderScreenStyles.price}>
                    <Text style={UserOrderScreenStyles.boldDisplay}> {item.totalMoney.toLocaleString('vi')}
                    </Text>đ
                </Text>
            </Text>
        </View>
        <View style={UserOrderScreenStyles.itemSpace}>
            <Text>Trạng thái:
                <Text style={
                    (item.status == 'none') ? UserOrderScreenStyles.statusNone 
                    : (item.status == 'inprocess') ? UserOrderScreenStyles.statusInprocess
                    : (item.status == 'shipping') ? UserOrderScreenStyles.statusShipping
                    : (item.status == 'done') ? UserOrderScreenStyles.statusSuccess
                    : (item.status == 'cancel') ? UserOrderScreenStyles.statusCancel : null
                }> {displayStatus[item.status]}</Text></Text>
        </View>
        <TouchableHighlight style={UserOrderScreenStyles.buttonDel}
            onPress={this._pressUpdate} underlayColor="transparent">
            <Text style={{color: PRICE_COLOR, fontWeight: 'bold'}}>x</Text>
        </TouchableHighlight>
    </View>
);

export default class ChangePasswordScreen extends React.Component {
    static navigationOptions = {
        title: 'Đơn hàng của bạn'
    };
  
    constructor(props) {
        super(props);
        this._getOrderList = this._getOrderList.bind(this);
        this.state = {
            orderList: this._getOrderList()
        };
    }

    _getOrderList() {
        let orderList = [
            {
                orderNo: '473978937548976',
                createDate: '22/11/2018',
                totalMoney: 30000,
                point: 8,
                status: 'done'
            },
            {
                orderNo: '#473978937548976',
                createDate: '22/11/2018',
                totalMoney: 30000,
                point: 8,
                status: 'inprocess'
            },
            {
                orderNo: '#473978937548976',
                createDate: '22/11/2018',
                totalMoney: 30000,
                point: 8,
                status: 'cancel'
            },
            {
                orderNo: '#473978937548976',
                createDate: '22/11/2018',
                totalMoney: 30000,
                point: 8,
                status: 'shipping'
            },
            {
                orderNo: '#473978937548976',
                createDate: '22/11/2018',
                totalMoney: 30000,
                point: 8,
                status: 'none'
            },
            {
                orderNo: '#473978937548976',
                createDate: '22/11/2018',
                totalMoney: 30000,
                point: 8,
                status: 'none'
            },
            {
                orderNo: '#473978937548976',
                createDate: '22/11/2018',
                totalMoney: 30000,
                point: 8,
                status: 'none'
            }
        ];
        return orderList;
    }

    render() {
        const orderList = this.state.orderList;
        const displayStatus = {
            'none' : 'Chưa xử lý',
            'inprocess' : 'Đang xử lý',
            'cancel' : 'Đã huỷ',
            'shipping' : 'Đang giao hàng',
            'done' : 'Đã hoàn thành'
        };
        return (
            <View style={UserOrderScreenStyles.container}>
                <StatusBar barStyle='default'/>
                <ScrollView>
                    {orderList.map((item, i) => (
                        <OrderItem key={i} item={item} displayStatus={displayStatus} />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const UserOrderScreenStyles = StyleSheet.create({
    container: {
      width: DEVICE_WIDTH,
      flex: 1,
      padding: 8,
      paddingBottom: 0,
      backgroundColor: BG_COLOR_GRAY,
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
    item: {
        width: '100%',
        height: 'auto',
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
    price: {
        color: PRICE_COLOR
    },
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
    }
  });