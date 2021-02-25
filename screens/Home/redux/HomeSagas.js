import {call, put} from 'redux-saga/effects';
import CurrencyActions from '../../../redux/common/Currency/CurrencyRedux';
import EvaluateActions from '../../../redux/common/Evaluate/EvaluateRedux';
import HomeActions from './HomeRedux';
import CatBannerActions from './CatBannerRedux';
import ProfileActions from '../../../redux/common/Profile/ProfileRedux';

export function* loadHomeDataSaga(action) {
    try {
        const {refreshing} = action;
        if (!refreshing) {
            // yield put(LoadingIndicatorActions.showLoadingIndicator(true));
        }
        yield put(ProfileActions.profileRequest());
        yield put(CurrencyActions.currencyRequest());
        yield put(EvaluateActions.evaluateRequest());
        yield put(CatBannerActions.catBannerRequest());
        yield put(HomeActions.loadHomeDataSuccess());
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }
}