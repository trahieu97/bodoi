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
import API from '../constants/Api';
import { createStackNavigator } from 'react-navigation'

const PADDING_BODY = 24;
const url = 'https://hieutt30-server-app.herokuapp.com/';

export default class HomeScreen extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      seenProducts: [],
      loading: false
    };
    this._categoryPress = this._categoryPress.bind(this);
    this._requestProductPress = this._requestProductPress.bind(this);
    this._detailProductPress = this._detailProductPress.bind(this);
    this._headerTopButtonClick = this._headerTopButtonClick.bind(this);
    const {navigate} = this.props.navigation;
  }

  static navigationOptions = {
      header: null
  };

  _categoryPress(type) {
    const {navigate} = this.props.navigation;
    switch(type) {
      case 'cart' : navigate('CartScreen'); break;
      default: null;
    }
  }

  _headerTopButtonClick(type) {
    const {navigate} = this.props.navigation;
    switch(type) {
      case 'cart' : navigate('CartScreen'); break;
      default: null;
    }
  }

  _requestProductPress(navigate) {
    navigate('DetailScreen');
  }

  _detailProductPress(productId) {
    const {navigate} = this.props.navigation;
    navigate('DetailScreen', {productId: productId});
  }

  async componentDidMount() {
    try {
      const seenProductsApi = await fetch(API.GET_SEEN_PRODUCTS);
      const products = await seenProductsApi.json();
      // console.log(products.result);
      this.setState({seenProducts: products.result, loading: false});
      // console.log(this.state.seenProducts);
    } catch(err) {
        console.log("Error fetching data-----------", err);
    }
  }

  render() {
    seenProducts = this.state.seenProducts;
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

    return (
      <View style={{backgroundColor: BG_COLOR_GRAY}}>
        <HeaderTopBar navigation={this.props.navigation} type="home" onClickTopFunctionButton={this._headerTopButtonClick} />
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
            <ProductListModule onPress={this._detailProductPress} dataSource={this.state.seenProducts} />
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
