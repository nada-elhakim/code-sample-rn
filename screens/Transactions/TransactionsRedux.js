import { createActions, createReducer} from 'reduxsauce';
import i18n from '../../i18n/i18n.config';

const { Types, Creators} = createActions({
    transactionsReset: null,
    transactionsRequest: ['pagingParams', 'refreshing'],
    transactionsSuccess: ['transactions', 'refreshing'],
    transactionsFailure: ['error']
});

export const TransactionsTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    transactions: null,
    error: null,
    refreshing: false
};

export const TransactionsSelectors = {
    selectTransactions: state => {
        if (state.transactions.transactions) {
            const items = [...state.transactions.transactions.items];
            items.length > 0 && items.forEach(transaction => {
                transaction.title = mapTransactionType(transaction.type);
            });

            return state.transactions.transactions;
        }


    },
    selectRefreshStatus: state => state.transactions.refreshing
};

export const request = (state, action) => {
    const {refreshing} = action;
    return {...state, loading: true, refreshing: !!refreshing};
};

export const success = (state, action) => {
    const {transactions, refreshing} = action;
    let oldTransactions = state.transactions ? state.transactions.items : [];
    if (refreshing) {
        oldTransactions = [];
    }
    const newTransactions = oldTransactions.concat(transactions.items);
    console.log('new transactions', newTransactions);
    transactions.items = newTransactions;
    return {
        ...state,
        loading: false,
        transactions,
        error: false,
        refreshing: false
    }
};

export const failure = (state, action) => ({...state, loading: false, error: action.error, refreshing: false });
export const reset = (state, action) => ({...state, transactions: null});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.TRANSACTIONS_RESET]: reset,
    [Types.TRANSACTIONS_REQUEST]: request,
    [Types.TRANSACTIONS_SUCCESS]: success,
    [Types.TRANSACTIONS_FAILURE]: failure,
});

function mapTransactionType(type) {
    switch (type) {
        case 'internal':
            return i18n.t('dashboard:transactions.transactionTypes.internal');
        case 'withdraw':
            return i18n.t('dashboard:transactions.transactionTypes.withdraw');
        case 'deposit':
            return i18n.t('dashboard:transactions.transactionTypes.deposit');
        default:
            return i18n.t('dashboard:transactions.transactionTypes.external');
    }
}