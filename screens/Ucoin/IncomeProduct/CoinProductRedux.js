import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    coinProductRequest: ['productId', 'reset'],
    coinProductSuccess: ['product'],
    coinProductFailure: ['error']
});

export const CoinProductTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    product: null,
    error: null
};

export const CoinProductSelectors = {
    selectProduct: state => state.coinProduct.product,
    selectLoading: state => state.coinProduct.loading
};

export const request = (state, action) => {
    const newState = {...state, loading: true};
    if (action.reset) {
        newState.product = null
    }
    return newState;
};

export const success = (state, action) => {
    const product = {...action.product};
    product.profit_ratio_fyi = product.profit_ratio_fyi.toFixed(2);
    return {
        ...state,
        loading: false,
        product,
        error: false
    };
}
export const failure = (state, action) => ({...state, loading: false, error: action.error, refreshing: false });

export const reducer = createReducer(INITIAL_STATE, {
    [Types.COIN_PRODUCT_REQUEST]: request,
    [Types.COIN_PRODUCT_SUCCESS]: success,
    [Types.COIN_PRODUCT_FAILURE]: failure,
});