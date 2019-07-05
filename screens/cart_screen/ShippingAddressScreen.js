import React from 'react';
import { ScrollView, StyleSheet, View, Text,
  Modal, TextInput, StatusBar, TouchableHighlight, Picker, KeyboardAvoidingView, Alert} from 'react-native';
// import ImagesCarousel from '../components/modules/product/DetailImageScroll';

import { HEADER_TOP_BAR_HEIGHT, DEVICE_WIDTH } from '../../commons/LayoutCommon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BG_COLOR_GRAY, GREEN } from '../../commons/ColorCommon';
import API from '../../constants/Api';
import Loading from '../../components/Loading';

const Title = ({name}) => (
  <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', paddingBottom: 8, paddingTop: 8}}>{name}</Text>
);

const Label = ({label, value}) => (
    <Text style={UpdateInfoScreenStyles.labelText}>{label}: 
        <Text style={UpdateInfoScreenStyles.valueTextLabel}> {value}</Text>
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

export default class ShippingAddressScreen extends React.Component {
  static navigationOptions = {
    title: 'Địa chỉ giao hàng'
  };
  
  constructor(props) {
    super(props);
    this._pressConfirm = this._pressConfirm.bind(this);
    this._setVisibleModal = this._setVisibleModal.bind(this);
    this.state = {
      user: this.getUser(),
      promotionCode: this.props.navigation.state.params.promotionCode,
      shippingInfo: {
        name: null,
        phone: null,
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
        address: '',
        note: null
      },
      radioButtonDefault: true,
      loading: true,
      note: '',
      provinces: [],
      districts: [],
      wards: [],
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
      avatar: '',
      province: {
        itemCode : '48',
        itemValue : 'Thành phố Đà Nẵng'
      },
      district: {
        itemCode : '491',
        itemValue : 'Quận Thanh Khê'
      },
      ward: {
        itemCode : '45011',
        itemValue :'Phường Thanh Khê Tây'
      },
      address: '123 Điện Biên Phủ'
    };
    return user;
  }

  componentDidMount() {
    fetch(API.GET_ALL_PROVINCE, {method: 'GET'})
    .then(async (response) => {
      if (response.status === 200) {
        let body = await JSON.parse(response._bodyInit);
        let provinces = await body.data;
        this.setState({provinces: provinces, loading: false});
      }
    }).catch((error) => {
      Alert.alert('Thông báo', 'Hệ thống xãy ra lỗi. Vui lòng thử lại sau');
      console.error(error);
    });
    
  }

  _pressConfirm() {
    const {navigate} = this.props.navigation;
    if (this.state.radioButtonDefault) {
      this.state.shippingInfo.name = this.state.user.name;
      this.state.shippingInfo.phone = this.state.user.phone;
      this.state.shippingInfo.province = this.state.user.province;
      this.state.shippingInfo.district = this.state.user.district;
      this.state.shippingInfo.ward = this.state.user.ward;
      this.state.shippingInfo.address = this.state.user.address;
      this.setState(this.state);
    }
    let data = {
      promotionCode: this.state.promotionCode,
      shippingInfo: this.state.shippingInfo
    };
    navigate('ConfirmOrderScreen', data);
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
        // Get districts by province
        this.setState({loading: true});
        fetch(`${API.GET_DISTRICT}/${value}`, {method: 'GET'})
        .then(async (response) => {
          if (response.status === 200) {
            let list = this.state.provinces;
            let item = list.find(function(item) {
              return item.itemCode === value;
            });
            this.state.shippingInfo.province = item;
            this.state.modalProvinceVisible = false;
            let body = await JSON.parse(response._bodyInit);
            let districts = await body.data;
            this.setState({districts: districts, loading: false});
            this.state.shippingInfo.district.itemValue = 'Quận/Huyện';
            await this.setState(this.state);
          }
        }).catch((error) => {
          Alert.alert('Thông báo', 'Thông thể tìm thấy danh sách các huyện');
          console.error(error);
        });
      } break;
      case 'district' : {
        // Get ward by district
        this.setState({loading: true});
        fetch(`${API.GET_WARD}/${this.state.shippingInfo.province.itemCode}/${value}`, {method: 'GET'})
        .then(async (response) => {
          if (response.status === 200) {
            let list = this.state.districts;
            console.log(value);
            let item = list.find((item) => item.itemCode === value);
            this.state.shippingInfo.district = item;
            this.state.modalDistrictVisible = false;
            let body = await JSON.parse(response._bodyInit);
            let wards = await body.data;
            this.setState({wards: wards, loading: false});
            this.state.shippingInfo.ward.itemValue = 'Xã/Phường';
            await this.setState(this.state);
          }
        }).catch((error) => {
          Alert.alert('Thông báo', 'Không thể tìm thấy danh sách các xã');
          console.error(error);
        });
      } break;
      case 'ward' : {
        let list = this.state.wards;
        let item = list.find((item) => item.itemCode == value);
        this.state.shippingInfo.ward = item;
        this.state.modalWardVisible = false;
        this.setState(this.state);
      } break;
    }
  }
  
  render() {
    if (this.state.loading) {
      return <Loading message={this.state.errorLoading} navigation={this.props.navigation}/>
    }
    const user = this.state.user;
    const provinces = this.state.provinces;
    const districts = this.state.districts;
    const wards = this.state.wards;
    return (
      <ScrollView style={UpdateInfoScreenStyles.container}>
        <StatusBar barStyle='default'/>
        <KeyboardAvoidingView behavior="position" scrollEnabled={true}>
            <Title name='Giao đến: ' />
            <RadioButtonLabel label='Địa chỉ mặc định' status={this.state.radioButtonDefault} 
                onPress={() => this.setState({radioButtonDefault: true})} />
            { (this.state.radioButtonDefault) ?
            <View style={UpdateInfoScreenStyles.borderDefault}>
                <Label label='Anh/Chị' value='Hoàng Anh Tuấn' />
                <Label label='Điện thoại' value='0123456789' />
                <Label label='Tên quán' value='Kem xôi Chú Bộ Đội' />
                <Label label='Địa chỉ' value='123 Lý Tự Trọng, Q.Hải Châu, TP. Đà Nẵng' />
            </View> : null }
            <RadioButtonLabel label='Giao đến địa chỉ khác' status={!this.state.radioButtonDefault} 
                onPress={() => this.setState({radioButtonDefault: false})} />
            { (!this.state.radioButtonDefault) ?
            <View>
                <Title name='Thông tin nhận hàng:' />
                <View style={{paddingBottom: 16}}>
                    <TextInput style={UpdateInfoScreenStyles.input} placeholder="Họ tên"
                    onChangeText={(value) => { this.state.shippingInfo.name = value; this.setState(this.state)}} 
                    value={this.state.shippingInfo.name}
                    />
                    <TextInput style={UpdateInfoScreenStyles.input} placeholder="Số điện thoại"
                    onChangeText={(value) => { this.state.shippingInfo.phone = value; this.setState(this.state)}} 
                    value={this.state.shippingInfo.phone}
                    />
                    <TouchableHighlight style={UpdateInfoScreenStyles.combobox}
                        onPress={() => this._setVisibleModal(true, 'province')} underlayColor="transparent">
                        <View>
                        <Text style={UpdateInfoScreenStyles.comboboxContent}>
                            {this.state.shippingInfo.province.itemValue}
                        </Text>
                        <Icon name="menu-down" style={UpdateInfoScreenStyles.comboboxIcon} size={24} />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={UpdateInfoScreenStyles.combobox} disabled={(districts.length > 1) ? false : true}
                        onPress={() => this._setVisibleModal(true, 'district')} underlayColor="transparent">
                        <View>
                        <Text style={UpdateInfoScreenStyles.comboboxContent}>
                            {this.state.shippingInfo.district.itemValue}
                        </Text>
                        <Icon name="menu-down" style={UpdateInfoScreenStyles.comboboxIcon} size={24} />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={UpdateInfoScreenStyles.combobox} disabled={(wards.length > 1) ? false : true}
                        onPress={() => this._setVisibleModal(true, 'ward')} underlayColor="transparent">
                        <View>
                        <Text style={UpdateInfoScreenStyles.comboboxContent}>
                            {this.state.shippingInfo.ward.itemValue}
                        </Text>
                        <Icon name="menu-down" style={UpdateInfoScreenStyles.comboboxIcon} size={24} />
                        </View>
                    </TouchableHighlight>
                    <ComboBoxModal itemList={provinces} 
                            onValueChange={(value, index) => {
                            this._handleChangeComboBox(value, 'province');
                            }}
                            selectedValue={this.state.shippingInfo.province.itemCode} 
                            isVisible={this.state.modalProvinceVisible} />
                    {(districts != null) ? (
                    <ComboBoxModal itemList={districts} 
                        onValueChange={(value, index) => {
                        this._handleChangeComboBox(value, 'district');
                        }}
                        selectedValue={this.state.shippingInfo.district.itemCode} 
                        isVisible={this.state.modalDistrictVisible} />) : null }
                    {(wards != null) ? (
                    <ComboBoxModal itemList={wards} 
                        onValueChange={(value, index) => {
                        this._handleChangeComboBox(value, 'ward');
                        }}
                        selectedValue={this.state.shippingInfo.ward.itemCode} 
                        isVisible={this.state.modalWardVisible} />) : null }
                    <TextInput style={UpdateInfoScreenStyles.input} placeholder="Địa chỉ"
                        onChangeText={(value) => { this.state.shippingInfo.address = value; this.setState(this.state)}} 
                        value={this.state.shippingInfo.address}
                        />
                </View>
            </View> : null }
            <Text>Ghi chú: </Text>
            <TextInput multiline={true} maxLength={100} style={{height: 86, marginTop: 3, paddingLeft: 8, borderWidth: 0.5, borderColor: GREEN}}
                  onChangeText={(value) => {this.state.shippingInfo.note = value; this.setState(this.state)}}
                  value={this.state.shippingInfo.note}/>
            <TouchableHighlight style={UpdateInfoScreenStyles.button}
                onPress={this._pressConfirm} underlayColor="transparent">
                <Text style={{color: '#FFFFFF'}}>Tiếp tục</Text>
            </TouchableHighlight>
            <View style={{marginBottom: 50}}></View>
        </KeyboardAvoidingView>
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

const UpdateInfoScreenStyles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 32,
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



