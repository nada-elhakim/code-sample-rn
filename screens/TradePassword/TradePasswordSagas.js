import {call, put} from 'redux-saga/effects';
import ToastActions from '../../redux/common/Toast/ToastRedux';
import NavigationService from "../../navigation/NavigationService";
import i18n from '../../i18n/i18n.config';

export function* setTradePasswordSaga(api, action) {
    try {
        const {
            trade_password,
            old_trade_password,
            captcha
        } = action;


        const hasTradePassword = !!old_trade_password;

        console.log(trade_password, old_trade_password, hasTradePassword, captcha);
        let res;
        if (old_trade_password) {
            res = yield call(api.editTradePassword, {
                trade_password,
                old_trade_password,
                captcha
            });
        } else {
            res = yield call(api.setTradePassword, trade_password);
        }
        yield call(handleSetTradePasswordResponse, res, hasTradePassword);
    } catch (error) {

    }
}

export function* handleSetTradePasswordResponse(res, hasTradePassword) {
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleSetTradePasswordSuccess, res, hasTradePassword);
        } else {
            yield call(handleResetPasswordErrors, res);
        }
    } else {
    }
}

export function* handleSetTradePasswordSuccess(res, hasTradePassword) {
    const successMsg = i18n.t('dashboard:tradePassword.passwordChangeSuccess')
    yield put(ToastActions.showToast(successMsg, 'success'));
    if (!hasTradePassword) {
        NavigationService.navigate('Home');
    } else {
        NavigationService.pop(2);
    }

}

export function* handleResetPasswordErrors(res) {
    const errorMsg = res.data.message;
    yield put(ToastActions.showToast(errorMsg));
}