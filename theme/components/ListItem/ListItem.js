import React from 'react';
import Item from "../Item/Item";
import {View, StyleSheet} from "react-native";
import Thumbnail from "../Thumbnail/Thumbnail";
import Metrics from "../../variables/Metrics";

const ListItem = (props) => {
    const {
        thumbnail,
        image,
        itemRight,
        itemLeft
    } = props;

    return (
        <Item {...props}>
            { thumbnail && <Thumbnail style={styles.thumbnail}/>}
            <View>

            </View>
        </Item>
    )
};
export default ListItem;

const styles = StyleSheet.create({
    thumbnail: {
        marginRight: Metrics.defaultMargin
    }
});