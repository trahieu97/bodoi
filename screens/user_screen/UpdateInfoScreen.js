import React from 'react';
import { ScrollView, StyleSheet, View, Text,
  Modal, TextInput, StatusBar, TouchableHighlight, Picker} from 'react-native';
// import ImagesCarousel from '../components/modules/product/DetailImageScroll';

import { HEADER_TOP_BAR_HEIGHT, DEVICE_WIDTH } from '../../commons/LayoutCommon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BG_COLOR_GRAY, GREEN } from '../../commons/ColorCommon';

const Title = ({name}) => (
  <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', paddingBottom: 8}}>{name}</Text>
);

const ComboBoxModal = ({itemList, selectedValue, isVisible, type, onValueChange}) => (
          <Modal animationType="slide" transparent={true}
                visible={isVisible}>
            <View style={UpdateInfoScreenStyles.comboboxModal}>
              <View style={UpdateInfoScreenStyles.comboboxModalView}>
                <Picker 
                  selectedValue={selectedValue}
                  style={{height: 50, width: '100%', 
                  justifyContent: 'center', backgroundColor: '#fff'}}
                  onValueChange={onValueChange}>
                  {itemList.map((item, i) => (
                    <Picker.Item key={i} label={item.itemValue} value={item.itemCode} />
                  ))}
                </Picker>
              </View>
            </View>
          </Modal>
);

export default class UpdateInfoScreen extends React.Component {
  static navigationOptions = {
    title: 'Chỉnh sửa thông tin cá nhân'
  };
  
  constructor(props) {
    super(props);
    this._pressUpdate = this._pressUpdate.bind(this);
    this._setVisibleModal = this._setVisibleModal.bind(this);
    this.state = {
      user: this.getUser(),
      provinces: [
        { 
          itemCode : '00',
          itemValue: 'Tỉnh/Thành phố'
        },
        { 
          itemCode : '01',
          itemValue: 'Quảng Nam'
        },
        {
          itemCode : '02',
          itemValue : 'Đà Nẵng'
        }
      ],
      districts: {
        init: [
          {
            itemCode: '00000',
            itemValue: 'Quận/Huyện',
            provinceCode: '00'
          }, 
          {
            itemCode: '01001',
            itemValue: 'Thăng Bình',
            provinceCode: '01'
          },  
          {
            itemCode: '01002',
            itemValue: 'Đại Lộc',
            provinceCode: '01'
          },  
          {
            itemCode: '02001',
            itemValue: 'Hải Châu',
            provinceCode: '02'
          }
        ],
        search: [{
          itemCode : '',
          itemValue :'Quận/Huyện'
        }]
      },
      wards: {
        init: [
          {
            itemCode: '000000000',
            itemValue: 'Xã/Phường',
            districtCode: '00000'
          },
          {
            itemCode: '010010001',
            itemValue: 'Bình Định Bắc',
            districtCode: '01001'
          },  
          {
            itemCode: '01001002',
            itemValue: 'Bình Định Nam',
            districtCode: '01001'
          },
          {
            itemCode: '02001001',
            itemValue: 'Thanh Bình',
            districtCode: '02002'
          }
        ],
        search: [{
          itemCode : '',
          itemValue :'Xã/Phường'
        }]
      },
      modalProvinceVisible: false,
      modalDistrictVisible: false,
      modalWardVisible: false
    };
  }

  getUser() {
    let user = {
      name: 'Hoàng Anh Tuấn',
      phone: '0123456789',
      storeName: 'Kem Xoi chu Bo Doi',
      address: '123 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
      avatar: '',
      province: {
        itemCode : '',
        itemValue : 'Tỉnh/Thành phố'
      },
      district: {
        itemCode : '',
        itemValue : 'Quận/Huyện'
      },
      ward: {
        itemCode : '',
        itemValue :'Xã/Phường'
      },
      address: ''
    };
    return user;
  }

  _pressUpdate() {
    const {navigate} = this.props.navigation;
    navigate('UpdateInfoScreen');
  }

  _setVisibleModal(isVisible, type) {
    switch (type) {
      case 'province' : this.setState({modalProvinceVisible : isVisible}); break;
      case 'district' : this.setState({modalDistrictVisible : isVisible}); break;
      case 'ward' : this.setState({modalWardVisible : isVisible}); break;
    }
  }

  _handleChangeComboBox(value, type) {
    switch (type) {
      case 'province' : {
        let list = this.state.provinces;
        let districts = this.state.districts.init;
        let item = list.find(function(item) {
          return item.itemCode == value;
        });
        this.state.user.province = item;
        this.state.modalProvinceVisible = false;
        this.state.districts.search = districts.filter(item => item.provinceCode == value 
          || item.provinceCode == '00');
        this.state.user.district.itemValue = 'Quận/Huyện';
        this.setState(this.state);
      } break;
      case 'district' : {
        let list = this.state.districts.search;
        let wards = this.state.wards.init;
        let item = list.find(function(item) {
          return item.itemCode == value;
        });
        this.state.user.district = item;
        this.state.modalDistrictVisible = false;
        this.state.wards.search = wards.filter(item => item.districtCode == value 
          || item.districtCode == '00000');
        this.state.user.ward.itemValue = 'Xã/Phường';
        this.setState(this.state);
      } break;
      case 'ward' : {
        let list = this.state.wards.search;
        let item = list.find(function(item) {
          return item.itemCode == value;
        });
        this.state.user.ward = item;
        this.state.modalWardVisible = false;
        this.setState(this.state);
      } break;
    }
  }
  
