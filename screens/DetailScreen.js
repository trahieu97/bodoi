import React from 'react';
import { ScrollView, StyleSheet, Alert, AsyncStorage, KeyboardAvoidingView, View, TextInput, Text, Image, StatusBar, TouchableHighlight} from 'react-native';
import Loading from '../components/Loading';

import { HEADER_TOP_BAR_HEIGHT, DEVICE_WIDTH } from '../commons/LayoutCommon';
import HeaderFunctionButtonModule from '../components/modules/layouts/HeaderFunctionButtonModule';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BG_COLOR_GRAY, GREEN } from '../commons/ColorCommon';
import API from '../constants/Api'; 

const RadioStar = ({star, onPress, status}) => (
              <TouchableHighlight
                  onPress={onPress} underlayColor="transparent">
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={DetailScreenStyles.star}>
                      { (status) ? (<View style={DetailScreenStyles.innerStar} />) : null }
                    </View>
                    <View style={{paddingLeft: 8}}>
                      {
                        (star == '1') ? (
                          <Icon name="star" color="#FAC917" size={20}/>)
                        : (star == '2') ? (
                          <View style={{flexDirection: 'row'}}>
                            <Icon name="star" color="#FAC917" size={20}/>
                            <Icon name="star" color="#FAC917" size={20}/>
                          </View>)
                        : (star == '3') ? (
                          <View style={{flexDirection: 'row'}}>
                            <Icon name="star" color="#FAC917" size={20}/>
                            <Icon name="star" color="#FAC917" size={20}/>
                            <Icon name="star" color="#FAC917" size={20}/>
                          </View>)
                        : (star == '4') ? (
                          <View style={{flexDirection: 'row'}}>
                            <Icon name="star" color="#FAC917" size={20}/>
                            <Icon name="star" color="#FAC917" size={20}/>
                            <Icon name="star" color="#FAC917" size={20}/>
                            <Icon name="star" color="#FAC917" size={20}/>
                          </View>)
                        : (star == '5') ? (
                          <View style={{flexDirection: 'row'}}>
                            <Icon name="star" color="#FAC917" size={20}/>
                            <Icon name="star" color="#FAC917" size={20}/>
                            <Icon name="star" color="#FAC917" size={20}/>
                            <Icon name="star" color="#FAC917" size={20}/>
                            <Icon name="star" color="#FAC917" size={20}/>
                          </View>)
                        : null
                      }
                    </View>
                  </View>
              </TouchableHighlight>
            );

