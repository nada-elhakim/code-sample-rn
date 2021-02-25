import {call, put} from 'redux-saga/effects';
import TransactionsActions from './TransactionsRedux';

export function* getTransactionsSaga(api, action) {
    try {
        const {
            refreshing,
            pagingParams
        } = action;
        if (!refreshing) {
            // yield put(LoadingIndicatorActions.showLoadingIndicator(true));
        }
        const res = yield call(api.transactions, pagingParams);
        yield call(handleTransactionsResponse, res, refreshing);

    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleTransactionsResponse(res, refreshing) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleTransactionsSuccess, res.data, refreshing);
        } else {
            yield call(handleTransactionsError, res);
        }
    } else {
        yield call(handleTransactionsError, res);
    }
}

export function* handleTransactionsSuccess(res, refreshing) {
    const transactions = res.data;
    yield put(TransactionsActions.transactionsSuccess(transactions, refreshing));
}

export function* handleTransactionsError(res) {
    // TODO: handle news error
}