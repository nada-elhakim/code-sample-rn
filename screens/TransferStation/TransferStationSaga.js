import {call, put} from 'redux-saga/effects';
import TransferActions from './TransferStationRedux';
import ToastActions from '../../redux/common/Toast/ToastRedux';
import i18n from '../../i18n/i18n.config';
import ProfileActions from '../../redux/common/Profile/ProfileRedux';
import {reset, change} from 'redux-form';

export function* transferSaga(api, action) {
    try {
        const {transferParams} = action;
        const res = yield call(api.transfer, transferParams);
        yield call(handleTransferResponse, res);
        console.log('transfer res', res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleTransferResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleTransferSuccess, res.data);
        } else {
            yield call(handleTransferError, res);
        }
    } else {
        yield call(handleTransferError, res);
    }
}

export function* handleTransferSuccess(res) {
    const transactions = res.data;
    yield put(TransferActions.transferSuccess(transactions));
    // yield put(reset('transferStationForm'));
    yield put(change('transferStationForm', 'amount', ''));
    yield put(change('transferStationForm', 'address', ''));
    yield put(change('transferStationForm', 'memo', ''));
    yield put(reset('tradePasswordModalForm'));
    yield put(ProfileActions.profileRequest());
    const successMsg = i18n.t('dashboard:transferStation.transferSuccess');
    yield put(ToastActions.showToast(successMsg, 'success'));

}

export function* handleTransferError(res) {
    const errorMsg = res.data.message;
    yield put(TransferActions.transferFailure(errorMsg));
    yield put(ToastActions.showToast(errorMsg));


}