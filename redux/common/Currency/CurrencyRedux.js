import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    currencyRequest: null,
    currencySuccess: ['currencies'],
    currencyFailure: ['error'],
    selectCurrencyAddress: ['currency'],
    selectCurrencyAddressSuccess: ['currency', 'address']
});

export const CurrencyTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    currencies: null,
    error: null,
    address: null,
    qrCode: null,
    selectedCurrency: null
};

export const CurrencySelectors = {
    selectCurrencies: state => state.currency.currencies,
    selectFilteredCurrencies: (state, filter) => {
        if (state.currency.currencies) {
           const currencies = [...state.currency.currencies];
           return currencies.filter(currency => currency[filter] === 1)
        }
    },
    selectedAddress: state => state.currency.address,
    selectedQrCode: state => state.currency.qrCode,
    selectSelectedCurrency: state => state.currency.selectedCurrency
};

export const request = (state) => ({...state, loading: true})
export const success = (state, action) => ({...state, loading: false, currencies: action.currencies, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error, refreshing: false });
export const selectCurrencyAddressSuccess = (state, action) => ({
    ...state,
    address: action.address,
    selectedCurrency: action.currency
});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CURRENCY_REQUEST]: request,
    [Types.CURRENCY_SUCCESS]: success,
    [Types.CURRENCY_FAILURE]: failure,
    [Types.SELECT_CURRENCY_ADDRESS_SUCCESS]: selectCurrencyAddressSuccess,
});
