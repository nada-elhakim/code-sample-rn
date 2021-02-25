import {call, put} from 'redux-saga/effects';
import {getToken} from "../../../services/Storage";
import NavigationService from "../../../navigation/NavigationService";
import {addTokenToRequestHeaders} from "../../../services/Api";
import ProfileActions from '../Profile/ProfileRedux';

export function* checkAuthStatusSaga(api, action) {
    try {
        const token = yield call(getToken);
        const route = token ? 'Home' : 'Login';
        yield call(addTokenToRequestHeaders, api, token);
        yield call(NavigationService.navigate, route);
        if (token) {
            yield put(ProfileActions.stopProfilePoll());
            yield put(ProfileActions.startProfilePoll());
        }
    } catch (error) {
    }

}

