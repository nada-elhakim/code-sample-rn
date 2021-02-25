import {call, put} from 'redux-saga/effects';
import ProfileActions from '../../redux/common/Profile/ProfileRedux';
import {saveProfile} from "../../services/Storage";
import ToastActions from '../../redux/common/Toast/ToastRedux';
import KYCActions from './KYCRedux';
import i18n from '../../i18n/i18n.config';

export function* updateKYCSaga(api, action) {
    console.log('update kyc called');
    console.log('user info', action.userInfo);
    try {
        const {userInfo} = action;
        const res = yield call(api.updateKYC, userInfo);
        yield call(handleKYCResponse, res);
        console.log('kyc user info', userInfo, res);
    } catch (error) {
        console.log('error', error);
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }
}

export function* handleKYCResponse(res) {
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleKYCSuccess, res.data);
        } else {
            yield call(handleKYCError, res);
        }
    } else {
        yield call(handleKYCError, res);
    }
}

export function* handleKYCSuccess(res) {
    const successMessage = i18n.t('dashboard:kyc.updateSuccess');
    const profile = res.data;
    yield call(saveProfile, profile);
    yield put(KYCActions.kycSuccess());
    yield put(ProfileActions.profileSuccess(profile));
    yield put(ToastActions.showToast(successMessage, 'success'));

}

export function* handleKYCError(res) {
    const errorMessage = res.data.message;
    yield put(KYCActions.kycFailure(errorMessage));
    yield put(ProfileActions.profileFailure(errorMessage));
    yield put(ToastActions.showToast(errorMessage));
}