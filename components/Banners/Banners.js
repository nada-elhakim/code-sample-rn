import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import {
    ImageBackground,
    TouchableOpacity
} from "react-native";
import Metrics from "../../theme/variables/Metrics";
import NavigationService from "../../navigation/NavigationService";

const Banners = ({banners}) => {
    const onBannerPressed = (banner) => {
        NavigationService.push('Banner', {banner});
    };

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: '100%'
                }}
                onPress={() => onBannerPressed(item)}>
                <ImageBackground
                    source={{uri: item.cover_url}}
                    imageStyle={{borderRadius: 8}}
                    style={{
                        flex: 1,
                        height: '100%'
                    }}>
                </ImageBackground>
            </TouchableOpacity>
        );
    };

    return (
        <Carousel
            ref={(c) => { this._carousel = c; }}
            data={banners}
            renderItem={renderItem}
            sliderWidth={Metrics.windowWidth}
            autoplay={true}
            enableMomentum={true}
            loop={true}
            itemWidth={Metrics.windowWidth - 34}
            layout={'default'}
            autoplayInterval={5000}
        />
    );
};

export default Banners;

Banners.propTypes = {
    banners: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            external_url: PropTypes.string,
            sorting: PropTypes.number,
            cover_url: PropTypes.string,
        })
    )
};

