import React, {Component} from 'react';
import {
    View,
    ViewPropTypes,
    StyleSheet
} from "react-native";
import PropTypes from 'prop-types';
import Metrics from "../../variables/Metrics";
import Colors from "../../variables/Colors";


class Badge extends Component {

    static propTypes = {
        ...ViewPropTypes,
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number,
            PropTypes.array
        ]),
        circle: PropTypes.bool
    };

    static defaultProps = {
       circle: false
    };

    render() {
        const {
            children,
            circle,
            style
        } = this.props;

        return (
            <View {...this.props} style={[styles.badgeStyles, circle ? styles.circleStyles : styles.squareStyles]}>
                {children}
            </View>
        )
    }
}

export default Badge;

const styles = StyleSheet.create({
    badgeStyles: {
        backgroundColor: Colors.defaultBadgeColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleStyles: {
        width: Metrics.badgeCircleRadius * 2,
        height: Metrics.badgeCircleRadius * 2,
        borderRadius: Metrics.badgeCircleRadius
    },
    squareStyles: {
        paddingHorizontal: Metrics.badgePaddingHorizontal,
        paddingVertical: Metrics.badgePaddingVertical,
        borderRadius: Metrics.badgeRadius
    }
});