export default class DetailScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Chi tiết',
      headerRight: 
                <View style={{marginRight: 8}}>
                  <HeaderFunctionButtonModule
                      type="detail-cart" iconName="cart-outline"
                      onPressButton={() => navigation.navigate('CartScreen')} />
                </View>
    };
  };
  
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.navigation.state.params.productId,
      product: {},
      star: {
        one: false,
        two: false,
        three: false,
        four: false,
        five: true
      },
      commentForm: {
        userId: '1',
        productId: null,
        star: 5,
        content: ''
      },
      cartQuantity: 1,
      loading: true,
      errorLoading: null
    };

    this.saveItemCart = async () => {
      try {
        // let cartForm = JSON.parse(await AsyncStorage.getItem("cart"));
        let cartForm = [];
        fetch(API.GET_ALL_CART_ITEM, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: 'dkjflkewfleflewlfijewifjiweof'
          }),
        })
        .then(async (response) => {
          if (response.status === 200) {
            let body = JSON.parse(response._bodyInit);
            cartForm = await body.data.cartList;
            let check = -1;
            for (item in cartForm) {
              if (cartForm[item].product._id == this.state.product._id) {
                check = item;
              }
            }
            if (check == -1) {
              cartForm.push({
                id: this.state.product._id,
                quantity: this.state.cartQuantity,
                product: this.state.product
              });
            } else {              
              cartForm[check].quantity = cartForm[check].quantity + this.state.cartQuantity;
            }
          } else {
            cartForm.push({
              id: this.state.product._id,
              quantity: this.state.cartQuantity,
              product: this.state.product
            });
          }
          // Save
          fetch(API.ADD_TO_CART, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: 'dkjflkewfleflewlfijewifjiweof',
                cart: cartForm
            }),
          })
          .then((response) => {
            if (response.status === 200)
              Alert.alert('Thông báo', 'Thêm vào giỏ hàng thành công!!');
          }).catch((error) => {
            Alert.alert('Thông báo', 'Có lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau');
            console.error(error);
          });
        }).catch((error) => {
          Alert.alert('Thông báo', 'Có lỗi khuy truy xuất giỏ hàng');
          console.error(error);
        });
        // await AsyncStorage.setItem('cart', JSON.stringify(cartForm));
        
        // await AsyncStorage.removeItem("cart");
      } catch (error) {
        Alert.alert('Thông báo', 'Có lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau');
      }
    };

    this._onPressRadioStar = this._onPressRadioStar.bind(this);
    this._onPressComment = this._onPressComment.bind(this);
    this._onPressDiv = this._onPressDiv.bind(this);
    this._onPressPlus = this._onPressPlus.bind(this);
    this._onPressAddCart = this._onPressAddCart.bind(this);
  }

  _setPressedStar(starNo) {
    switch(starNo) {
      case 1: this.setState({
        star: {
          one: true,
          two: false,
          three: false,
          four: false,
          five: false
        }, 
        commentForm: {
          userId: this.state.commentForm.productId,
          productId: this.state.commentForm.productId,
          star: 1,
          content: this.state.commentForm.content
        }
      }); break;
      case 2: this.setState({
        star: {
          one: false,
          two: true,
          three: false,
          four: false,
          five: false
        }, 
        commentForm: {
          userId: this.state.commentForm.productId,
          productId: this.state.commentForm.productId,
          star: 2,
          content: this.state.commentForm.content
        }
      }); break;
      case 3: this.setState({
        star: {
          one: false,
          two: false,
          three: true,
          four: false,
          five: false
        }, 
        commentForm: {
          userId: this.state.commentForm.productId,
          productId: this.state.commentForm.productId,
          star: 3,
          content: this.state.commentForm.content
        }
      }); break;
      case 4: this.setState({
        star: {
          one: false,
          two: false,
          three: false,
          four: true,
          five: false
        }, 
        commentForm: {
          userId: this.state.commentForm.productId,
          productId: this.state.commentForm.productId,
          star: 4,
          content: this.state.commentForm.content
        }
      }); break;
      case 5: this.setState({
        star: {
          one: false,
          two: false,
          three: false,
          four: false,
          five: true
        }, 
        commentForm: {
          userId: this.state.commentForm.productId,
          productId: this.state.commentForm.productId,
          star: 5,
          content: this.state.commentForm.content
        }
      }); break;
      default: this.setState({
        star: {
          one: false,
          two: false,
          three: false,
          four: false,
          five: true
        }, 
        commentForm: {
          userId: this.state.commentForm.productId,
          productId: this.state.commentForm.productId,
          star: 5,
          content: this.state.commentForm.content
        }
      });
    } 
  }

  _onPressRadioStar(star) {
    this._setPressedStar(star);
  }

  _onPressComment() {
    alert('Comment Form{ star: ' + this.state.commentForm.star + ', content: ' + this.state.commentForm.content);
  }

  async componentDidMount() {
    try {
      const productApi = await fetch(API.GET_ONE_PRODUCT + this.state.productId);
      const product = await productApi.json();
      console.log(product)
      if (!product || product == null || product == [] || product.status == 'error') {
        this.setState({errorLoading: 'Không tìm thấy sản phẩm', loading: true});
      } else {
        this.setState({product: product.result, loading: false});
      }
    } catch(err) {
        this.setState({errorLoading: 'Xin lỗi, hệ thống đang bị vấn đề gì đó. Vui lòng thử lại sau', loading: true});
    }
  }

  _setQuantityCart(number) {
    this.setState({
      cartQuantity: this.state.cartQuantity + number
    });
  }

  _onPressDiv() {
    if(this.state.cartQuantity > 1){
      this._setQuantityCart(-1);
    }
  }

  _onPressPlus() {
    this._setQuantityCart(1);
  }

  _onPressAddCart() {
    this.saveItemCart();
  }

  render() {
    if (this.state.loading) {
      return <Loading message={this.state.errorLoading} navigation={this.props.navigation}/>;
    } else {
      const product = this.state.product;
      const details = product.detail;
      const productDetailLength = details.length;
      const ratingRender = [];
      const productDetailRender = [];
      let i = 0;
      for(i = 1; i <= 5; i++){
        ratingRender.push(<Icon key={i} name="star" color="#FAC917" size={20}/>);
      }

      for(i = 0; i < productDetailLength; i++){
        productDetailRender.push(
          <View key={i} style={{width: DEVICE_WIDTH - 32, flexDirection: 'row'}}>
            <View style={{width: '36%', height: 32, backgroundColor: '#E4E4E4', paddingLeft: 8, alignItems: 'flex-start', justifyContent: 'center', borderWidth: 0.5, borderColor: '#FFFFFF'}}>
              <Text>{details[i].name}</Text>
            </View>
            <View style={{width: '64%', height: 32, paddingLeft: 8, alignItems: 'flex-start', justifyContent: 'center', borderWidth: 0.5, borderColor: '#E4E4E4'}}>
              <Text numberOfLines={2}>{details[i].value}</Text>
            </View>
          </View>
        );
      }

      return (
        <View style={{height: '100%', flex: 1}}>
          <ScrollView style={DetailScreenStyles.container}>
            <StatusBar barStyle='default'/>
            <KeyboardAvoidingView behavior='position'
              scrollEnabled={true}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>{product.name}</Text>
              <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}>
                {product.images.map((image, i) => (
                  <Image key={i} style={{width: DEVICE_WIDTH - 32, height: 300}} source={image.source} />
                ))}
              </ScrollView>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                  {ratingRender}
                  <Text style={{textDecorationLine: 'underline', color: '#2680EB'}}> (100 Đánh giá)</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <Text style={DetailScreenStyles.price}>
                    <Text style={DetailScreenStyles.priceDisplay}>
                      {product.salePrice.toLocaleString('vi')}
                    </Text>đ / 
                    <Text style={DetailScreenStyles.unitPrice}>
                      {product._unit[0].name}
                    </Text>
                </Text>
                <Text style={{fontSize: 12, color: '#999', paddingLeft: 8, textDecorationLine: 'line-through'}}>
                    {product.inputPrice.toLocaleString('vi')}đ
                </Text>
              </View>
              <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', paddingTop: 8, paddingBottom: 8}}>Chi tiết:</Text>
              {/* <View>
                {productDetailRender}
              </View> */}
              <Text style={{paddingTop: 8, textDecorationLine: 'underline', color: '#2680EB', alignSelf: 'center'}}>Xem thêm</Text>
              <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', paddingTop: 8, paddingBottom: 8}}>Mô tả:</Text>
              <Text style={{width: DEVICE_WIDTH - 32, textAlign: 'justify'}} numberOfLines={3}>Chanh là loại quả có rất nhiều công dụng trong cuộc sống: làm gia vị, pha nước, làm đẹp... được con người sử dụng hàng ngày. Ngoài ra</Text>
              <Text style={{paddingTop: 8, textDecorationLine: 'underline', color: '#2680EB', alignSelf: 'center'}}>Xem thêm</Text>
              <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', paddingTop: 8, paddingBottom: 8}}>Bình luận:</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '45%'}}>
                  <RadioStar star='1' onPress={() => this._onPressRadioStar(1)} status={this.state.star.one}/>
                  <RadioStar star='2' onPress={() => this._onPressRadioStar(2)} status={this.state.star.two}/>
                  <RadioStar star='3' onPress={() => this._onPressRadioStar(3)} status={this.state.star.three}/>
                  <RadioStar star='4' onPress={() => this._onPressRadioStar(4)} status={this.state.star.four}/>
                  <RadioStar star='5' onPress={() => this._onPressRadioStar(5)} status={this.state.star.five}/>
                </View>
                <View style={{width: '55%'}}>
                  <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>Nội dung:</Text>
                  <TextInput multiline={true} maxLength={100} style={{height: 86, marginTop: 3, paddingLeft: 8, borderWidth: 0.5, borderColor: GREEN}}
                  onChangeText={(value) => {this.state.commentForm.content = value; this.setState(this.state)}}
                  value={this.state.commentForm.content}/>
                  <TouchableHighlight style={DetailScreenStyles.buttonComment}
                    onPress={this._onPressComment} underlayColor="transparent">
                    <Text style={{color: '#FFFFFF'}}>Gửi đánh giá</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
          <View style={DetailScreenStyles.cart}>
            <View style={DetailScreenStyles.cartLeft}>
              <TouchableHighlight style={DetailScreenStyles.buttonDiv}
                onPress={this._onPressDiv} underlayColor="transparent">
                <Text style={DetailScreenStyles.buttonDivPlusText}>-</Text>
              </TouchableHighlight>
              <View style={DetailScreenStyles.quantityCart}>
                <Text style={DetailScreenStyles.quantityCartText}>{this.state.cartQuantity}</Text>
              </View>
              <TouchableHighlight style={DetailScreenStyles.buttonPlus}
                onPress={this._onPressPlus} underlayColor="transparent">
                <Text style={DetailScreenStyles.buttonDivPlusText}>+</Text>
              </TouchableHighlight>
            </View>
            <View style={DetailScreenStyles.cartRight}>
              <TouchableHighlight style={DetailScreenStyles.buttonAddCart}
                onPress={this._onPressAddCart} underlayColor="transparent">
                <Text style={{color: '#FFFFFF'}}>Thêm vào giỏ</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    }
  }
}

