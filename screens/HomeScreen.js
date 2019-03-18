import React from 'react';
import {
  Text, ScrollView,
  View, TouchableHighlight
} from 'react-native';

import HeaderTopBar from '../components/layouts/HeaderTopBar';
import ImagesCarousel from '../components/ImagesCarousel';
import CategoriesModule from '../components/home/CategoriesModule';
import ProductListModule from '../components/modules/ProductListModule';
import TitleBarModule from '../components/modules/TitleBarModule';

import DetailScreen from '../screens/DetailScreen';

import { HEADER_TOP_BAR_HEIGHT, DEVICE_WIDTH } from '../commons/LayoutCommon';
import { BG_COLOR_GRAY } from '../commons/ColorCommon';
import { createStackNavigator } from 'react-navigation'

const PADDING_BODY = 24;
const url = 'https://hieutt30-server-app.herokuapp.com/';

export default class HomeScreen extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {text: 'a'};
    this._categoryPress = this._categoryPress.bind(this);
    this._requestProductPress = this._requestProductPress.bind(this);
    this._detailProductPress = this._detailProductPress.bind(this);
  }

  static navigationOptions = {
      header: null,
  };

  _categoryPress(type) {
    alert('Item Click is: ' + type);
  }

  _requestProductPress(navigate) {
    navigate('DetailScreen');
  }

  _detailProductPress(productId) {
    const {navigate} = this.props.navigation;
    navigate('DetailScreen', {productId : productId});
  }

  render() {
    const images = [
      {
        source: {
          uri: url + 'assets/images/slider/01.jpg',
        },
      },
      {
        source: {
          uri: url + 'assets/images/slider/02.jpg',
        },
      }
    ];

    const categories = [
      {
        type: 'cafe',
        name: 'Quán Cafe',
        image: {
          source: {
            uri: url + 'assets/images/category/coffee-cup.png'
          }
        }
      },
      {
        type: 'restaurants',
        name: 'Quán Ăn',
        image: {
          source: {
            uri: url + 'assets/images/category/breakfast.png'
          }
        }
      },
      {
        type: 'store',
        name: 'Nhà hàng',
        image: {
          source: {
            uri: url + 'assets/images/category/hamburger.png'
          }
        }
      },
      {
        type: 'book',
        name: 'Trà sửa',
        image: {
          source: {
            uri: url + 'assets/images/category/iced-tea.png'
          }
        }
      },
      {
        type: 'diet',
        name: 'Rau củ quả',
        image: {
          source: {
            uri: url + 'assets/images/category/diet.png'
          }
        }
      },
    ];

    const seenProducts = [
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
      }
    ];

    return (
      <View style={{backgroundColor: BG_COLOR_GRAY}}>
        <HeaderTopBar type="home"/>
        <ScrollView>
          <ImagesCarousel style={{zIndex: 0}} marginTop={HEADER_TOP_BAR_HEIGHT} images={images} />
          <CategoriesModule dataSource={categories} />
          <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: 72, backgroundColor: '#fff'}}>
            <TouchableHighlight style={{height: 40, width: '70%', backgroundColor: '#056839', 
            justifyContent: 'center', alignItems: 'center'}} 
            // onPress={() => this._requestProductPress(navigate)} 
            onPress={() => navigate('DetailScreen', )}
            underlayColor="transparent">
              <Text style={{color: '#fff'}}>Yêu cầu sản phẩm khác</Text>
            </TouchableHighlight>
          </View>
          <View>
            <TitleBarModule title="SẢN PHẨM BẠN ĐÃ XEM" />
            <ProductListModule onPress={this._detailProductPress} dataSource={seenProducts} />
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = {
  category: {
    width: DEVICE_WIDTH/3 - PADDING_BODY,
    height: 100,
    backgroundColor: '#fff', 
    borderRadius: 8, 
    padding: 6,
    margin: 6,
    marginLeft: 8,
    marginRight: 8,
    borderWidth: 0.5,
    borderColor: '#056839'
  }
}
