import React from 'react';
import { Image, StyleSheet, TouchableHighlight, Button, Text, StatusBar, View, Platform} from 'react-native';
import HeaderTopBar from '../components/layouts/HeaderTopBar.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DEVICE_WIDTH, HEADER_TOP_BAR_HEIGHT} from '../commons/LayoutCommon';
import { BG_COLOR_GRAY, BG_COLOR_WHITE, TITLE_BAR_COLOR} from '../commons/ColorCommon';

export default class UserScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {text: 1};
    this._pressFunction = this._pressFunction.bind(this);
  }

  _increaseCount = () => {
    this.setState(previousState => (
      { text: previousState.text + 1 }
    ));
  };

  _pressFunction(type) {
    const {navigate} = this.props.navigation;
    switch (type) {
      case 'infomation' : navigate('PersonalInfoScreen'); break;
      case 'changepass' : navigate('ChangePasswordScreen'); break;
      case 'request' : navigate('RequestScreen'); break;
      case 'order' : navigate('UsersOrdersScreen'); break;
    }
  }

  render() {
    const user = {
      name: 'Hoàng Anh Tuấn',
      image: {
        source: {
          uri: 'https://hieutt30-server-app.herokuapp.com/assets/images/users/boy.png'
        }
      },
      phone: '123456789',
      point: 123
    };
    return (
      <View>
        <HeaderTopBar type="normal" title="Tài khoản"/>
        <View style={{marginTop: HEADER_TOP_BAR_HEIGHT, flexDirection: 'row', alignItems: 'center',
          backgroundColor: TITLE_BAR_COLOR, height: 100, borderBottomRightRadius: 8, borderBottomLeftRadius: 8,
          zIndex: 1
          }}>
          <View style={{width: DEVICE_WIDTH * 0.3, 
            alignItems: 'center', justifyContent: 'center', padding: 8}}>
            <View style={{width: 72, height: 72, 
            alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', borderWidth: 0.5, backgroundColor: '#fff'
            }}>
              <Image style={{width: 56, height: 56, resizeMode: 'cover'
              }} source={user.image.source} />
            </View>
          </View>
          <View style={{width: DEVICE_WIDTH * 0.7, padding: 8}}>
            <Text style={{fontWeight: 'bold', color: '#fff', height: 20}}>{user.name}</Text>
            <Text style={{color: '#fff', height: 20}}>Điện thoại: <Text style={{fontWeight: 'bold'}}>{user.phone}</Text></Text>
            <Text style={{color: '#fff', height: 20}}>Điểm tích luỹ: <Text style={{fontWeight: 'bold'}}>{user.point}</Text></Text>
          </View>
        </View>
        <View style={{height: 28, backgroundColor: BG_COLOR_GRAY, top: -8, zIndex: -1}} />
        <View style={{backgroundColor: BG_COLOR_WHITE, borderTopLeftRadius: 8, top: -8, padding: 16, paddingTop: 0}}>
        <TouchableHighlight style={{height: 42, width: '100%',
            justifyContent: 'center', alignItems: 'flex-start', borderBottomColor: BG_COLOR_GRAY, borderBottomWidth: 0.5}} 
            onPress={() => this._pressFunction('infomation')} 
            underlayColor="transparent">
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#000', width: '90%', justifyContent: 'center', alignItems: 'center'}}>Thông tin cá nhân</Text>
              <View style={{alignItems: 'center', width: '10%'}}>
                <Icon name="chevron-right" color={BG_COLOR_GRAY} size={40}/>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{height: 42, width: '100%',
            justifyContent: 'center', alignItems: 'flex-start', borderBottomColor: BG_COLOR_GRAY, borderBottomWidth: 0.5}} 
            onPress={() => this._pressFunction('changepass')} 
            underlayColor="transparent">
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#000', width: '90%', justifyContent: 'center', alignItems: 'center'}}>Đổi mật khẩu</Text>
              <View style={{alignItems: 'center', width: '10%'}}>
                <Icon name="chevron-right" color={BG_COLOR_GRAY} size={40}/>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{height: 42, width: '100%',
            justifyContent: 'center', alignItems: 'flex-start', borderBottomColor: BG_COLOR_GRAY, borderBottomWidth: 0.5}} 
            onPress={() => this._pressFunction('request')} 
            underlayColor="transparent">
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#000', width: '90%', justifyContent: 'center', alignItems: 'center'}}>Yêu cầu sản phẩm khác</Text>
              <View style={{alignItems: 'center', width: '10%'}}>
                <Icon name="chevron-right" color={BG_COLOR_GRAY} size={40}/>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{height: 42, width: '100%',
            justifyContent: 'center', alignItems: 'flex-start', borderBottomColor: BG_COLOR_GRAY, borderBottomWidth: 0.5}} 
            onPress={() => this._pressFunction('order')} 
            underlayColor="transparent">
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#000', width: '90%', justifyContent: 'center', alignItems: 'center'}}>Quản lý đơn hàng</Text>
              <View style={{alignItems: 'center', width: '10%'}}>
                <Icon name="chevron-right" color={BG_COLOR_GRAY} size={40}/>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

