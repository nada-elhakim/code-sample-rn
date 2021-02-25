import React, {Component} from 'react';
import {connect} from "react-redux";
import {withNamespaces} from "react-i18next";
import {FlatList, RefreshControl, StyleSheet, View} from "react-native";

import Container from "../../../theme/components/Container/Container";
import Content from "../../../theme/components/Content/Content";
import Item from "../../../theme/components/Item/Item";
import ItemHeading from "../../../theme/components/ItemHeading/ItemHeading";
import Colors from "../../../theme/variables/Colors";
import TypographyStyles from "../../../theme/styles/TypographyStyles";
import Button from "../../../theme/components/Button/Button";
import Text from "../../../theme/components/Text/Text";
import Metrics from "../../../theme/variables/Metrics";
import TransactionItem from "../../../components/TransactionItem/TransactionItem";
import UcoinTransactionsActions, {UcoinTransactionsSelectors} from "../redux/UcoinTransactionsRedux";
import LayoutStyles from "../../../theme/styles/LayoutStyles";
import Note from "../../../theme/components/Note/Note";

class UcoinTransactions extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:transactions.title')
        }
    };

    componentWillMount() {
        this._getTransactions();
    }

    render() {
        const {
            transactions,
            refreshing
        } = this.props;

        return (
            <Container style={{backgroundColor: Colors.contentColor}}>
                <Content
                    contentContainerStyle={{flex: 1}}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this._onRefresh}
                        />}
                >
                    {transactions && this._renderTransactionList()}
                </Content>
            </Container>
        )
    }

    _renderTransactionList = () => {
        const {
            transactions,
            t
        } = this.props;
        return (
            <FlatList
                data={transactions}
                ListEmptyComponent={() => <Item><Text>{t('dashboard:transactions.noTransactions')}</Text></Item>}
                renderItem={this._renderTransactionListItem}
                keyExtractor={item => item.id.toString()}/>
        )
    }

    _renderTransactionListItem = ({item}) => {
        const {t} = this.props;
        return (
            <Item>
                <View style={[
                    LayoutStyles.spaceBetween,
                    {marginBottom: Metrics.defaultMargin}
                ]}>
                    <ItemHeading style={styles.heading}>
                        {item.reasonText}
                    </ItemHeading>
                    <Text
                        style={[
                            styles.number,
                            (item.amount < 0) && styles.withdraw
                        ]}>
                        {item.amount} USE
                    </Text>
                </View>
                <Note style={styles.note}>{item.created_at}</Note>
            </Item>
        );
    };

    _onRefresh = () => {
        this._getTransactions({refreshing: true})
    };

    _getTransactions = (refreshing) => {
        const {getTransactions} = this.props;
        getTransactions(refreshing);
    }
}

const mapStateToProps = (state) => ({
    transactions: UcoinTransactionsSelectors.selectTransactions(state),
    refreshing: UcoinTransactionsSelectors.selectRefreshStatus(state),

});

const mapDispatchToProps = (dispatch) => ({
    getTransactions: (refreshing) => dispatch(UcoinTransactionsActions.coinTransactionsRequest(refreshing))
});


export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(UcoinTransactions));

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
