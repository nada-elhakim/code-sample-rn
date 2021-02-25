import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    coinTransactionsRequest: ['refreshing'],
    coinTransactionsSuccess: ['transactions'],
    coinTransactionsFailure: ['error']
});

export const UcoinTransactionsTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    transactions: null,
    error: null,
    refreshing: false
};

export const UcoinTransactionsSelectors = {
    selectTransactions: state => state.uCoinTransactions.transactions,
    selectRefreshStatus: state => state.uCoinTransactions.refreshing
};

export const request = (state, action) => {
    const {refreshing} = action;
    return {...state, loading: true, refreshing: !!refreshing};
};
export const success = (state, action) => ({...state, loading: false, transactions: action.transactions, error: false, refreshing: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error, refreshing: false });

export const reducer = createReducer(INITIAL_STATE, {
    [Types.COIN_TRANSACTIONS_REQUEST]: request,
    [Types.COIN_TRANSACTIONS_SUCCESS]: success,
    [Types.COIN_TRANSACTIONS_FAILURE]: failure,
});