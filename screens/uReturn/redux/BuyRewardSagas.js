import {call, put} from 'redux-saga/effects';
import BuyRewardProductActions from './BuyRewardRedux';
import ToastActions from '../../../redux/common/Toast/ToastRedux';
import i18n from '../../../i18n/i18n.config';
import ProfileActions from '../../../redux/common/Profile/ProfileRedux';
import NavigationService from "../../../navigation/NavigationService";
import {reset} from 'redux-form';

export function* buyRewardProductSaga(api, action) {
    try {
        const {productId, amount, trade_password} = action;

        console.log(productId, amount);
        const res = yield call(api.buyRewardProduct, productId, amount, trade_password);

        console.log('reward buy res', res);
        yield call(handleRewardProductResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleRewardProductResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleRewardProductSuccess, res.data);
        } else {
            yield call(handleRewardProductError, res);
        }
    } else {
        yield call(handleRewardProductError, res);
    }
}

export function* handleRewardProductSuccess(res) {
    // const transactions = res.data;
    // console.log('coin transfer res', transactions);
    const successMsg = i18n.t('dashboard:uReturn.buyCoinSuccess');
    yield put(BuyRewardProductActions.buyRewardProductSuccess());
    yield put(ProfileActions.profileRequest());
    yield put(reset('tradePasswordModalForm'));
    yield put(ToastActions.showToast(successMsg, 'success'));
    NavigationService.pop(2);

}

export function* handleRewardProductError(res) {
    const errorMsg = res.data.message;
    yield put(BuyRewardProductActions.buyRewardProductFailure(errorMsg));
    yield put(ToastActions.showToast(errorMsg));

}