import React from 'react';
import PropTypes from 'prop-types';
import {
    ImageBackground,
    View,
    StyleSheet,
    Clipboard
} from "react-native";
import Text from "../../theme/components/Text/Text";
import Metrics from "../../theme/variables/Metrics";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Item from "../../theme/components/Item/Item";
import {ToastContainer as Toast} from "../../theme/components/Toast/ToastContainer";
import {withNamespaces} from "react-i18next";

const CommunityCard = ({socialMedia, t}) => {
    const copyLink = () => {
        socialMedia.url && Clipboard.setString(socialMedia.url);
        Toast.show({
            text: t('common:interface.copied'),
            buttonText: t('common:interface.ok'),
            duration: 2000,
            type: 'success'
        });
    };
    return (
        <Item
            transparent
            containerStyle={{
                paddingHorizontal: 0,
                backgroundColor: 'transparent'
            }}
            style={{
                paddingVertical: 0
            }}
            onPress={copyLink}>
            <ImageBackground source={socialMedia.image} style={styles.container}>
                <View style={styles.innerWrapper}>
                    <ItemHeading
                        style={[
                            TypographyStyles.textClear,
                            {
                                fontSize: 16,
                                marginBottom: 6
                            }
                        ]}>
                        {socialMedia.title}
                    </ItemHeading>
                    <Text
                        style={[
                            TypographyStyles.textClear
                        ]}>
                        {socialMedia.url}
                    </Text>
                </View>
            </ImageBackground>
        </Item>
    );
};

export default withNamespaces()(CommunityCard);

CommunityCard.propTypes = {
    socialMedia: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        url: PropTypes.string,
        image: PropTypes.number
    }),

};

const styles = StyleSheet.create({
    container: {
        marginBottom: Metrics.defaultMargin
    },
    innerWrapper: {
        paddingHorizontal: 30,
        paddingVertical: 20
    }
});