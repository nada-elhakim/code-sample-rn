import {
    put,
    call,
    take,
    race
} from 'redux-saga/effects';
import {delay} from "redux-saga";
import ProfileActions, {ProfileTypes} from './ProfileRedux';
import {
    getProfile, getUser, removeProfileFromStorage, removeTokenFromStorage,
    saveProfile
} from "../../../services/Storage";
import config from "../../../config/AppConfig";
import {handleLogoutSuccess} from "../../../screens/Login/LoginSaga";

export function* getProfileSaga(api, action) {
    try {
        const {fromStorage} = action;
        if (fromStorage) {
            const profile = yield call(getProfile);
            if (profile) {
                yield put(ProfileActions.profileSuccess(profile));
            } else {
                yield call(callProfileApi, api);
            }
        } else {
           yield call(callProfileApi, api);
        }

    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }
}

export function* callProfileApi(api) {
    const res = yield call(api.profile);
    yield call(handleProfileResponse, res);
}

export function* handleProfileResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleProfileSuccess, res.data);
        } else {
            switch (res.status.code) {
                case 400:
                    // Logout user
                    yield call(handleLogoutSuccess);
                    break;
            }
        }

    } else {
        yield call(handleProfileError, res);
    }
}

export function* handleProfileSuccess(res) {
    console.log('res', res);
    const profile = res.data;
    yield call(saveProfile, profile);
    yield put(ProfileActions.profileSuccess(profile));
}

export function* handleProfileError(res) {
    yield put(ProfileActions.profileFailure('error'));
}

export function* pollProfileSaga() {
    while (true) {
        yield put(ProfileActions.profileRequest());
        yield call(delay, config.api.pollProfileInterval);
    }
}

export function* pollProfileSagaWatcher() {
    while (true) {
        yield take(ProfileTypes.START_PROFILE_POLL);
        yield race([
            call(pollProfileSaga),
            take(ProfileTypes.STOP_PROFILE_POLL)
        ]);
    }
}

export function* getUserSaga(action) {
    const user = yield call(getUser);
    if (user) {
        yield put(ProfileActions.userSuccess(user));
    }
}
