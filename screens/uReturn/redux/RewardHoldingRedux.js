import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    holdingRequest: ['params', 'refreshing'],
    holdingSuccess: ['holdings'],
    holdingFailure: ['error'],
});

export const RewardHoldingTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    holdings: null,
    balance: null,
    error: null
};

export const RewardHoldingSelectors = {
    selectHoldings: state => state.rewardHolding.holdings,
    selectLoading: state => state.rewardHolding.holdings,
};

export const request = (state) => ({...state, loading: true})
export const success = (state, action) => ({...state, loading: false, holdings: action.holdings, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error, refreshing: false });

export const reducer = createReducer(INITIAL_STATE, {
    [Types.HOLDING_REQUEST]: request,
    [Types.HOLDING_SUCCESS]: success,
    [Types.HOLDING_FAILURE]: failure,
});