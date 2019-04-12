import React from 'react';
import { ScrollView, StyleSheet, View, Text, Button, StatusBar, TouchableHighlight} from 'react-native';
// import ImagesCarousel from '../components/modules/product/DetailImageScroll';

import { HEADER_TOP_BAR_HEIGHT, DEVICE_WIDTH } from '../../commons/LayoutCommon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BG_COLOR_GRAY } from '../../commons/ColorCommon';

const Title = ({name}) => (
  <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', paddingBottom: 8}}>{name}</Text>
);

const ItemRow = ({name, value}) => (
  <View style={{width: DEVICE_WIDTH - 32, flexDirection: 'row'}}>
    <View style={{width: '36%', height: 32, backgroundColor: '#E4E4E4', paddingLeft: 8, alignItems: 'flex-start', justifyContent: 'center', borderWidth: 0.5, borderColor: '#FFFFFF'}}>
      <Text>{name}</Text>
    </View>
    <View style={{width: '64%', height: 32, paddingLeft: 8, alignItems: 'flex-start', justifyContent: 'center', borderWidth: 0.5, borderColor: '#E4E4E4'}}>
      <Text numberOfLines={2}>{value}</Text>
    </View>
  </View>
);

export default class PersonalInfoScreen extends React.Component {
  static navigationOptions = {
    title: 'Thông tin cá nhân'
  };
  
  constructor(props) {
    super(props);
    this._pressUpdate = this._pressUpdate.bind(this);
    this.state = {
      user: this.getUser()
    };
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
  
  render() {
    const user = this.state.user;
    return (
      <ScrollView style={PersonalInfoScreenStyles.container}>
        <StatusBar barStyle='default'/>
        <Title name='Hoạt động:' />
        <View style={{paddingBottom: 16}}>
          <ItemRow name='Điểm tích luỹ' value={user.point} />
          <ItemRow name='Tổng chi tiêu' value={
              <Text style={PersonalInfoScreenStyles.price}>
                  <Text style={PersonalInfoScreenStyles.priceDisplay}>
                    {user.totalMoney.toLocaleString('vi')}
                  </Text>đ
              </Text>
          } />
        </View>
        <Title name='Thông tin:' />
        <View>
          <ItemRow name='Ảnh đại diện' value={user.avatar} />
          <ItemRow name='Họ tên' value={user.name} />
          <ItemRow name='Số điện thoại' value={user.phone} />
          <ItemRow name='Tên quán' value={user.storeName} />
          <ItemRow name='Địa chỉ' value={user.address} />
        </View>
        <TouchableHighlight style={PersonalInfoScreenStyles.button}
            onPress={this._pressUpdate} underlayColor="transparent">
            <Text style={{color: '#FFFFFF'}}>Chỉnh sửa</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

const PersonalInfoScreenStyles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
  button: {
    height: 40, 
    width: '50%', 
    marginTop: 16, 
    backgroundColor: '#056839', 
    justifyContent: 'center', 
    alignSelf: 'center', 
    alignItems: 'center'
  }
});
