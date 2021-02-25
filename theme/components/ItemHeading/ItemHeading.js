import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

import Text from "../Text/Text";
import Typography from "../../variables/Typography";
import Metrics from "../../variables/Metrics";

const ItemHeading = (props) =>  {
    const {center, noMargin} = props;
    return (
        <Text
            fontWeight="bold"
            style={[
                styles.heading,
                props.style,
                center && {textAlign: 'center'},
                noMargin && {marginBottom: 0}
                ]} {...props}>{props.children}</Text>
    )
};

const childrenType = function (props, propName, component) {
    let error;
    const prop = props[propName];
    React.Children.forEach(prop, child => {
        if (typeof child !== "string" && typeof child !== "number") {
            error = new Error(`${component} should have only string or number`);
        }
    });
    return error;
};

ItemHeading.propTypes = {
    ...Text.propTypes,
    children: childrenType,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

export default ItemHeading;

const styles = StyleSheet.create({
    heading: {
        fontFamily: Typography.headingFontFamily,
        fontSize: Typography.itemHeadingFontSize,
        marginBottom: Metrics.itemHeadingMarginBottom,
        color: Typography.defaultHeadingColor
    }
});

