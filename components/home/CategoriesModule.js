import React from 'react';
import {
  Image,
  Text,
  StyleSheet,
  Dimensions,
  View, TouchableHighlight
} from 'react-native';
import { DEVICE_WIDTH } from '../../commons/LayoutCommon';

const { width } = Dimensions.get('window');

const PADDING_BODY = 24;

export default class CategoriesModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextImage: width
        };
        this._categoryPress = this._categoryPress.bind(this);
    }

    _categoryPress(type) {
        alert('Item Click is: ' + type);
    }

    render() {
        let categories = this.props.dataSource;
        return( 
            <View>
                <Text style={Home_CategoriesModuleStyles.title}>DANH MỤC</Text>
                <View style={Home_CategoriesModuleStyles.listStyle}>
                {categories.map((category, i) => (
                    <TouchableHighlight key={i} style={Home_CategoriesModuleStyles.categoryItem} 
                        onPress={() => this._categoryPress(category.type)}
                        underlayColor="transparent">
                        <View style={Home_CategoriesModuleStyles.categoryContain}>
                            <Image style={Home_CategoriesModuleStyles.categoryImage} 
                                source={category.image.source} />
                            <Text style={Home_CategoriesModuleStyles.categoryName}>{category.name}</Text>
                        </View>
                    </TouchableHighlight>
                ))}
                </View>
            </View>
        )
    }
}

const Home_CategoriesModuleStyles = StyleSheet.create({
    title: {
        color: '#000', 
        paddingTop: 16, 
        paddingLeft: 24, 
        fontSize: 16
    },
    listStyle: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        paddingTop: 8, 
        paddingBottom: 8
    },
    categoryItem: {
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
    },
    categoryImage: {
        width: 60, 
        height: 60, 
        resizeMode: 'contain' 
    },
    categoryContain: {
        alignItems: 'center'
    },
    categoryName: {
        paddingTop: 8, 
        paddingBottom: 8
    }
});