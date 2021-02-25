import {call, put} from 'redux-saga/effects';
import ArticlesActions from './ArticlesRedux';

export function* getArticles(api, action) {
    try {
        const {refreshing} = action;
        if (!refreshing) {
            // yield put(LoadingIndicatorActions.showLoadingIndicator(true));
        }
        const res = yield call(api.articles);
        console.log('articles res', res);
        yield call(handleArticlesResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleArticlesResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code) {
            yield call(handleArticlesSuccess, res.data);
        } else {
            yield call(handleArticlesError, res);
        }
    } else {
        yield call(handleArticlesError, res);
    }
}

export function* handleArticlesSuccess(res) {
    const articles = res.data;
    yield put(ArticlesActions.articlesSuccess(articles));
}

export function* handleArticlesError(res) {
    // TODO: handle news error
}

export function* getBannerSaga(api, action) {
    try {
        const res = yield call(api.banners);
        console.log('banners res', res);
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
    yield put(ArticlesActions.bannerSuccess(banners));
}

export function* handleBannerError(res) {
    // TODO: handle news error
}