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

export default class ChangePasswordScreen extends React.Component {
  static navigationOptions = {
    title: 'Đổi mật khẩu'
  };
  
  constructor(props) {
    super(props);
    this._pressUpdate = this._pressUpdate.bind(this);
    this.state = {
        oldPassword: '', 
        newPassword: '',
        reTypeNewPassword: '',
        user: '1'
    };
  }

  _pressUpdate() {
    if(!this.state.oldPassword || this.state.oldPassword == '') 
      alert('Mật khẩu cũ không được bỏ trống');
    if(!this.state.newPassword || this.state.newPassword == '') 
      alert('Mật khẩu mới không được bỏ trống');
    if(!this.state.reTypeNewPassword == this.state.reTypeNewPassword) 
      alert('Mật khẩu nhập lại không khớp'); 
    const {navigate} = this.props.navigation;
    navigate('UserScreen');
  }

  render() {
    const user = this.state.user;
    return (
      <ScrollView style={ChangePasswordScreenStyles.container}>
        <StatusBar barStyle='default'/>
        <Title name='Đổi mật khẩu:' />
        <View>
          <TextInput style={ChangePasswordScreenStyles.input} placeholder="Mật khẩu củ"
              onChangeText={(value) => { this.state.oldPassword = value; this.setState(this.state)}} 
              value={this.state.oldPassword} secureTextEntry={true}
            />
            <TextInput style={ChangePasswordScreenStyles.input} placeholder="Mật khẩu mới"
                onChangeText={(value) => { this.state.newPassword = value; this.setState(this.state)}} 
                value={this.state.newPassword} secureTextEntry={true}
            />
            <TextInput style={ChangePasswordScreenStyles.input} placeholder="Nhập lại mật khẩu mới"
                  onChangeText={(value) => { this.state.reTypeNewPassword = value; this.setState(this.state)}} 
                  value={this.state.reTypeNewPassword} secureTextEntry={true}
            />
        </View>
        <TouchableHighlight style={ChangePasswordScreenStyles.button}
            onPress={this._pressUpdate} underlayColor="transparent">
            <Text style={{color: '#FFFFFF'}}>Cập nhật</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

const ChangePasswordScreenStyles = StyleSheet.create({
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
  }
});
