import {call, put} from 'redux-saga/effects';
import CatBannerActions from './CatBannerRedux';

export function* getCatBannerSaga(api, action) {
    try {
        const res = yield call(api.catBanners);
        console.log('cat banners res', res);
        yield call(handleBannerResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleBannerResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code) {
            yield call(handleBannerSuccess, res.data);
        } else {
            yield call(handleBannerError, res);
        }
    } else {
        yield call(handleBannerError, res);
    }
}

export function* handleBannerSuccess(res) {
    const banners = res.data;
    yield put(CatBannerActions.catBannerSuccess(banners));
}

export function* handleBannerError(res) {
    // TODO: handle news error
    const errorMsg = res.code.message;
    yield put(CatBannerActions.catBannerFailure(errorMsg));
}