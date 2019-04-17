import React from 'react';
import { Image, StyleSheet, TouchableHighlight, ScrollView, Picker, Modal, View, Text} from 'react-native';
import HeaderTopBar from '../components/layouts/HeaderTopBar.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductListModule from '../components/modules/ProductListModule';
import Loading from '../components/Loading';
import { DEVICE_WIDTH, HEADER_TOP_BAR_HEIGHT} from '../commons/LayoutCommon';
import { BG_COLOR_GRAY, BG_COLOR_WHITE, TITLE_BAR_COLOR, GREEN} from '../commons/ColorCommon';
import API from '../constants/Api.js';

const ComboBoxModal = ({itemList, selectedValue, isVisible, type, onValueChange}) => (
  <Modal animationType="slide" transparent={true}
        visible={isVisible}>
    <View style={ComboboxModalStyles.comboboxModal}>
      <View style={ComboboxModalStyles.comboboxModalView}>
        <Picker 
          selectedValue={selectedValue}
          style={ComboboxModalStyles.comboboxModalPicker}
          onValueChange={onValueChange}>
          {itemList.map((item, i) => (
            <Picker.Item key={i} label={item.itemValue} value={item.itemCode} />
          ))}
        </Picker>
      </View>
    </View>
  </Modal>
);

export default class PromotionsScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      promotionProducts: [],
      loading: true,
      errorLoading: null,
      filters: [
        { 
          itemCode : '00',
          itemValue: 'Sắp xếp'
        },
        { 
          itemCode : '01',
          itemValue: 'Mới nhất'
        },
        { 
          itemCode : '02',
          itemValue: 'Cũ nhất'
        },
        { 
          itemCode : '03',
          itemValue: 'Giảm giá nhiều nhất'
        },
        { 
          itemCode : '04',
          itemValue: 'Giá thấp đến cao'
        },
        {
          itemCode : '05',
          itemValue : 'Giá cao đến thấp'
        }
      ],
      filterValue: { 
        itemCode : '01',
        itemValue: 'Mới nhất'
      },
      filterModal: false
    };
    this._detailProductPress = this._detailProductPress.bind(this);
    this._setVisibleModal = this._setVisibleModal.bind(this);
  }

  _detailProductPress(productId) {
    const {navigate} = this.props.navigation;
    navigate('DetailScreen', {productId: productId});
  }

  _handleChangeComboBox(value) {
    let item = this.state.filters.find(function(item) {
      return item.itemCode == value;
    });
    this.setState({filterValue: item, filterModal: false});
  }

  _setVisibleModal(isVisible) {
    this.setState({filterModal : isVisible});
  }

  async componentDidMount() {
    try {
      const promotionProductsApi = await fetch(API.GET_SEEN_PRODUCTS);
      const products = await promotionProductsApi.json();
      // console.log(products.result);
      this.setState({promotionProducts: products.result, loading: false});
      // console.log(this.state.seenProducts);
    } catch(err) {
        console.log("Error fetching data-----------", err);
    }
  }

  render() {
    const promotionProducts = this.state.promotionProducts;
    if (this.state.loading) {
      return <Loading message={this.state.errorLoading} navigation={this.props.navigation}/>;
    }
    return (
        <View style={PromotionsScreenStyles.contain}>
          <HeaderTopBar type="normal" title="Khuyến mãi"/>
          <View style={{top: HEADER_TOP_BAR_HEIGHT, marginBottom: HEADER_TOP_BAR_HEIGHT}}>
            <View style={PromotionsScreenStyles.filter}>
              <Text style={PromotionsScreenStyles.filterLabel}>Sắp xếp</Text>
              <TouchableHighlight style={ComboboxModalStyles.combobox} 
                disabled={(this.state.filters.length > 1) ? false : true}
                onPress={() => this._setVisibleModal(true, 'district')} 
                underlayColor="transparent">
                <View>
                  <Text numberOfLines={1} style={ComboboxModalStyles.comboboxContent}>
                    {this.state.filterValue.itemValue}
                  </Text>
                  <Icon name="menu-down" style={ComboboxModalStyles.comboboxIcon} size={24} />
                </View>
              </TouchableHighlight>
            </View>
            <ScrollView>
              
              <ProductListModule onPress={this._detailProductPress} dataSource={promotionProducts} />
            </ScrollView>
            <ComboBoxModal itemList={this.state.filters} 
              onValueChange={(value, index) => {
                this._handleChangeComboBox(value);
              }}
              selectedValue={this.state.filterValue.itemCode} 
              isVisible={this.state.filterModal} />
          </View>
        </View>
    );
  }
}

const ComboboxModalStyles = StyleSheet.create({
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
  },
  comboboxModalPicker: {
    height: 50, 
    width: '100%', 
    justifyContent: 'center', 
    backgroundColor: '#fff'
  },
  combobox: {
    width: '60%', 
    position: 'absolute',
    top: 5,
    right: 8
  },
  comboboxContent: {
    width: '100%', 
    height: 30, 
    paddingLeft: 12,
    paddingRight: 12,
    lineHeight: 30,
    borderWidth: 0.5, 
    borderColor: GREEN, 
    borderRadius: 8,
    zIndex: -1
  },
  comboboxIcon: {
    position: 'absolute', 
    right: 5, 
    top: 4
  }
});

const PromotionsScreenStyles = StyleSheet.create({
  contain: {
    backgroundColor: BG_COLOR_GRAY
  },
  filter: {
    height: 40, 
    backgroundColor: BG_COLOR_WHITE, 
    margin: 16, 
    marginBottom: 8, 
    borderRadius: 8, 
    width: DEVICE_WIDTH - 32
  },
  filterLabel: {
    position: 'absolute',
    left: 12,
    top: 12
  }
});
