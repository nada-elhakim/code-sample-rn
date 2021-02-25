import {call, put} from 'redux-saga/effects';
import TransferCoinActions from './TransferCoinRedux';
import ToastActions from '../../../redux/common/Toast/ToastRedux';
import ProfileActions from '../../../redux/common/Profile/ProfileRedux';
import i18n from '../../../i18n/i18n.config';
import UcoinActions from './UcoinRedux';

export function* transferCoinSaga(api, action) {
    try {
        const {amount, direction} = action;

        console.log(amount,direction);
        const res = direction === 'in' ?
            yield call(api.depositCoinFromUseBalance, amount) :
            yield call(api.withdrawCoinToUseBalance, amount);

        console.log('ucoin transfer res', res);
        yield call(handleTransferCoinResponse, res, direction);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleTransferCoinResponse(res, direction) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleTransferCoinSuccess, res.data, direction);
        } else {
            yield call(handleTransferCoinError, res);
        }
    } else {
        yield call(handleTransferCoinError, res);
    }
}

export function* handleTransferCoinSuccess(res, direction) {
    const successMsg =
        direction === 'in' ? i18n.t('dashboard:uCoin.transferInSuccess'):
            i18n.t('dashboard:uCoin.transferOutSuccess');
    const profile = res.data;
    yield put(ProfileActions.profileSuccess(profile));
    yield put(UcoinActions.coinSummaryRequest());
    yield put(TransferCoinActions.transferCoinSuccess());
    yield put(ToastActions.showToast(successMsg, 'success'));

}

export function* handleTransferCoinError(res) {
    const errorMessage = res.data.message;
    yield put(TransferCoinActions.transferCoinFailure());
    yield put(ToastActions.showToast(errorMessage));

}