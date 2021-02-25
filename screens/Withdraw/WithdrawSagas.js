import {call, put} from 'redux-saga/effects';
import WithdrawActions from './WithdrawRedux';
import ToastActions from '../../redux/common/Toast/ToastRedux';
import i18n from '../../i18n/i18n.config';
import ProfileActions from '../../redux/common/Profile/ProfileRedux';
import EvaluateActions from '../../redux/common/Evaluate/EvaluateRedux';
import CurrencyActions from '../../redux/common/Currency/CurrencyRedux';

import {reset, change} from 'redux-form';

export function* withdrawSaga(api, action) {
    try {
        const {withdrawParams} = action;
        const res = yield call(api.withdraw, withdrawParams);
        yield call(handleWithdrawResponse, res);
        console.log('withdraw res', res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleWithdrawResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleWithdrawSuccess, res.data);
        } else {
            yield call(handleWithdrawError, res);
        }
    } else {
        yield call(handleWithdrawError, res);
    }
}

export function* handleWithdrawSuccess(res) {
    const transactions = res.data;
    yield put(WithdrawActions.withdrawSuccess(transactions));
    // yield put(reset('withdrawForm'));
    yield put(change('withdrawForm', 'amount', ''));
    yield put(change('withdrawForm', 'address', ''));
    yield put(change('withdrawForm', 'captcha', ''));
    yield put(reset('tradePasswordModalForm'));
    yield put(ProfileActions.profileRequest());
    yield put(EvaluateActions.evaluateRequest());
    const successMsg = i18n.t('dashboard:withdraw.withdrawSuccess');
    yield put(ToastActions.showToast(successMsg, 'success'));

}

export function* handleWithdrawError(res) {
    const error = res.data.message;
    yield put(WithdrawActions.withdrawFailure(error));
    yield put(ToastActions.showToast(error));


}