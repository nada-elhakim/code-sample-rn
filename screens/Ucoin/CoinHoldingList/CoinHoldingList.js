import React, {Component} from 'react';
import {
    View,
    FlatList
} from "react-native";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import CoinHoldingListActions, {CoinHoldingListSelectors} from "./CoinHoldingListRedux";
import CoinHoldingListItem from "./CoinHoldingListItem";

class CoinHoldingList extends Component {

    componentWillMount() {
        console.log('props', this.props);
        this.props.getHoldings();
    }


    render() {
        const {holdings} = this.props;
        return (
            <FlatList
                data={holdings}
                renderItem={({item}) => <CoinHoldingListItem holding={item}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    holdings: CoinHoldingListSelectors.selectHoldings(state)
});

const mapDispatchToProps = (dispatch) => ({
    getHoldings: () => dispatch(CoinHoldingListActions.holdingListRequest()),
});

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(CoinHoldingList));
