import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

import Text from "../Text/Text";
import Typography from "../../variables/Typography";
import Metrics from "../../variables/Metrics";

const Note = (props) =>  {
    return (
        <Text
            {...props}
            fontWeight="bold"
            style={[styles.note, props.style]}>{props.children}</Text>
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

Note.propTypes = {
    ...Text.propTypes,
    children: childrenType,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

export default Note;

const styles = StyleSheet.create({
    note: {
        fontSize: Typography.noteFontSize,
        color: Typography.noteTextColor,
    }
});

