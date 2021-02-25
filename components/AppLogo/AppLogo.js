import React from 'react';
import {Image, View, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import config from "../../config/AppConfig";
import Colors from "../../theme/variables/Colors";
import Images from "../../theme/variables/Images";
import Text from "../../theme/components/Text/Text";

const AppLogo = (props) => {
    const {orientation} = props;
    return (
        <View {...props} style={[props.style, orientation === 'horizontal' && styles.containerHorizontal]}>
            <Image source={Images.logo} style={ orientation === 'vertical' ? styles.logoImage : styles.logoImageHorizontal}/>
            <Text style={[styles.logoText]}>{config.appName}</Text>
        </View>
    );
};

export default AppLogo;

AppLogo.propTypes = {
    orientation: PropTypes.string
};

AppLogo.defaultProps = {
    orientation: 'vertical'
};

const styles = StyleSheet.create({
    containerHorizontal: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoText: {
      color: Colors.primary
    },
    logoImage: {
      width: 40,
      height: 40,
      marginBottom: 8
    },
    logoImageHorizontal: {
        width: 24,
        height: 24,
        marginRight: 6
    }
});
