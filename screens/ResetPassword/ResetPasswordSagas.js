import {call, put} from 'redux-saga/effects';
import ToastActions from '../../redux/common/Toast/ToastRedux';
import ResetPasswordActions from './ResetPasswordRedux';
import i18n from '../../i18n/i18n.config';
import NavigationService from "../../navigation/NavigationService";

export function* resetPasswordSaga(api, action) {
    try {
        const {passwordParams} = action;
        let res;
        let intent;
        if (passwordParams.old_password) {
            res = yield call(api.editPassword, passwordParams);
            intent = 'edit_pass';
        } else {
            res = yield call(api.resetPassword, passwordParams);
            intent = 'reset_pass';
        }
        yield call(handleResetPasswordResponse, res, intent);
        console.log('reset password', res);
    } catch (error) {

    }

}

export function* handleResetPasswordResponse(res, intent) {
    if (res.status === 200) {
       if (res.data.code === 200) {
           yield call(handleResetPasswordSuccess, intent);
       } else {
           yield call(handleResetPasswordErrors, res);
       }
    } else {
    }
}

export function* handleResetPasswordSuccess(intent) {
    const successMsg = i18n.t('auth:forgotPassword.passwordSetSuccess')
    yield put(ResetPasswordActions.resetPasswordSuccess());
    yield put(ToastActions.showToast(successMsg, 'success'));
    if (intent === 'reset_pass') {
        NavigationService.back();
    } else {
        NavigationService.pop(2);
    }
}

export function* handleResetPasswordErrors(res) {
    const errorMsg = res.data.message;
    yield put(ResetPasswordActions.resetPasswordFailure());
    yield put(ToastActions.showToast(errorMsg));
}