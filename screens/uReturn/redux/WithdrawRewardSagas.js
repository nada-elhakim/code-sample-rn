import {call, put} from 'redux-saga/effects';
import WithdrawRewardActions from './WithdrawRewardRedux';
import ToastActions from '../../../redux/common/Toast/ToastRedux';

export function* withdrawRewardSaga(api, action) {
    try {
        const {target, amount} = action;

        let res = target === 'useBalance' ?
            yield call(api.withdrawRewardToUseBalance, amount):
            yield call(api.withdrawRewardToCoin, amount);

        console.log('reward withdraw res', res);
        yield call(handleWithdrawRewardResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleWithdrawRewardResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleWithdrawRewardSuccess, res.data);
        } else {
            yield call(handleWithdrawRewardError, res);
        }
    } else {
        yield call(handleWithdrawRewardError, res);
    }
}

export function* handleWithdrawRewardSuccess(res) {
    // const transactions = res.data;
    // console.log('coin transfer res', transactions);
    yield put(WithdrawRewardActions.withdrawRewardSuccess());
    yield put(ToastActions.showToast('Reward withdraw success', 'success'));

}

export function* handleWithdrawRewardError(res) {
    const errorMsg = res.data.message;
    yield put(WithdrawRewardActions.withdrawRewardFailure(errorMsg));
    yield put(ToastActions.showToast(errorMsg));

}