import {call, put} from 'redux-saga/effects';
import RewardSummaryActions from './RewardSummaryRedux';

export function* getRewardSummarySaga(api) {
    try {
        const res = yield call(api.rewardProductSummary);
        console.log('reward summary res', res);
        yield call(handleRewardSummaryResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleRewardSummaryResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleRewardSummarySuccess, res.data);
        } else {
            yield call(handleRewardSummaryError, res);
        }
    } else {
        yield call(handleRewardSummaryError, res);
    }
}

export function* handleRewardSummarySuccess(res) {
    const summary = res.data;
    yield put(RewardSummaryActions.rewardSummarySuccess(summary));
}

export function* handleRewardSummaryError(res) {
    // TODO: handle news error
}