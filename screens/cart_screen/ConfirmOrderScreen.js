import React from 'react';
import { ScrollView, StyleSheet, View, Text, AsyncStorage, StatusBar, TouchableHighlight} from 'react-native';
// import ImagesCarousel from '../components/modules/product/DetailImageScroll';

import { HEADER_TOP_BAR_HEIGHT, DEVICE_WIDTH } from '../../commons/LayoutCommon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BG_COLOR_GRAY, GREEN, LINK } from '../../commons/ColorCommon';
import Loading from '../../components/Loading';

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
        cartList: [],
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
            let cartForm = JSON.parse(await AsyncStorage.getItem("cart"));
            console.log("Cart" + cartForm);
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

    this._pressPaymentMethod = this._pressPaymentMethod.bind(this);
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

  componentDidMount() {
    this.getCartList();
  }
  
  render() {
    if (this.state.loading) {
        return <Loading message={this.state.errorLoading} navigation={this.props.navigation}/>
    }
    const itemCartRender = [];
    const user = this.state.user;
    const cartList = this.state.cartList;
    
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
        <Title name='Giao đến: ' />
        <View style={ConfirmOrderStyles.borderDefault}>
            <Label label='Anh/Chị' value='Hoàng Anh Tuấn' />
            <Label label='Điện thoại' value='0123456789' />
            <Label label='Tên quán' value='Kem xôi Chú Bộ Đội' />
            <Label label='Địa chỉ' value='123 Lý Tự Trọng, Q.Hải Châu, TP. Đà Nẵng' />
            <Label label='Ghi chú' value='1fwehffhksdkfhwkghkrhksehkghwerkhgiohiohsdh ưhihwio hio giơhiog hiohgo ioghio hewrigrger' />
         </View>
        <View style={ConfirmOrderStyles.row}>
            <Text style={ConfirmOrderStyles.title}>Mã giảm giá: </Text>
            <Text style={ConfirmOrderStyles.promotionCode}>ABCXYZ</Text>
            <Text>
                (<Text style={ConfirmOrderStyles.price}>
                    <Text style={ConfirmOrderStyles.boldDisplay}>
                        -{(128000).toLocaleString('vi')}
                    </Text>đ
                </Text>)
            </Text>
        </View>
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
            onPress={() => this.props.navigation.navigate('ShippingAddressScreen')} underlayColor="transparent">
            <Text style={{color: '#FFFFFF'}}>Tiếp tục</Text>
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
