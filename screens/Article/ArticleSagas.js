import {call, put} from 'redux-saga/effects';
import ArticleActions from './ArticleRedux';

export function* getArticle(api, action) {
    try {
        const {refreshing, articleSummary} = action;
        console.log('article id', articleSummary.id);
        if (!refreshing) {
            // yield put(LoadingIndicatorActions.showLoadingIndicator(true));
        }
        const res = yield call(api.article, articleSummary.id);
        console.log('article res', res);
        yield call(handleArticleResponse, res, articleSummary);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleArticleResponse(res, articleSummary) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        yield call(handleArticleSuccess, res.data, articleSummary);
    } else {
        yield call(handleArticleError, res);
    }
}

export function* handleArticleSuccess(res, articleSummary) {
    const article = res.data;
    article.cover_url = articleSummary.cover_url;
    console.log('article', article);
    yield put(ArticleActions.articleSuccess(article));
}

export function* handleArticleError(res) {
    // TODO: handle news error
    yield put(ArticleActions.articleFailure('error'));
}