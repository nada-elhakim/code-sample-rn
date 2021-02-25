import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    buyCoin: ['product', 'amount'],
    buyCoinSuccess: null,
    buyCoinFailure: ['error']
});

export const BuyCoinTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    error: null
};

export const BuyCoinSelectors = {
    selectLoading: state => state.uCoinBuy.loading
};

export const request = (state, action) => ({...state, loading: true});
export const success = (state, action) => ({...state, loading: false, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.BUY_COIN]: request,
    [Types.BUY_COIN_SUCCESS]: success,
    [Types.BUY_COIN_FAILURE]: failure,
});