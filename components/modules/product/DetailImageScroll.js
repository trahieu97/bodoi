import React from 'react';
import {
  Image,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';

import { DEVICE_WIDTH } from '../../../commons/LayoutCommon';

const height = DEVICE_WIDTH * 0.5;

export default class DetailImageScroll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextImage: DEVICE_WIDTH
        };
        this._onScroll = this._onScroll.bind(this);
    }
    _refScrollView = (scrollView) => {
        this._scrollView = scrollView;
    }

    _onScroll() {
        let next = DEVICE_WIDTH + this.state.nextImage;
        let images = this.props.images;
        if (next/DEVICE_WIDTH == images.length) {                
            this._scrollView.scrollTo({x: 0, animated: true});
            this.setState({nextImage : 0});
            return false;
        }
        this._scrollView.scrollTo({x: next, animated: true});
        this.setState({nextImage : next});

        console.log('Okbb');
    }

    render() {
        let images = this.props.dataSource;
        if (images.length > 0) {
            return (
                <View
                style={{height, marginTop: this.props.marginTop}}
                >
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    ref={this._refScrollView}
                >
                    {images.map((image, i) => (
                    <Image key={i} style={ImagesCarouselStyles.image} source={image.source} />
                    ))}
                </ScrollView>
                <Button onPress={this._onScroll} title='click Me' />
                </View>
            );
        }
        return null;    
    }
}

const ImagesCarouselStyles = StyleSheet.create({
    image: {
      width: DEVICE_WIDTH,
      height
    },
});