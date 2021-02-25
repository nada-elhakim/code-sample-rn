import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    captchaRequest: ['phone', 'intent'],
    captchaSuccess: ['captcha'],
    captchaFailure: ['error'],
    getCounter: ['counter'],
    startCaptchaCounter: null,
    resetCaptchaCounter: null
});

export const CaptchaTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    captcha: null,
    error: null,
    counter: 0

};

export const CaptchaSelectors = {
    selectCaptcha: state => state.captcha.captcha,
    selectCounter: state => state.captcha.counter,
};

export const request = (state) => {
    return {...state, loading: true};
};
export const success = (state, action) => ({...state, loading: false, captcha: action.captcha, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error });
export const getCounter = (state, action) => ({ ...state, counter: action.counter});
export const resetCounter = (state) => ({ ...state, counter: 0});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CAPTCHA_REQUEST]: request,
    [Types.CAPTCHA_SUCCESS]: success,
    [Types.CAPTCHA_FAILURE]: failure,
    [Types.GET_COUNTER]: getCounter,
    [Types.RESET_CAPTCHA_COUNTER]: resetCounter

});