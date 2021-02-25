import {call, put} from 'redux-saga/effects';
import UcoinActions from './UcoinRedux';

export function* getProductsSaga(api, action) {
    try {
        const res = yield call(api.coinProductList);
        console.log('products res', res);
        yield call(handleProductsResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleProductsResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        yield call(handleProductsSuccess, res.data);
    } else {
        yield call(handleProductsError, res);
    }
}

export function* handleProductsSuccess(res) {
    const articles = res.data;
    yield put(UcoinActions.productsSuccess(articles));
}

export function* handleProductsError(res) {
    // TODO: handle news error
}


export function* getCoinSummarySaga(api) {
    try {
        const res = yield call(api.coinProductSummary);
        console.log('summary res', res);
        yield call(handleCoinSummaryResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleCoinSummaryResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        yield call(handleCoinSummarySuccess, res.data);
    } else {
        yield call(handleCoinSummaryError, res);
    }
}

export function* handleCoinSummarySuccess(res) {
    const summary = res.data;
    yield put(UcoinActions.coinSummarySuccess(summary));
}

export function* handleCoinSummaryError(res) {
    // TODO: handle news error
}