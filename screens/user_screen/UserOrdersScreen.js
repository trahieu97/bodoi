import React from 'react';
import { ScrollView, StyleSheet, View, Text,
    StatusBar, TouchableHighlight, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import ImagesCarousel from '../components/modules/product/DetailImageScroll';

import { DEVICE_WIDTH } from '../../commons/LayoutCommon';
import { PRICE_COLOR, GREEN, BG_COLOR_GRAY, BG_COLOR_WHITE } from '../../commons/ColorCommon';

import moment from 'moment';
import API from '../../constants/Api';
import Loading from '../../components/Loading';

const OrderItem = ({index, item, displayStatus}) => (
    <View style={(index%2 === 0) ? UserOrderScreenStyles.item : UserOrderScreenStyles.itemEven}>
        <View style={UserOrderScreenStyles.itemSpace}>
            <Text style={UserOrderScreenStyles.boldDisplay}>Đơn hàng #BD{item.orderNo}</Text>
        </View>
        <View style={UserOrderScreenStyles.itemSpace}>
            <Text>Ngày tạo:&nbsp;<Text style={UserOrderScreenStyles.boldDisplay}>{moment(item.createDate).format('HH:mm:ss - DD/MM/YYYY')}</Text></Text>
        </View>
        <View style={UserOrderScreenStyles.itemSpace}>
            <Text>Tổng tiền:&nbsp;                 
                <Text style={UserOrderScreenStyles.price}>
                    <Text style={UserOrderScreenStyles.boldDisplay}> {item.paymentPrice.toLocaleString('vi')}
                    </Text>đ
                </Text>
            </Text>
        </View>
        <View style={UserOrderScreenStyles.itemSpace}>
            <Text style={{lineHeight: 20}}>Trạng thái:&nbsp;</Text>
                <View style={
                    (item.status == 'PENDDING') ? UserOrderScreenStyles.statusNone 
                    : (item.status == 'ACCEPTED') ? UserOrderScreenStyles.statusAccepted
                    : (item.status == 'PREPARING') ? UserOrderScreenStyles.statusInprocess
                    : (item.status == 'SHIPPING') ? UserOrderScreenStyles.statusShipping
                    : (item.status == 'DONE') ? UserOrderScreenStyles.statusSuccess
                    : (item.status == 'CANCEL') ? UserOrderScreenStyles.statusCancel : null
                }><Text style={{color: '#fff', fontWeight: 'bold'}}>&nbsp;{displayStatus[item.status]}&nbsp;</Text></View>
        </View>
        <TouchableHighlight style={UserOrderScreenStyles.buttonRebuy}
            onPress={this._pressUpdate} underlayColor="transparent">
            <Text style={{color: PRICE_COLOR, fontWeight: 'bold'}}>
                <Icon name="reload"
                    color="#337ab7" size={24}/>
            </Text>
        </TouchableHighlight>
        <TouchableHighlight style={UserOrderScreenStyles.buttonCancel}
            onPress={this._pressUpdate} underlayColor="transparent">
            <Text style={{color: PRICE_COLOR, fontWeight: 'bold'}}>
                <Icon name="close"
                    color="red" size={24}/>
            </Text>
        </TouchableHighlight>
    </View>
);

export default class ChangePasswordScreen extends React.Component {
    static navigationOptions = {
        title: 'Đơn hàng của bạn'
    };

    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            loading: true
        };
    }

    componentDidMount() {
        fetch(API.GET_ALL_ORDER, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: 'dkjflkewfleflewlfijewifjiweof'
            })
        })
        .then(async (response) => {
            if (response.status === 200) {
                let body = JSON.parse(response._bodyInit);
                let data =  body.data;
                this.setState({orderList: data, loading: false})
            } else {
                Alert.alert('Thông báo', 'Không thể truy xuất đơn hàng. Vui lòng thử lại sau');
                this.setState({loading: false});
            }
        }).catch(() => {
            Alert.alert('Thông báo', 'Không thể truy xuất đơn hàng. Vui lòng thử lại sau');
            this.setState({loading: false});
        }); 
    }

    render() {
        if (this.state.loading) {
            return <Loading message={this.state.errorLoading} navigation={this.props.navigation}/>
        }
        const orderList = this.state.orderList;
        const displayStatus = {
            'PENDDING' : 'Chưa tiếp nhận',
            'ACCEPTED' : 'Đã tiếp nhận',
            'PREPARING' : 'Đang xử lý',
            'CANCEL' : 'Đã huỷ',
            'SHIPPING' : 'Đang giao hàng',
            'DONE' : 'Đã hoàn thành'
        };
        return (
            <View style={UserOrderScreenStyles.container}>
                <StatusBar barStyle='default'/>
                <ScrollView>
                    {orderList.map((item, i) => (
                        <OrderItem key={i} item={item} displayStatus={displayStatus} index={i} />
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
    buttonRebuy: {
        position: 'absolute',
        height: 24, 
        width: 24,
        right: 8,
        top: 40
    },
    buttonCancel: {
        position: 'absolute',
        height: 24, 
        width: 24,
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
        backgroundColor: '#eee'
    },
    itemEven: {
        width: '100%',
        height: 'auto',
        padding: 8,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: BG_COLOR_GRAY,
        backgroundColor: '#f9f9f9'
    },
    itemSpace: {
        flexDirection:'row',
        flexWrap:'wrap',
        height: 20,
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
        backgroundColor: PRICE_COLOR,
        height: 20,
        borderWidth: 0.5,
        borderColor: '#fff',
        paddingLeft: 3,
        paddingRight: 3,
        lineHeight: 20,
        borderRadius: 8
    },
    statusInprocess: {
        backgroundColor: '#f39c12',
        height: 20,
        borderWidth: 0.5,
        borderColor: '#fff',
        paddingLeft: 3,
        paddingRight: 3,
        lineHeight: 20,
        borderRadius: 8
    },
    statusShipping: {
        backgroundColor: '#2680EB',
        height: 20,
        borderWidth: 0.5,
        borderColor: '#fff',
        paddingLeft: 3,
        paddingRight: 3,
        lineHeight: 20,
        borderRadius: 8
    },
    statusCancel: {
        backgroundColor: '#666',
        height: 20,
        borderWidth: 0.5,
        borderColor: '#fff',
        paddingLeft: 3,
        paddingRight: 3,
        lineHeight: 20,
        borderRadius: 8
    },
    statusSuccess: {
        backgroundColor: '#00a65a',
        height: 20,
        borderWidth: 0.5,
        borderColor: '#fff',
        paddingLeft: 3,
        paddingRight: 3,
        lineHeight: 20,
        borderRadius: 8
    },
    statusAccepted: {
        backgroundColor: '#00BCD4',
        height: 20,
        borderWidth: 0.5,
        borderColor: '#fff',
        paddingLeft: 3,
        paddingRight: 3,
        lineHeight: 20,
        borderRadius: 8
    }
});