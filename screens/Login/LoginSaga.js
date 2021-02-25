import {put, call, select} from 'redux-saga/effects';
import LoginActions from './LoginRedux';
import ProfileActions from '../../redux/common/Profile/ProfileRedux';

import NavigationService from '../../navigation/NavigationService';
import {
    removeTokenFromStorage, saveToken, removeProfileFromStorage, getProfile,
    saveUser, removeUserFromStorage
} from "../../services/Storage";
import {addTokenToRequestHeaders} from "../../services/Api";
import ToastActions from '../../redux/common/Toast/ToastRedux';
import Notifications from '../../services/Notifications';
const notifications = new Notifications();

export function *loginSaga(api, action) {
    try {
        const {credentials, intent} = action;
        if (intent !== 'register') {
            // show loader
        }
        const res = yield call(api.login, credentials);
        console.log('login res', res);
        yield call(handleLoginResponse, api, res, intent);
    } catch (error) {

    }
}

export function *handleLoginResponse(api, res, intent) {
    if (res.status === 200) {
        if (res.data) {
            if (res.data.code === 200) {
                yield call(handleLoginSuccess, api, res.data, intent);
            } else {
                yield call(handleLoginErrors, res);
            }
        } else {
            // yield call(handleConnectivityError, res);
        }
    }
}

export function *handleLoginSuccess(api, res, intent) {
    try {
        const {token, has_trade_password, uid} = res.data;
        yield call(saveToken, token);
        yield call(saveUser, res.data);
        yield call(addTokenToRequestHeaders, api, token);
        yield call(notifications.setTag, uid);
        yield put(LoginActions.loginSuccess());
        let route = 'Home';
        if (!has_trade_password) {
            route = 'TradePassword'
        }
        yield put(ProfileActions.profileRequest());
        yield call(NavigationService.navigate, route);
        yield put(ProfileActions.startProfilePoll());
    } catch (error) {
        console.log('error', error)
    }
}

export function *handleLoginErrors(res) {
    const errorMsg = res.data.message;
    yield put(ToastActions.showToast(errorMsg));
    yield put(LoginActions.loginFailure(errorMsg));

}


export function* logoutSaga(api, action) {
    try {
        const res = yield call(api.logout);
        yield call(handleLogoutResponse, res);
        console.log('logout res', res);
    } catch (error) {
        console.log('error', error)
    }
}

export function* handleLogoutResponse(res) {
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleLogoutSuccess);
        } else {
            yield call(handleLogoutError, res);
        }
    }
}

export function* handleLogoutSuccess() {
    yield call(removeTokenFromStorage);
    yield call(removeProfileFromStorage);
    yield call(removeUserFromStorage);
    const profile = yield select(state => state.profile.profile);
    yield call(notifications.deleteTag, profile.id);
    yield put(LoginActions.logoutSuccess());
    yield put(ProfileActions.clearProfile());
    NavigationService.navigate('Login');
}

export function* handleLogoutError(res) {
    const errorMsg = res.data.message;
    yield put(ToastActions.showToast(errorMsg));
}



