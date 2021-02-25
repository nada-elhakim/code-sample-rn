import {call, put} from 'redux-saga/effects';
import RewardHoldingActions from './RewardHoldingRedux';

export function* getHoldingSaga(api, action) {
    try {
        const res = yield call(api.rewardProductHoldings);
        yield call(handleHoldingResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleHoldingResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleHoldingSuccess, res.data);
        } else {
            yield call(handleHoldingError, res);
        }
    } else {
        yield call(handleHoldingError, res);
    }
}

export function* handleHoldingSuccess(res) {
    const holdings = res.data;
    console.log('holdings res', holdings);

    yield put(RewardHoldingActions.holdingSuccess(holdings));
}

export function* handleHoldingError(res) {
    // TODO: handle news error
}