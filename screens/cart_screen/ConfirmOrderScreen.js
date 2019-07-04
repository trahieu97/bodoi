import React from 'react';
import { ScrollView, StyleSheet, View, Text, Alert, StatusBar, TouchableHighlight} from 'react-native';
// import ImagesCarousel from '../components/modules/product/DetailImageScroll';

import { HEADER_TOP_BAR_HEIGHT, DEVICE_WIDTH } from '../../commons/LayoutCommon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BG_COLOR_GRAY, GREEN, LINK } from '../../commons/ColorCommon';
import Loading from '../../components/Loading';
import API from '../../constants/Api'; 

const Title = ({name}) => (
    <Text style={ConfirmOrderStyles.title}>{name}</Text>
);

const Label = ({label, value}) => (
    <Text style={ConfirmOrderStyles.labelText}>{label}: 
        <Text style={ConfirmOrderStyles.valueTextLabel}> {value}</Text>
    </Text>
);

const RadioButton = ({status}) => (
    <View style={RadioButtonStyles.radioButton}>
    { (status) ? (<View style={RadioButtonStyles.innerRadioButton} />) : null }
    </View>
);

const RadioButtonLabel = ({status, label, onPress}) => (
    <TouchableHighlight
        onPress={onPress} underlayColor="transparent">
        <View style={{flexDirection: 'row', paddingTop: 6, paddingBottom: 6}}>
            <RadioButton status={status} />
            <Text> {label}</Text>
        </View>
    </TouchableHighlight>
);


const ItemRow = ({item}) => (
  <View>
    <View style={{width: '100%', padding: 8, alignItems: 'flex-start', justifyContent: 'center', borderWidth: 0.5, borderColor: '#E4E4E4'}}>
        <View style={ConfirmOrderStyles.itemSpace}>
            <Text style={ConfirmOrderStyles.boldDisplay}>{item.product.name}</Text>
        </View>
        <View style={ConfirmOrderStyles.itemSpace}>
            <Text>                     
                <Text style={ConfirmOrderStyles.price}>
                    <Text style={ConfirmOrderStyles.boldDisplay}>
                        {item.product.salePrice.toLocaleString('vi')}
                    </Text>đ /
                    <Text style={ConfirmOrderStyles.unitPrice}>
                        {item.product._unit[0].name}
                    </Text>
                </Text>
            </Text>
            <Text>
                <Text> x {item.quantity} = </Text>
                <Text style={ConfirmOrderStyles.price}>
                                    <Text style={ConfirmOrderStyles.boldDisplay}>
                        {(item.quantity * item.product.salePrice).toLocaleString('vi')}
                </Text>đ
                </Text>
            </Text>
        </View>
    </View>
  </View>
);

export default class ConfirmOrderScreen extends React.Component {
  static navigationOptions = {
    title: 'Xác nhận đơn hàng'
  };

