import React, {Component} from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Typography from "../../variables/Typography";

class Text extends Component {
    static propTypes = {
        ...RNText.propTypes,
        uppercase: PropTypes.bool,
        fontWeight: PropTypes.string,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    };

    static defaultProps = {
        uppercase: false,
        fontWeight: 'normal',
    };

    render() {
        const {
            uppercase,
            children,
            center,
            fontWeight,
        } = this.props;

        let text;
        if (uppercase) {
            text = React.Children.map(children, child => {
                if (_.isString(child)) {
                    return _.toUpper(child);
                } else {
                    return child;
                }
            })
        } else {
            text = children;
        }

        return (
            <RNText
                {...this.props}
                style={[
                    styles.textStyle, this.props.style,
                    center ? {textAlign: 'center'} : null,
                    fontWeight === 'normal' ? styles.normal : styles.bold]}>
                {text}
            </RNText>
        );
    }
}

export default Text;

const styles = StyleSheet.create({
    normal: {
        fontFamily: Typography.baseFontFamily
    },
    bold: {
        fontFamily: Typography.headingFontFamily
    },
    textStyle: {
        color: Typography.defaultTextColor
    }
});