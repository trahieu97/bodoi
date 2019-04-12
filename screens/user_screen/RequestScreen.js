import React from 'react';
import { ScrollView, StyleSheet, View, Text,
  Modal, Image, StatusBar, TouchableHighlight, Picker} from 'react-native';
// import ImagesCarousel from '../components/modules/product/DetailImageScroll';

import { HEADER_TOP_BAR_HEIGHT, DEVICE_WIDTH } from '../../commons/LayoutCommon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRICE_COLOR, GREEN, BG_COLOR_GRAY, BG_COLOR_WHITE } from '../../commons/ColorCommon';

const OrderItem = ({item, displayStatus}) => (
    <View style={UserOrderScreenStyles.item}>
      <View style={UserOrderScreenStyles.itemLeft}>
        <Image source={item.image.source} style={UserOrderScreenStyles.image}/>
      </View>
      <View style={UserOrderScreenStyles.itemCenter}>
        <View style={UserOrderScreenStyles.itemSpace}>
            <Text style={UserOrderScreenStyles.boldDisplay}>{item.productName}</Text>
        </View>
        <View style={UserOrderScreenStyles.itemSpace}>
            <Text>Giá đề xuất:                      
                <Text style={UserOrderScreenStyles.price}>
                    <Text style={UserOrderScreenStyles.boldDisplay}> {item.money.toLocaleString('vi')}
                    </Text>đ
                </Text>
            </Text>
        </View>
        <View style={UserOrderScreenStyles.itemSpace}>
            <Text>Trạng thái:
                <Text style={
                    (item.status == 'none') ? UserOrderScreenStyles.statusNone 
                    : (item.status == 'accept') ? UserOrderScreenStyles.statusSuccess : null
                }> {displayStatus[item.status]}</Text></Text>
        </View>
      </View>
      <View style={UserOrderScreenStyles.itemRight}>
        <TouchableHighlight style={UserOrderScreenStyles.buttonDel}
            onPress={this._pressUpdate} underlayColor="transparent">
            <Text style={{color: PRICE_COLOR, fontWeight: 'bold'}}>x</Text>
        </TouchableHighlight>
      </View>
    </View>
);

export default class RequestScreen extends React.Component {
    static navigationOptions = {
        title: 'Sản phẩm đã yêu cầu'
    };
  
    constructor(props) {
        super(props);
        this._getRequestList = this._getRequestList.bind(this);
        this.state = {
            requestList: this._getRequestList()
        };
    }

    _getRequestList() {
        let requestList = [
            {
                productName: 'Kem xôi bọt tuyết',
                image: {
                  source: {
                    uri: 'https://hieutt30-server-app.herokuapp.com/assets/images/products/chanh.jpg'
                  }
                },
                createDate: '22/11/2018',
                money: 32000,
                status: 'accept'
            },
            {
                productName: 'Kem xôi bọt tuyết',
                image: {
                  source: {
                    uri: 'https://hieutt30-server-app.herokuapp.com/assets/images/products/sinhtochanhday1l.jpg'
                  }
                },
                createDate: '22/11/2018',
                money: 30000,
                status: 'none'
            },
            {
                productName: 'Kem xôi bọt tuyết',
                image: {
                  source: {
                    uri: 'https://hieutt30-server-app.herokuapp.com/assets/images/products/chanh.jpg'
                  }
                },
                createDate: '22/11/2018',
                money: 30000,
                status: 'accept'
            },
            {
                productName: 'Kem xôi bọt tuyết',
                image: {
                  source: {
                    uri: 'https://hieutt30-server-app.herokuapp.com/assets/images/products/chanh.jpg'
                  }
                },
                createDate: '22/11/2018',
                money: 30000,
                status: 'accept'
            },
            {
                productName: 'Kem xôi bọt tuyết',
                image: {
                  source: {
                    uri: 'https://hieutt30-server-app.herokuapp.com/assets/images/products/sinhtochanhday1l.jpg'
                  }
                },
                createDate: '22/11/2018',
                money: 30000,
                status: 'none'
            },
            {
                productName: 'Kem xôi bọt tuyết',
                image: {
                  source: {
                    uri: 'https://hieutt30-server-app.herokuapp.com/assets/images/products/chanh.jpg'
                  }
                },
                createDate: '22/11/2018',
                money: 30000,
                status: 'none'
            },
            {
                productName: 'Kem xôi bọt tuyết',
                image: {
                  source: {
                    uri: 'https://hieutt30-server-app.herokuapp.com/assets/images/products/chanh.jpg'
                  }
                },
                createDate: '22/11/2018',
                money: 30000,
                status: 'none'
            }
        ];
        return requestList;
    }

    render() {
        const requestList = this.state.requestList;
        const displayStatus = {
            'none' : 'Chưa tiếp nhận',
            'accept' : 'Đã tiếp nhận'
        };
        return (
            <View style={UserOrderScreenStyles.container}>
                <StatusBar barStyle='default'/>
                <ScrollView>
                    {requestList.map((item, i) => (
                        <OrderItem key={i} item={item} displayStatus={displayStatus} />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const UserOrderScreenStyles = StyleSheet.create({
    container: {
      width: DEVICE_WIDTH,
      flex: 1,
      padding: 8,
      paddingBottom: 0,
      backgroundColor: BG_COLOR_GRAY,
    },
    itemLeft: {
      width: '30%',
      paddingRight: 8
    },
    itemCenter: {
      width: '65%'
    },
    itemRight: {
      width: '5%'
    },
    buttonDel: {
      position: 'absolute',
      height: 16, 
      width: 16,
      right: 8,
      top: 8
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
    image: {
      width: 80,
      minHeight: 80,
      resizeMode: 'contain', 
      alignSelf: 'center',
    },
    item: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        padding: 8,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: BG_COLOR_GRAY,
        backgroundColor: BG_COLOR_WHITE
    },
    itemSpace: {
        marginTop: 3,
        marginBottom: 3
    },
    price: {
        color: PRICE_COLOR
    },
    boldDisplay: {
        fontWeight: 'bold',
    },
    statusNone: {
        color: PRICE_COLOR,
        fontWeight: 'bold'
    },
    statusInprocess: {
        color: '#FAC917',
        fontWeight: 'bold'
    },
    statusShipping: {
        color: '#2680EB',
        fontWeight: 'bold'
    },
    statusCancel: {
        color: PRICE_COLOR,
        fontWeight: 'bold'
    },
    statusSuccess: {
        color: '#1BC597',
        fontWeight: 'bold'
    }
  });