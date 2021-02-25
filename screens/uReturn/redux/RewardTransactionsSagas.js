import {call, put} from 'redux-saga/effects';
import TransactionsActions from './UcoinTransactionsRedux';

export function* getUcoinTransactionsSaga(api, action) {
    try {
        const {refreshing} = action;
        if (!refreshing) {
            // yield put(LoadingIndicatorActions.showLoadingIndicator(true));
        }

        const res = yield call(api.coinProductTransactionList);

        console.log('coin transactions', res);

        yield call(handleTransactionsResponse, res);

    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleTransactionsResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        yield call(handleTransactionsSuccess, res.data);
    } else {
        yield call(handleTransactionsError, res);
    }
}

export function* handleTransactionsSuccess(res) {
    const transactions = res.data;
    console.log('transactions res', transactions);
    yield put(TransactionsActions.coinTransactionsSuccess(transactions));
}

export function* handleTransactionsError(res) {
    // TODO: handle news error
}