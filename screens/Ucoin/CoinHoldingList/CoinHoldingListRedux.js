import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    holdingListRequest: null,
    holdingListSuccess: ['holdings'],
    holdingListFailure: ['error']
});

export const CoinHoldingListTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    holdings: null,
    error: null,
    summary: null
};

export const CoinHoldingListSelectors = {
    selectHoldings: state => state.coinHolding.holdings
};

export const request = (state) => ({...state, loading: true})
export const success = (state, action) => {
    const {holdings} = action;
    return {
        ...state,
        loading: false,
        holdings,
        error: false
    };
};
export const failure = (state, action) => ({...state, loading: false, error: action.error, refreshing: false });

export const reducer = createReducer(INITIAL_STATE, {
    [Types.HOLDING_LIST_REQUEST]: request,
    [Types.HOLDING_LIST_SUCCESS]: success,
    [Types.HOLDING_LIST_FAILURE]: failure,
});