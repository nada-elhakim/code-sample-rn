import React from 'react';
import {Image, StyleSheet} from "react-native";
import Metrics from "../../variables/Metrics";

const Thumbnail = (props) => {
    return (
        <Image
            {...props}
            style={[styles.thumbnail, props.style]}
            imageStyles={{resizeMode:'cover'}} />
    )
};
export default Thumbnail;

const styles = StyleSheet.create({
    thumbnail: {
        width: Metrics.thumbnailWidth,
        height: Metrics.thumbnailHeight,
        borderRadius: Metrics.thumbnailBorderRadius
    }
});