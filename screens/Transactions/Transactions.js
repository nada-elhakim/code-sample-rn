import React, {Component} from 'react';
import {connect} from "react-redux";
import {withNamespaces} from "react-i18next";
import {FlatList} from "react-native";

import Container from "../../theme/components/Container/Container";
import Item from "../../theme/components/Item/Item";
import Colors from "../../theme/variables/Colors";
import Text from "../../theme/components/Text/Text";
import TransactionItem from "../../components/TransactionItem/TransactionItem";
import TransactionsActions, {TransactionsSelectors} from "./TransactionsRedux";

class Transactions extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:transactions.title')
        }
    };

    pagingParams = {
        page: 1,
        per_page: 20
    };

    componentWillMount() {
        this.props.resetTransactions();
        this._getTransactions();
    }

    render() {
        const {
            transactions
        } = this.props;
        return (
            <Container style={{backgroundColor: Colors.contentColor}}>
                {transactions && this._renderTransactionList(transactions)}
            </Container>
        )
    }

    _renderTransactionList = (transactions) => {
        const {
            t,
            refreshing
        } = this.props;
        return (
            <FlatList
                refreshing={refreshing}
                onRefresh={this._onRefresh}
                data={transactions.items}
                renderItem={({item}) => <TransactionItem transaction={item}/>}
                ListEmptyComponent={() => <Item><Text>{t('dashboard:transactions.noTransactions')}</Text></Item>}
                keyExtractor={item => item.id.toString()}
                onEndReached={this._loadMore}
                onEndThreshold={0}
            />
        )
    };

    _onRefresh = () => {
        this._getTransactions({refreshing: true})
    };

    _getTransactions = (refreshing) => {
        if (refreshing) {
            this.pagingParams.page = 1;
        }
        const {getTransactions} = this.props;
        getTransactions(this.pagingParams, refreshing);
    };

    _loadMore = () => {
        const {
            transactions,
            getTransactions
        } = this.props;
        if (transactions.items.length < transactions.total) {
            this.pagingParams.page++;
            getTransactions(this.pagingParams);
        }
    };
}

const mapStateToProps = (state) => ({
    transactions: TransactionsSelectors.selectTransactions(state),
    refreshing: TransactionsSelectors.selectRefreshStatus(state),

});

const mapDispatchToProps = (dispatch) => ({
    getTransactions: (pagingParams, refreshing) => dispatch(TransactionsActions.transactionsRequest(pagingParams, refreshing)),
    resetTransactions: () =>  dispatch(TransactionsActions.transactionsReset())
});


export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(Transactions));