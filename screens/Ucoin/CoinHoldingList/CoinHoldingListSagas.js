import {call, put} from 'redux-saga/effects';
import CoinHoldingListActions from './CoinHoldingListRedux';

export function* getCoinHoldingListSaga(api) {
    try {
        const res = yield call(api.coinHoldingList);
        console.log('coin holding res', res);
        yield call(handleCoinHoldingListResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleCoinHoldingListResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleCoinHoldingListSuccess, res.data);
        } else {
            yield call(handleCoinHoldingListError, res);
        }
    } else {
        yield call(handleCoinHoldingListError, res);
    }
}

export function* handleCoinHoldingListSuccess(res) {
    const holdings = res.data;
    yield put(CoinHoldingListActions.holdingListSuccess(holdings));
}

export function* handleCoinHoldingListError(res) {
    // TODO: handle news error
}