const DetailScreenStyles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  cart: {
    height: 40,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#ccc'
  },
  cartLeft: {
    width: '50%',
    flexDirection: 'row'
  },
  cartRight: {
    width: '50%'
  },
  buttonComment: {
    height: 40, 
    width: '70%',
    marginTop: 8, 
    backgroundColor: GREEN, 
    justifyContent: 'center', 
    alignSelf: 'flex-end', 
    alignItems: 'center'
  },
  quantityCart: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityCartText: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  buttonDiv: {
    height: 40, 
    width: '30%',
    backgroundColor: BG_COLOR_GRAY, 
    justifyContent: 'center', 
    alignSelf: 'flex-end', 
    alignItems: 'center'
  },
  buttonPlus: {
    height: 40, 
    width: '30%',
    backgroundColor: BG_COLOR_GRAY, 
    justifyContent: 'center', 
    alignSelf: 'flex-end', 
    alignItems: 'center'
  },
  buttonDivPlusText: {
    color: '#999',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonAddCart: {
    height: 40, 
    width: '100%',
    backgroundColor: '#EFBF3F', 
    justifyContent: 'center', 
    alignSelf: 'flex-end', 
    alignItems: 'center'
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
  star: {
    width: 16, 
    height: 16, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 999, 
    borderWidth: 1, 
    borderColor: '#ccc',
  },
  innerStar: {
    width: 8, 
    height: 8,
    backgroundColor: GREEN,
    borderRadius: 999
  }
});
