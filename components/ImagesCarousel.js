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

const { width } = Dimensions.get('window');
const height = width * 0.5;

export default class ImagesCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextImage: width
        };
        this._onScroll = this._onScroll.bind(this);
    }
    _refScrollView = (scrollView) => {
        this._scrollView = scrollView;
    }

    _onScroll() {
        let next = width + this.state.nextImage;
        let images = this.props.images;
        if (next/width == images.length) {                
            this._scrollView.scrollTo({x: 0, animated: true});
            this.setState({nextImage : 0});
            return false;
        }
        this._scrollView.scrollTo({x: next, animated: true});
        this.setState({nextImage : next});

        console.log('Okbb');
    }

    render() {
        let images = this.props.images;
        if (images && images.length) {
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
                {/* <Button onPress={this._onScroll} title='click Me' /> */}
                </View>
            );
        }
        return null;    
    }
}

const ImagesCarouselStyles = StyleSheet.create({
    image: {
      width,
      height
    },
});