    constructor(props) {
        super(props);
        this._pressUpdate = this._pressUpdate.bind(this);
        this.state = {
            user: this.getUser(),
            shippingInfo: this.props.navigation.state.params.shippingInfo,
            promotionCode: this.props.navigation.state.params.promotionCode,
            cartList: [],
            promotionSaleOff: 0,
            loading: true,
            errorLoading: null,
            totalSum: 0,
            paymentMethod: null,
            radioPayment: {
                cod: true,
                momo: false
            }
        };

        this.getCartList = async () => {
            try {
                let cartForm = [];
                fetch(API.GET_ALL_CART_ITEM, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: 'dkjflkewfleflewlfijewifjiweof'
                    }),
                })
                .then(async (response) => {
                    if (response.status === 200) {
                        let body = JSON.parse(response._bodyInit);
                        let data =  body.data;
                        console.log(data)
                        if (data) {
                            cartForm = await data.cartList;
                            if (cartForm.length > 0) {
                                let totalSum = cartForm.reduce((sum, item) => (sum + item.product.salePrice * item.quantity), 0);
                                this.setState({cartList: cartForm, loading: false, totalSum: totalSum});
                            }
                        } else {
                            this.setEmptyCartMessage();
                        }
                    } else {
                        this.setEmptyCartMessage();
                    }
                }).catch((error) => {
                    Alert.alert('Thông báo', 'Có lỗi khuy truy xuất giỏ hàng');
                    console.error(error);
                });
            } catch (error) {
                console.log(error)
                this.setState({errorLoading: 'Có lỗi gì đó xãy ra. Vui lòng thử lại sau', loading: true});
            }
        };

        this._pressPaymentMethod = this._pressPaymentMethod.bind(this);
        this._executeOrder = this._executeOrder.bind(this);
        this._onApplyPromotionCode = this._onApplyPromotionCode.bind(this);
    }

    getUser() {
        let user = {
        name: 'Hoàng Anh Tuấn',
        phone: '0123456789',
        storeName: 'Kem Xoi chu Bo Doi',
        address: '123 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
        avatar: '',
        point: '123',
        totalMoney: 123000
        };
        return user;
    }

    _pressUpdate() {
    const {navigate} = this.props.navigation;
    navigate('UpdateInfoScreen');
    }

    _pressPaymentMethod(method) {
        this.setState({radioPayment: {
            cod: this.calculatorActivePayment('cod', method),
            momo: this.calculatorActivePayment('momo', method)
        }});
    }

    calculatorActivePayment(current, method) {
        return current === method;
    }

    componentWillMount() {
        this._onApplyPromotionCode();
    }

    componentDidMount() {
        this.getCartList();
    }

    _onApplyPromotionCode() {
        fetch(API.CHECK_PROMOTION_CODE, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: 'dkjflkewfleflewlfijewifjiweof',
                promotion_code: this.state.promotionCode
            }),
        })
        .then(async (response) => {
            if (response.status === 200) {
                let body = JSON.parse(response._bodyInit);
                let data =  body.data;
                if (data.promotion_code !== this.state.promotionCode) {
                    return;
                }
                let promotionSaleOff = this.state.promotionSaleOff;
                promotionSaleOff = (this.state.totalSum * data.percent/100)
                this.setState({promotionSaleOff})
            } else {
                this.setState({promotionSaleOff: 0})
            }
        }).catch(() => {
            this.setState({promotionSaleOff: 0})
        });
    }

    _executeOrder() {
        // listCartItem = 

        fetch('http://app-tratanhieu.herokuapp.com/order/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            }),
        })
        .then((response) => alert('Đặt hành thành công'))
        .catch((error) => {
            console.error(error);
        });
        

        const {navigate} = this.props.navigation;
        navigate('UsersOrdersScreen');
    }

    render() {
        if (this.state.loading) {
            return <Loading message={this.state.errorLoading} navigation={this.props.navigation}/>
        }
        const itemCartRender = [];
        const user = this.state.user;
        const cartList = this.state.cartList;
        console.log(this.state.promotionCode !== null)
    
        cartList.map((item, i) => {
            itemCartRender.push(<ItemRow key={i} item={item} />);
        });
        return (
            <ScrollView style={ConfirmOrderStyles.container}>
                <StatusBar barStyle='default'/>
                <Title name='Thông tin sản phẩm mua:' />
                <View>
                    {itemCartRender}
                </View>
                <View style={ConfirmOrderStyles.row}>
                    <Text style={ConfirmOrderStyles.title}>Tổng tiền: </Text>
                    <Text>
                        <Text style={ConfirmOrderStyles.price}>
                            <Text style={ConfirmOrderStyles.boldDisplay}>
                                {(this.state.totalSum - this.state.promotionSaleOff).toLocaleString('vi')}
                            </Text>đ
                        </Text>
                    </Text>
                </View>
                {(this.state.promotionCode !== null) ?
                    (<View style={ConfirmOrderStyles.row}>
                        <Text style={ConfirmOrderStyles.title}>Mã giảm giá: </Text>
                        <Text style={ConfirmOrderStyles.promotionCode}>{this.state.promotionCode}</Text>
                        <Text>
                            (<Text style={ConfirmOrderStyles.price}>
                                <Text style={ConfirmOrderStyles.boldDisplay}>
                                    -{(this.state.promotionSaleOff).toLocaleString('vi')}
                                </Text>đ
                            </Text>)
                        </Text>
                    </View>) : null
                }
                <View style={ConfirmOrderStyles.row}>
                    <Text style={ConfirmOrderStyles.title}>Số điểm hiện có: </Text>
                    <Text style={ConfirmOrderStyles.currentPoint}>123 </Text>
                    <Text>
                        = <Text style={ConfirmOrderStyles.price}>
                            <Text style={ConfirmOrderStyles.boldDisplay}>
                                {(128000).toLocaleString('vi')}
                            </Text>đ
                        </Text>
                    </Text>
                    <TouchableHighlight
                        onPress={() => alert('Ok')} underlayColor="transparent">
                        <Text style={{color: LINK, textDecorationLine: 'underline'}}> sử dụng</Text>
                    </TouchableHighlight>
                </View>
                <View style={ConfirmOrderStyles.row}>
                    <Title name='Giao đến: ' />
                </View>
                <View style={ConfirmOrderStyles.row}>
                    <View style={ConfirmOrderStyles.borderDefault}>
                        <Label label='Anh/Chị' value={this.state.shippingInfo.name} />
                        <Label label='Điện thoại' value={this.state.shippingInfo.phone} />
                        <Label label='Địa chỉ' value={`${this.state.shippingInfo.address}, ${this.state.shippingInfo.ward.itemValue}` + 
                                                        `, ${this.state.shippingInfo.district.itemValue}, ${this.state.shippingInfo.province.itemValue}`
                                                    } />
                        <Label label='Ghi chú' value={this.state.shippingInfo.note} />
                    </View>
                </View>
                <View style={ConfirmOrderStyles.row}>
                    <Text style={ConfirmOrderStyles.title}>Phí ship: </Text>
                    <Text>
                        <Text style={ConfirmOrderStyles.price}>
                            <Text style={ConfirmOrderStyles.boldDisplay}>
                                    {(15000).toLocaleString('vi')}
                            </Text>đ
                        </Text>
                    </Text>
                </View>
                <View style={ConfirmOrderStyles.row}>
                    <Text style={ConfirmOrderStyles.title}>Thành tiền: </Text>
                    <Text>
                        <Text style={ConfirmOrderStyles.price}>
                            <Text style={ConfirmOrderStyles.boldDisplay}>
                                {(128000).toLocaleString('vi')}
                            </Text>đ
                        </Text>
                    </Text>
                </View>
                <View style={ConfirmOrderStyles.row}>
                    <Text style={ConfirmOrderStyles.title}>Tích luỹ: </Text>
                    <Text><Text style={ConfirmOrderStyles.currentPoint}>11</Text> điểm</Text>
                </View>
                <Title name='Phương thức thanh toán:' />
                <RadioButtonLabel label='Thanh toán khi nhận hàng' status={this.state.radioPayment.cod}
                    onPress={() => this._pressPaymentMethod('cod')} />
                <RadioButtonLabel label='Thanh toán Momo' status={this.state.radioPayment.momo}
                    onPress={() => this._pressPaymentMethod('momo')} />
                <TouchableHighlight style={ConfirmOrderStyles.button}
                    onPress={() => this._executeOrder()} underlayColor="transparent">
                    <Text style={{color: '#FFFFFF'}}>Đặt hàng</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}


const RadioButtonStyles = StyleSheet.create({
    radioButton: {
        width: 16, 
        height: 16, 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 999, 
        borderWidth: 1, 
        borderColor: '#ccc',
    },
    innerRadioButton: {
        width: 8, 
        height: 8,
        backgroundColor: GREEN,
        borderRadius: 999
    }
});

const ConfirmOrderStyles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  currentPoint: {
    fontWeight: 'bold'
  },
  borderDefault: {
    borderWidth: 0.5,
    borderColor: BG_COLOR_GRAY
  },
  valueTextLabel: {
    fontWeight: 'bold'
  },
  labelText: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8
  },
  row: {
      flexDirection: 'row',
      marginTop: 8
  },
  promotionCode: {
      color: GREEN,
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
  },
  itemSpace: {
    flexDirection: 'row'
  },    
  button: {
    height: 40, 
    width: '50%', 
    marginTop: 16, 
    backgroundColor: '#056839', 
    justifyContent: 'center', 
    alignSelf: 'center', 
    alignItems: 'center',
    marginBottom: 100
  },
  boldDisplay: {
      fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    textDecorationLine: 'underline', 
    paddingBottom: 8
  }
});
