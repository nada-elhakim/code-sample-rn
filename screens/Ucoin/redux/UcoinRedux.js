import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    productsRequest: null,
    productsSuccess: ['products'],
    productsFailure: ['error'],
    coinSummaryRequest: null,
    coinSummarySuccess: ['summary'],
    coinSummaryFailure: ['error'],
    coinListScroll: ['scrollPosition']
});

export const UcoinTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    products: null,
    error: null,
    summary: null,
    showSummary: true,
};

export const UcoinSelectors = {
    selectProducts: state => {
        if (state.ucoin.products) {
            const products = [...state.ucoin.products];
            if (products.length > 0) {
                products.forEach(product => product.profit_ratio_fyi_rounded = product.profit_ratio_fyi.toFixed(2))
            }
            return products;
        }

    },
    selectSummary: state => state.ucoin.summary,
    selectShowSummary: state => state.ucoin.showSummary,
};

export const request = (state) => ({...state, loading: true})
export const success = (state, action) => {
    const {products} = action;
    return {
        ...state,
        loading: false,
        products,
        error: false
    };
};
export const failure = (state, action) => ({...state, loading: false, error: action.error, refreshing: false });
export const coinSummarySuccess = (state, action) => ({...state, summary: action.summary});
export const coinListScroll = (state, action) => ({
    ...state,
    showSummary: action.scrollPosition <= 0
});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.PRODUCTS_REQUEST]: request,
    [Types.PRODUCTS_SUCCESS]: success,
    [Types.PRODUCTS_FAILURE]: failure,
    [Types.COIN_SUMMARY_SUCCESS]: coinSummarySuccess,
    [Types.COIN_LIST_SCROLL]: coinListScroll
});