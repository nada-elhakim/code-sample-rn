import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    withdrawReward: ['target', 'amount'],
    withdrawRewardSuccess: null,
    withdrawRewardFailure: ['error']
});

export const WithdrawRewardTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    error: null
};

export const WithdrawRewardSelectors = {
    selectLoading: state => state.uCoinBuy.loading
};

export const request = (state, action) => ({...state, loading: true});
export const success = (state, action) => ({...state, loading: false, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.WITHDRAW_REWARD]: request,
    [Types.WITHDRAW_REWARD_SUCCESS]: success,
    [Types.WITHDRAW_REWARD_FAILURE]: failure,
});