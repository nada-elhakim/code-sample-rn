import {call, put} from 'redux-saga/effects';
import CoinProductActions from './CoinProductRedux';

export function* getCoinProductSaga(api, action) {
    try {
        const {productId} = action;
        const res = yield call(api.coinProduct, productId);
        yield call(handleCoinProductResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleCoinProductResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleCoinProductSuccess, res.data);
        } else {
            yield call(handleCoinProductError, res);
        }
    } else {
        yield call(handleCoinProductError, res);
    }
}

export function* handleCoinProductSuccess(res) {
    const product = res.data;
    console.log('product', product);
    yield put(CoinProductActions.coinProductSuccess(product));
}

export function* handleCoinProductError(res) {
    // TODO: handle news error
}


