import {call, put, select} from 'redux-saga/effects';
import CurrencyActions from './CurrencyRedux';

export function* getCurrenciesSaga(api, action) {
    try {
        const res = yield call(api.currencies);
        console.log('currencies res', res);
        yield call(handleCurrenciesResponse, res);
    } catch (error) {
    }

}

export function* handleCurrenciesResponse(res) {
    if (res.status === 200) {
        yield call(handleCurrenciesSuccess, res.data);
    } else {
        yield call(handleCurrenciesError, res);
    }
}

export function* handleCurrenciesSuccess(res) {
    const currencies = res.data;
    yield put(CurrencyActions.currencySuccess(currencies));
}

export function* handleCurrenciesError(res) {
}

export function* selectCurrencyAddressSaga(action) {
    const {currency} = action;
    const profile = yield select(state => state.profile.profile);
    if (currency && profile) {
        const address = currency.id === 1 ? profile.wallet_address : profile.eth_wallet_address;
        console.log('address', address);
        yield put(CurrencyActions.selectCurrencyAddressSuccess(currency, address))
    }
}
