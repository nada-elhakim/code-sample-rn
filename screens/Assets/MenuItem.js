import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet} from 'react-native';

import Button from "../../theme/components/Button/Button";
import Text from "../../theme/components/Text/Text";
import getIconType from "../../theme/utils/getIconType";
import Colors from "../../theme/variables/Colors";
import Images from "../../theme/variables/Images";
import ResponsiveImage from 'react-native-responsive-image';
import Metrics from "../../theme/variables/Metrics";
import NavigationService from "../../navigation/NavigationService";

const MenuItem = (props) => {
    const {menuItem, onPress, isLast} = props;

    return (
        <Button onPress={() => NavigationService.navigate(menuItem.link)}
                buttonStyle={styles.buttonStyle}
                containerStyle={[styles.containerStyle, isLast && styles.containerLastStyle]}>
            <ResponsiveImage
                source={menuItem.image}
                initWidth="40"
                initHeight="40"
                style={styles.menuImage}/>

            <Text>{menuItem.title}</Text>
        </Button>
    );
};

MenuItem.propTypes = {
    menuItem: PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.number,
        title: PropTypes.string,
        link: PropTypes.string
    }),
    onPress: PropTypes.func,
    isLast: PropTypes.bool
};

MenuItem.defaultProps = {
    menuItem: {
        id: 1,
        image: Images.iconApp,
        title: 'title',
        link: 'Transactions'
    },
    onPress: () => console.log('provide on press function'),
    isLast: false
};

export default MenuItem;

const styles = StyleSheet.create({
    containerStyle: {
        width: '25%',
    },
    menuImage: {
        marginBottom: 8
    },
    buttonStyle: {
        height: undefined,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 0,
        paddingVertical: Metrics.defaultPadding

    }

});

