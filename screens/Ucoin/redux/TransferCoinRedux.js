import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    transferCoin: ['amount', 'direction'],
    transferCoinSuccess: null,
    transferCoinFailure: ['error']
});

export const TransferCoinTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    error: null
};

export const TransferCoinSelectors = {
    selectLoading: state => state.uCoinTransfer.loading
};

export const request = (state, action) => ({...state, loading: true});
export const success = (state, action) => ({...state, loading: false, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.TRANSFER_COIN]: request,
    [Types.TRANSFER_COIN_SUCCESS]: success,
    [Types.TRANSFER_COIN_FAILURE]: failure,
});