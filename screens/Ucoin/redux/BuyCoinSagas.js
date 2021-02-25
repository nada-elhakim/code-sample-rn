import {call, put} from 'redux-saga/effects';
import BuyCoinActions from './BuyCoinRedux';
import ToastActions from '../../../redux/common/Toast/ToastRedux';
import NavigationService from "../../../navigation/NavigationService";
import i18n from '../../../i18n/i18n.config';
import UcoinActions from './UcoinRedux';
import CoinHoldingListActions from '../CoinHoldingList/CoinHoldingListRedux';

export function* buyCoinSaga(api, action) {
    try {
        const {product, amount} = action;

        const params = {
            amount,
            period: product.is_flexy === 0 ? 0 : product.period
        };

        const res = yield call(api.buyCoinProduct, product.id, params);

        console.log('ucoin buy res', res);
        yield call(handleBuyCoinResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleBuyCoinResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleBuyCoinSuccess, res.data);
        } else {
            yield call(handleBuyCoinError, res);
        }
    } else {
        yield call(handleBuyCoinError, res);
    }
}

export function* handleBuyCoinSuccess(res) {
    const successMsg = i18n.t('dashboard:uCoin.buyCoinSuccess');
    // const product = res.data.product;
    // yield put(CoinProductActions.coinProductRequest(product.id));
    yield put(BuyCoinActions.buyCoinSuccess());
    yield put(UcoinActions.coinSummaryRequest());
    yield put(CoinHoldingListActions.holdingListRequest());
    NavigationService.back();
    yield put(ToastActions.showToast(successMsg, 'success'));

}

export function* handleBuyCoinError(res) {
    const errorMsg = res.data.message;
    yield put(BuyCoinActions.buyCoinFailure(errorMsg));
    yield put(ToastActions.showToast(errorMsg));

}