import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    resetPasswordRequest: ['passwordParams'],
    resetPasswordSuccess: null,
    resetPasswordFailure: ['error']
});

export const ResetPasswordTypes = Types;
export default Creators;

export const INITIAL_STATE = {
    loading: null,
    error: null,
};

export const ResetPasswordSelectors = {
    selectLoading: state => state.resetPassword.loading
};


export const request = (state, action) => {
    return ({ ...state, loading: true, error: null })
};

export const success = (state, action) => {
    return ({ ...state, loading: false})
};

export const failure = (state, action) =>
    ({ ...state, loading: false, error: action.error});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.RESET_PASSWORD_REQUEST]: request,
    [Types.RESET_PASSWORD_SUCCESS]: success,
    [Types.RESET_PASSWORD_FAILURE]: failure
});
