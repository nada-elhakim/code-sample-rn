import React, {Component} from 'react';
import {
    Platform,
    View,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    StyleSheet
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import Colors from "../../variables/Colors";
import Metrics from "../../variables/Metrics";
import LayoutStyles from "../../styles/LayoutStyles";

class Item extends Component {
    static propTypes = {
        noBorder: PropTypes.bool,
        showArrow: PropTypes.bool,
    };
    static defaultProps = {
        TouchableComponent:  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableHighlight
    };

    render() {
        const {
            noBorder,
            showArrow,
            onPress,
            children,
            TouchableComponent,
            style,
            containerStyle,
            itemLeft
        } = this.props;

        return (
            <TouchableComponent
            onPress={onPress}
            underlayColor={Colors.itemUnderlayColor}>
                <View style={[styles.container, containerStyle]}>
                    <View style={[
                        styles.innerWrapper,
                        noBorder && styles.innerWrapperNoBorder,
                        showArrow && LayoutStyles.spaceBetween,
                        style]}>
                        {children}
                        {showArrow &&
                        <MaterialCommunityIcons
                            name="chevron-right"
                            color={Colors.itemChevronColor}
                            size={24}/>}
                    </View>
                </View>

            </TouchableComponent>
        )
    }
}

export default Item;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.itemBackground,
        paddingHorizontal: Metrics.itemPaddingHorizontal
    },
    innerWrapper: {
        borderBottomWidth: Metrics.itemBorderWidth,
        borderBottomColor: Colors.itemBorderColor,
        paddingVertical: Metrics.itemPaddingVertical
    },
    innerWrapperNoBorder: {
        borderBottomWidth: 0
    }
});