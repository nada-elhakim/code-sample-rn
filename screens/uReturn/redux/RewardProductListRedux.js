import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    rewardProductListRequest: ['refreshing'],
    rewardProductListSuccess: ['products'],
    rewardProductListFailure: ['error'],
    selectProduct: ['selectedProduct', 'products']
});

export const RewardProductListTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    products: null,
    error: null,
    refreshing: false,
    selectedProduct: null
};

export const RewardProductListSelectors = {
    selectProducts: state => state.rewardProducts.products,
    selectSelectedProduct: state => state.rewardProducts.selectedProduct,
    selectRefreshStatus: state => state.rewardProducts.refreshing,
    selectLoading: state => state.rewardProducts.loading
};

export const request = (state, action) => {
    const {refreshing} = action;
    return {...state, loading: true, refreshing: !!refreshing};
};
export const success = (state, action) => ({
    ...state,
    loading: false,
    products: action.products,
    error: false, refreshing: false
});
export const failure = (state, action) => ({...state, loading: false, error: action.error, refreshing: false });
export const selectProduct = (state, action) => {
    const {selectedProduct, products} = action;
    const newProducts = [...products];
    newProducts.forEach(product => product.checked = false);
    const index = newProducts.findIndex(product => product.id === selectedProduct.id);
    newProducts[index].checked = true;
    return {...state, products: newProducts, selectedProduct};
};

export const reducer = createReducer(INITIAL_STATE, {
    [Types.REWARD_PRODUCT_LIST_REQUEST]: request,
    [Types.REWARD_PRODUCT_LIST_SUCCESS]: success,
    [Types.REWARD_PRODUCT_LIST_FAILURE]: failure,
    [Types.SELECT_PRODUCT]: selectProduct,
});