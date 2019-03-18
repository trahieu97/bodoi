import React from 'react';
import { Image, StyleSheet, TouchableHighlight, ScrollView, Picker, StatusBar, View, Platform} from 'react-native';
import HeaderTopBar from '../components/layouts/HeaderTopBar.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductListModule from '../components/modules/ProductListModule';
import TitleBarModule from '../components/modules/TitleBarModule';
import { DEVICE_WIDTH, HEADER_TOP_BAR_HEIGHT} from '../commons/LayoutCommon';
import { BG_COLOR_GRAY, BG_COLOR_WHITE, TITLE_BAR_COLOR} from '../commons/ColorCommon';

const url = 'https://hieutt30-server-app.herokuapp.com/';

export default class PromotionsScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {text: 1, language: 'java'};
    this._pressFunction = this._pressFunction.bind(this);
  }

  _increaseCount = () => {
    this.setState(previousState => (
      { text: previousState.text + 1 }
    ));
  };

  _pressFunction(type) {
    alert(type);
  }

  render() {
    const promotionProducts = [
      {
        productId: '123456789',
        productName: 'Sinh tố chanh dây 1 lít',
        productImage: {
          source: {
            uri: url + 'assets/images/products/sinhtochanhday1l.jpg'
          }
        },
        productInputPrice: 120000,
        productSalePrice: 140000,
        productSaleOffPrice: 90000,
        unit: 'Chai',
        saleOffPercent: 15,
        quantity: 100
      },
      {
        productId: '123456789',
        productName: 'Siro Ichchindkd',
        productImage: {
          source: {
            uri: url + 'assets/images/category/coffee-cup.png'
          }
        },
        productInputPrice: 120000,
        productSalePrice: 11230000,
        productSaleOffPrice: 90000,
        unit: 'Chai',
        saleOffPercent: 15,
        quantity: 100
      },
      {
        productId: '123456789',
        productName: 'Siro Ichchi',
        productImage: {
          source: {
            uri: url + 'assets/images/category/coffee-cup.png'
          }
        },
        productInputPrice: 1200000089,
        productSalePrice: 110000,
        productSaleOffPrice: 90000,
        unit: 'chai',
        saleOffPercent: 15,
        quantity: 100
      },
      {
        productId: '123456789',
        productName: 'Siro Ichchi',
        productImage: {
          source: {
            uri: url + 'assets/images/category/coffee-cup.png'
          }
        },
        productInputPrice: 120000,
        productSalePrice: 110000,
        productSaleOffPrice: 90000,
        unit: 'Chai',
        saleOffPercent: 0,
        quantity: 100
      },      {
        productId: '123456789',
        productName: 'Sinh tố chanh dây 1 lít',
        productImage: {
          source: {
            uri: url + 'assets/images/products/sinhtochanhday1l.jpg'
          }
        },
        productInputPrice: 120000,
        productSalePrice: 140000,
        productSaleOffPrice: 90000,
        unit: 'Chai',
        saleOffPercent: 15,
        quantity: 100
      },
      {
        productId: '123456789',
        productName: 'Siro Ichchindkd',
        productImage: {
          source: {
            uri: url + 'assets/images/category/coffee-cup.png'
          }
        },
        productInputPrice: 120000,
        productSalePrice: 11230000,
        productSaleOffPrice: 90000,
        unit: 'Chai',
        saleOffPercent: 15,
        quantity: 100
      }
    ];

    return (
      <View style={{backgroundColor: BG_COLOR_GRAY}}>
        <HeaderTopBar type="normal" title="Khuyến mãi"/>
        <ScrollView style={{top: HEADER_TOP_BAR_HEIGHT, marginBottom: HEADER_TOP_BAR_HEIGHT}}>
          <View style={{height: 40, backgroundColor: BG_COLOR_WHITE, margin: 16, borderRadius: 8, width: DEVICE_WIDTH - 32}}>
            <View>
              <Picker
                selectedValue={this.state.language}
                style={{height: 36, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({language: itemValue})
                } mode="dialog">
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
          </View>
          <ProductListModule dataSource={promotionProducts} />
        </ScrollView>
      </View>
    );
  }
}

