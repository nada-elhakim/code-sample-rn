import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

import Button from "../../theme/components/Button/Button";
import Text from "../../theme/components/Text/Text";
import getIconType from "../../theme/utils/getIconType";
import Colors from "../../theme/variables/Colors";
import UseChainIcon from "../../components/UseChainIcon/UseChainIcon";

const HomeButton = (props) => {
    const {icon, title, onPress, isLast} = props;
    return (
        <Button onPress={onPress}
                buttonStyle={styles.buttonStyle}
                containerStyle={[styles.containerStyle, isLast && styles.containerLastStyle]}>
            <UseChainIcon name={icon.name} size={icon.size} color={Colors.primaryDark}/>
            <Text>{title}</Text>
        </Button>
    );
};

HomeButton.propTypes = {
    icon:  PropTypes.shape({
        type: PropTypes.string,
        name: PropTypes.string,
        size: PropTypes.number,
        color: PropTypes.string
    }),
    title: PropTypes.string,
    onPress: PropTypes.func,
    isLast: PropTypes.bool
};

HomeButton.defaultProps = {
    icon: {
        name: 'mobile-phone',
        type: 'FontAwesome',
        size: 40
    },
    title: 'title',
    onPress: () => console.log('provide on press function'),
    isLast: false
};

export default HomeButton;

const styles = StyleSheet.create({
    containerStyle: {
        marginRight: 12,
        flex: 1,
    },
    containerLastStyle: {
        marginRight: 0
    },
    buttonStyle: {
        flexDirection: 'column',
        backgroundColor: '#ECF1F8',
        height: 90
    }
});

