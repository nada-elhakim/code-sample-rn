import {put, call, select} from 'redux-saga/effects';
import RegisterActions from './RegisterRedux';
import LoginActions from '../Login/LoginRedux';
import i18n from '../../i18n/i18n.config';
import NavigationService from '../../navigation/NavigationService';
import _ from 'lodash';
import ToastActions from '../../redux/common/Toast/ToastRedux';
import CaptchaActions, {CaptchaSelectors} from '../../redux/common/Captcha/CaptchaRedux';

// import LoadingIndicatorActions from '../../Components/LoadingIndicator/LoadingIndicatorRedux';
// import {handleConnectivityError, handleGenericNetworkErrors} from '../../Redux/Common/NetworkErrors/NetworkErrorsSaga';


export function* checkUserExistenceSaga(api, action) {
    try {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(true));
        console.log('action', action);
        const {phone} = action.values;
        if (phone && phone !== '') {
            const res = yield call(api.checkUserExists, phone);
            console.log('user exists res', res);
            yield call(handleUserExistsResponse, res, action);
        }
    } catch(error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }
}

export function* handleUserExistsResponse(res, action) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleUserExistsSuccess, res, action);
        } else {
            yield call(handleUserExistsError, res, action);
        }
    } else {
        // yield call(handleConnectivityError, res);
    }
}

export function handleUserExistsSuccess(res, action) {
    const {resolve, reject} = action;
    const userExists = res.data.data.exists,
        errors = {};

    if (userExists) {
        errors.phone = i18n.t('auth:register.errors.userExists');
    }

    if (!_.isEmpty(errors)) {
        reject(errors);
    }
    resolve();
}

export function* handleUserExistsError(res) {

}



export function* registerSaga(api, action) {
    try {
        const { user } = action;
        const res = yield call(api.register, user);
        console.log('register res', res);
        yield call(handleRegisterResponse, res, user);
    } catch(error) {
    }
}

export function* handleRegisterResponse(res, user) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    // yield call(NavigationService.navigate, 'TradePassword');

    if (res.data) {
        if (res.data.code === 200) {
            yield call(handleRegisterSuccess, user);
        } else {
            yield call(handleRegisterError, res);
        }
    } else {
        // yield call(handleConnectivityError, res);
    }
}

export function* handleRegisterSuccess(user) {
    const message = i18n.t('auth:register.registerSuccessMessage');
    // TODO: Handle automatic login
    // const {phone, password, captcha} = user;
    // const credentials = {
    //     phone,
    //     password,
    //     captcha
    // };
    // yield put(CaptchaActions.captchaRequest(credentials.phone, 'login_2fa'));
    // const loginCaptcha = yield select(CaptchaSelectors.selectCaptcha);
    // console.log('login captcha', loginCaptcha);
    // credentials.captcha = loginCaptcha;
    // yield put(LoginActions.loginRequest(credentials, 'register'));
    yield put(RegisterActions.registerSuccess());
    yield put(ToastActions.showToast(message, 'success'));
    yield call(NavigationService.navigate, 'Login');
}

export function* handleRegisterError(res) {
    let errorMsg = res.data.message;
    // switch (res.data.code) {
    //     case 400:
    //         errorMsg = i18n.t('auth:register.errors.userExists');
    //         break;
    //     case 0:
    //         // Captcha expired
    //         errorMsg = i18n.t('auth:errors.captchaExpired');
    //         break;
    //     default:
    //         errorMsg = 'Error registering';
    //         // errorMsg = yield call(handleGenericNetworkErrors, res);
    // }
    yield put(RegisterActions.registerFailure(errorMsg));
    yield put(ToastActions.showToast(errorMsg));
}
