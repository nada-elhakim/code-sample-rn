import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    ImageBackground,
    View
} from 'react-native';

import Text from "../../theme/components/Text/Text";
import Images from "../../theme/variables/Images";
import {withNamespaces} from "react-i18next";
import LayoutStyles from "../../theme/styles/LayoutStyles";
import TypographyStyles from "../../theme/styles/TypographyStyles";

const VipCard = ({t, totalAssets}) => {
    return (
        <ImageBackground source={Images.vipCardBg} style={styles.container} imageStyle={{ borderRadius: 6 }}>
            <View>
                <Text style={[TypographyStyles.textClear, {fontSize: 16}]}>
                    {t('dashboard:home.totalAssets')}
                </Text>
                <Text style={[TypographyStyles.textClear, TypographyStyles.number]}>
                    ≈ ${totalAssets && totalAssets.toFixed(2)}
                </Text>
            </View>
        </ImageBackground>
    );
};

VipCard.propTypes = {

};

VipCard.defaultProps = {

};


export default withNamespaces()(VipCard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    }
});

