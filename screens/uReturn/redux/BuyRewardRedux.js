import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    buyRewardProduct: ['productId', 'amount', 'trade_password'],
    buyRewardProductSuccess: null,
    buyRewardProductFailure: ['error']
});

export const BuyRewardProductTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    error: null
};

export const BuyRewardProductSelectors = {
    selectLoading: state => state.rewardPurchase.loading
};

export const request = (state, action) => ({...state, loading: true});
export const success = (state, action) => ({...state, loading: false, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.BUY_REWARD_PRODUCT]: request,
    [Types.BUY_REWARD_PRODUCT_SUCCESS]: success,
    [Types.BUY_REWARD_PRODUCT_FAILURE]: failure,
});