import React from 'react';
import {View} from "react-native";
import {withNamespaces} from "react-i18next";
import PropTypes from 'prop-types';
import Text from "../../theme/components/Text/Text";

const LoadMore = ({isLoading, t}) => {
   return (
       <View>
           {isLoading ? <Text>{t('common:interface.loadMore')}</Text> : null }
       </View>
   );
};

export default withNamespaces()(LoadMore);

LoadMore.propTypes = {
    isLoading: PropTypes.bool
};

LoadMore.defaultProps = {
    isLoading: false
};