  render() {
    const user = this.state.user;
    const provinces = this.state.provinces;
    const districts = this.state.districts.search;
    const wards = this.state.wards.search;
    return (
      <ScrollView style={UpdateInfoScreenStyles.container}>
        <StatusBar barStyle='default'/>
        <Title name='Chỉnh sửa thông tin cá nhân:' />
        <View style={{paddingBottom: 16, flexDirection: 'row'}}>
          <View style={{width: (DEVICE_WIDTH - 32)*0.3}}>
            <Text>
              Avatar
            </Text>
          </View>
          <View style={{width: (DEVICE_WIDTH - 32)*0.7}}>
            <TextInput style={UpdateInfoScreenStyles.input} placeholder="Họ tên"
              onChangeText={(value) => { this.state.user.name = value; this.setState(this.state)}} 
              value={this.state.user.name}
            />
            <TextInput style={UpdateInfoScreenStyles.input} placeholder="Số điện thoại"
              onChangeText={(value) => { this.state.user.phone = value; this.setState(this.state)}} 
              value={this.state.user.phone}
            />
          </View>
        </View>
        <View>
          <TextInput style={UpdateInfoScreenStyles.input} placeholder="Tên quán"
              onChangeText={(value) => { this.state.user.storeName = value; this.setState(this.state)}} 
              value={this.state.user.storeName}
            />
          <TouchableHighlight style={UpdateInfoScreenStyles.combobox}
            onPress={() => this._setVisibleModal(true, 'province')} underlayColor="transparent">
            <View>
              <Text style={UpdateInfoScreenStyles.comboboxContent}>
                {this.state.user.province.itemValue}
              </Text>
              <Icon name="menu-down" style={UpdateInfoScreenStyles.comboboxIcon} size={24} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={UpdateInfoScreenStyles.combobox} disabled={(districts.length > 1) ? false : true}
            onPress={() => this._setVisibleModal(true, 'district')} underlayColor="transparent">
            <View>
              <Text style={UpdateInfoScreenStyles.comboboxContent}>
                {this.state.user.district.itemValue}
              </Text>
              <Icon name="menu-down" style={UpdateInfoScreenStyles.comboboxIcon} size={24} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={UpdateInfoScreenStyles.combobox} disabled={(wards.length > 1) ? false : true}
            onPress={() => this._setVisibleModal(true, 'ward')} underlayColor="transparent">
            <View>
              <Text style={UpdateInfoScreenStyles.comboboxContent}>
                {this.state.user.ward.itemValue}
              </Text>
              <Icon name="menu-down" style={UpdateInfoScreenStyles.comboboxIcon} size={24} />
            </View>
          </TouchableHighlight>
          <ComboBoxModal itemList={provinces} 
                onValueChange={(value, index) => {
                  this._handleChangeComboBox(value, 'province');
                }}
                selectedValue={this.state.user.province.itemCode} 
                isVisible={this.state.modalProvinceVisible} />
          {(districts != null) ? (
          <ComboBoxModal itemList={districts} 
            onValueChange={(value, index) => {
              this._handleChangeComboBox(value, 'district');
            }}
            selectedValue={this.state.user.district.itemCode} 
            isVisible={this.state.modalDistrictVisible} />) : null }
          {(wards != null) ? (
          <ComboBoxModal itemList={wards} 
            onValueChange={(value, index) => {
              this._handleChangeComboBox(value, 'ward');
            }}
            selectedValue={this.state.user.ward.itemCode} 
            isVisible={this.state.modalWardVisible} />) : null }
          <TextInput style={UpdateInfoScreenStyles.input} placeholder="Địa chỉ"
              onChangeText={(value) => { this.state.user.address = value; this.setState(this.state)}} 
              value={this.state.user.address}
            />
        </View>
        <TouchableHighlight style={UpdateInfoScreenStyles.button}
            onPress={this._pressUpdate} underlayColor="transparent">
            <Text style={{color: '#FFFFFF'}}>Cập nhật</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

const UpdateInfoScreenStyles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  button: {
    height: 40, 
    width: '50%', 
    marginTop: 16, 
    backgroundColor: GREEN, 
    justifyContent: 'center', 
    alignSelf: 'center', 
    alignItems: 'center'
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
  combobox: {
    width: '100%', 
    position: 'relative',
    marginTop: 8
  },
  comboboxContent: {
    width: '100%', 
    height: 40, 
    paddingLeft: 8, 
    lineHeight: 40,
    borderWidth: 0.5, 
    borderColor: GREEN, 
    borderRadius: 8
  },
  comboboxIcon: {
    position: 'absolute', 
    right: 8, 
    top: 8
  }, 
  comboboxModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    bottom: 50,
    alignItems: 'center'
  },
  comboboxModalView: {
    width: '100%',
    height: 45, backgroundColor: '#fff',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#ccc'
  }
});
