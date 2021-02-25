import React from 'react';
import {View, StyleSheet} from "react-native";
import {withNamespaces} from "react-i18next";
import PropTypes from 'prop-types';

import Text from "../../theme/components/Text/Text";
import Item from "../../theme/components/Item/Item";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Note from "../../theme/components/Note/Note";
import LayoutStyles from "../../theme/styles/LayoutStyles";
import Metrics from "../../theme/variables/Metrics";
import Colors from "../../theme/variables/Colors";
import {formatNumber} from "../../services/Utils";

const TransactionItem = ({t, transaction}) => {
    return (
        <Item>
            <View style={[
                LayoutStyles.spaceBetween,
                {marginBottom: Metrics.defaultMargin}
                ]}>
                <ItemHeading style={styles.heading}>
                    {transaction.category_text}
                </ItemHeading>
                <Text
                    style={[
                        styles.number,
                        transaction.amount < 1 && styles.withdraw
                    ]}>
                    {formatNumber(transaction.amount)} {transaction.currency_symbol}
                </Text>
            </View>
            <Note style={[
                styles.note,
                {color: Colors.dark, marginBottom: 5}]}>
                {transaction.address}
            </Note>
            {transaction.memo ? <Text style={{marginBottom: 5}}>
                {transaction.memo}
            </Text> : null}
            <Note style={styles.note}>
                {transaction.created_at}
            </Note>
        </Item>
    );
};

export default withNamespaces()(TransactionItem);

TransactionItem.propTypes = {
    transaction: PropTypes.shape({
        id: PropTypes.number,
        currency_id: PropTypes.number,
        category_text: PropTypes.string,
        currency_symbol: PropTypes.string,
        user_id: PropTypes.number,
        address: PropTypes.string,
        amount: PropTypes.number,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
        memo: PropTypes.string,
        status: PropTypes.string,
    })
};


TransactionItem.defaultProps = {
    transaction: {
        id: 1,
        status: '充值',
        created_at: '2018.08.13 11:0',
        address: '1CSRLJsao4R86RForBENvyT4ZD6TXsNMBZ',
        amount: '-30.093038',
        user_id: 1
    }
};

const styles = StyleSheet.create({
    heading: {
        color: Colors.dark,
        marginBottom: 0,
    },
    number: {
        fontSize: 16,
        color: Colors.success
    },
    note: {
        fontSize: 12
    },
    withdraw: {
        color: Colors.danger
    }
});

