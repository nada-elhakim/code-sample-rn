import React, {Component} from 'react';
import {
    FlatList
} from "react-native";
import {withNamespaces} from "react-i18next";
import IncomeProductItem from "./IncomeProductItem";
import {connect} from "react-redux";
import UcoinActions, {UcoinSelectors} from "../redux/UcoinRedux";

class CoinProductList extends Component {
    componentWillMount() {
        this.props.getProducts();
    }

    render() {
        const {products} = this.props;
        return (
            <FlatList
                data={products}
                renderItem={({item}) => <IncomeProductItem product={item} showDetail/>}
                keyExtractor={(item) => item.id.toString()}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    products: UcoinSelectors.selectProducts(state)
});

const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch(UcoinActions.productsRequest()),
});


export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(CoinProductList));

