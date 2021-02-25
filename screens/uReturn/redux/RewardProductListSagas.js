import {call, put} from 'redux-saga/effects';
import RewardProductListActions from './RewardProductListRedux';

export function* getRewardProductsSaga(api, action) {
    try {
        const res = yield call(api.rewardProductList);
        console.log('reward products res', res);
        yield call(handleProductsResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleProductsResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleProductsSuccess, res.data);
        } else {
            yield call(handleProductsError, res);
        }
    } else {
        yield call(handleProductsError, res);
    }
}

export function* handleProductsSuccess(res) {
    const products = res.data;
    yield put(RewardProductListActions.rewardProductListSuccess(products));
    yield put(RewardProductListActions.selectProduct(products[0], products))
}

export function* handleProductsError(res) {
    // TODO: handle news error
}