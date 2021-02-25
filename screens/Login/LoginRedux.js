import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    loginRequest: ['credentials', 'intent'],
    loginSuccess: null,
    loginFailure: ['error'],
    logoutRequest: null,
    logoutSuccess: null
});

export const LoginTypes = Types;
export default Creators;

export const INITIAL_STATE = {
    user: null,
    loading: null,
    error: null,
    token: null
};


export const LoginSelectors = {
    selectError: state => state.login.error,
    selectLoading: state => state.login.loading,
    selectUser: state => state.login.user
};


export const request = (state, action) => {
  return ({ ...state, loading: true, error: null})
};

export const success = (state, action) => {
    // const { user } = action;
    // console.log('login success', user);
    return ({ ...state, loading: false, error: null})
};

export const failure = (state, action) =>
    ({ ...state, loading: false, error: action.error , user: null});

export const logoutRequest = (state) => {
    return ({ ...state, loading: true })
};

export const logoutSuccess = (state) => {
    return ({ ...state, loading: false, user: null, error: null });
};

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN_REQUEST]: request,
    [Types.LOGIN_SUCCESS]: success,
    [Types.LOGIN_FAILURE]: failure,
    [Types.LOGOUT_REQUEST]: logoutRequest,
    [Types.LOGOUT_SUCCESS]: logoutSuccess,
});
