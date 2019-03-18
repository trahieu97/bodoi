import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, StatusBar, Button} from 'react-native';
// import ImagesCarousel from '../components/modules/product/DetailImageScroll';

import { HEADER_TOP_BAR_HEIGHT, DEVICE_WIDTH } from '../commons/LayoutCommon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BG_COLOR_GRAY } from '../commons/ColorCommon';

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Detail'
  };
  
  constructor(props) {
    super(props);
    this.state = {product: null};
  }

  componentWillMount() {
    const productId = this.props.navigation.state.params.productId;
    const productData = {
      productId: '123456789',
      productName: 'Sinh tố chanh dây 1 lít',
      productImage: [
        {
          source: {
            uri: 'https://hieutt30-server-app.herokuapp.com/assets/images/products/sinhtochanhday1l.jpg'
          },
        },
        {
          source: {
            uri: 'https://hieutt30-server-app.herokuapp.com/assets/images/products/sinhtochanhday1l.jpg'
          },
        },
      ],
      productInputPrice: 120000,
      productSalePrice: 140000,
      productSaleOffPrice: 90000,
      unit: 'Chai',
      saleOffPercent: 15,
      quantity: 100
    };
    this.setState({product : productData});
  }

  render() {
    const product = this.state.product;
    const rating = [];
    for(let i = 1; i <= 5; i++){
      rating.push(<Icon key={i} name="star" color="#FAC917" size={20}/>);
    }
    return (
      <ScrollView style={DetailScreenStyles.container}>
        <StatusBar barStyle='default'/>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{product.productName}</Text>
          <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}>
            {product.productImage.map((image, i) => (
              <Image key={i} style={{width: DEVICE_WIDTH - 32, height: 300}} source={image.source} />
            ))}
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              {rating}
              <Text style={{textDecorationLine: 'underline', color: '#2680EB'}}> (100 Đánh giá)</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Text style={DetailScreenStyles.price}>
                <Text style={DetailScreenStyles.priceDisplay}>
                  {product.productSaleOffPrice.toLocaleString('vi')}
                </Text>đ / 
                <Text style={DetailScreenStyles.unitPrice}>
                  {product.unit}
                </Text>
            </Text>
            <Text style={{fontSize: 12, color: '#999', paddingLeft: 8, textDecorationLine: 'line-through'}}>
                {product.productSalePrice.toLocaleString('vi')}đ
            </Text>
          </View>
          <Text>{product.productName}</Text>
        </View>
      </ScrollView>
    );
  }
}

const DetailScreenStyles = StyleSheet.create({
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
  }
});
