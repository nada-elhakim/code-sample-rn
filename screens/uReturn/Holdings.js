import React from 'react';
import {
    View,
    FlatList
} from "react-native";
import {withNamespaces} from "react-i18next";
import PropTypes from 'prop-types';
import HoldingsItem from "./HoldingsItem";
import HoldingInfoCard from "./HoldingInfoCard";
import Item from "../../theme/components/Item/Item";
import Text from "../../theme/components/Text/Text";

const Holdings = ({t, holdings, summary}) => {
    return (
        <FlatList
            ListHeaderComponent={<HoldingInfoCard summary={summary}/>}
            ListEmptyComponent={
                () => <Item><Text>{t('dashboard:uReturn.noHoldings')}</Text></Item>
            }
            data={holdings}
            renderItem={({item}) => <HoldingsItem holding={item} showDetail/>}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default withNamespaces()(Holdings);

Holdings.propTypes = {
    holdings: PropTypes.arrayOf(PropTypes.shape(
        {
            id: PropTypes.number,
            intro: PropTypes.string,
            name: PropTypes.string,
            icon: PropTypes.string,
            min_unit: PropTypes.number,
            min_threshold: PropTypes.number,
            max_threshold: PropTypes.number,
            sorting: PropTypes.number,
            value_per_share: PropTypes.string,
            manager_wallet_address: PropTypes.string,
            period: PropTypes.number,
            status: PropTypes.string,
            published_at: PropTypes.string,
            started_at: PropTypes.string,
            created_at: PropTypes.string,
            updated_at: PropTypes.string,
            deleted_at: PropTypes.string,
            finished_at: PropTypes.string,
            is_flexy: PropTypes.number
        }
    ))
};
