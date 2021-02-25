import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    tradePasswordRequest: ['trade_password', 'old_trade_password', 'captcha'],
    tradePasswordSuccess: null,
    tradePasswordFailure: ['error']
});

export const TradePasswordTypes = Types;
export default Creators;

export const INITIAL_STATE = {
    loading: null,
    error: null,
};

export const TradePasswordSelectors = {
}


export const request = (state, action) => {
    return ({ ...state, loading: true, error: null })
}

export const success = (state, action) => {
    return ({ ...state, loading: false})
}

export const failure = (state, action) =>
    ({ ...state, loading: false, error: action.error});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.TRADE_PASSWORD_REQUEST]: request,
    [Types.TRADE_PASSWORD_SUCCESS]: success,
    [Types.TRADE_PASSWORD_FAILURE]: failure
});
