import { createActions, createReducer} from 'reduxsauce';
import i18n from '../../../i18n/i18n.config';

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
    selectTransactions: state => {
        if (state.uCoinTransactions.transactions) {
            const transactions = [...state.uCoinTransactions.transactions];
            console.log('coin transactions', transactions);
            transactions.length > 0 && transactions.forEach(transaction => {
                transaction.reasonText = mapTransactionType(transaction.reason_code);
            });

            return transactions;
        }


    },
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

function mapTransactionType(reasonCode) {
    switch (reasonCode) {
        case 'deposit':
            return i18n.t('dashboard:uCoin.transactionTypes.deposit');
        case 'withdraw':
            return i18n.t('dashboard:uCoin.transactionTypes.withdraw');
        case 'buy':
            return i18n.t('dashboard:uCoin.transactionTypes.buy');
        case 'principal':
            return i18n.t('dashboard:uCoin.transactionTypes.principal');
        case 'period_reward':
            return i18n.t('dashboard:uCoin.transactionTypes.periodReward');
        case 'interest':
            return i18n.t('dashboard:uCoin.transactionTypes.interest');
        case 'from_u_reward':
            return i18n.t('dashboard:uCoin.transactionTypes.fromUReward');
        case 'to_u_reward':
            return i18n.t('dashboard:uCoin.transactionTypes.toUReward');
        case 'from_u_coin':
            return i18n.t('dashboard:uCoin.transactionTypes.fromUCoin');
        case 'to_u_coin':
            return i18n.t('dashboard:uCoin.transactionTypes.toUCoin');
        default:
            return i18n.t('dashboard:uCoin.transactionTypes.reward');
    }
}