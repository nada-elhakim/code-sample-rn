import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
    registerRequest: ['user'],
    registerSuccess: null,
    registerFailure: ['error'],
    checkUserExistence: ['phone'],
    userExists: ['userExists']
});

export const RegisterTypes = Types;
export default Creators;

export const INITIAL_STATE = {
    loading: null,
    error: null
};

export const RegisterSelectors = {
    selectLoading: state => state.register.loading,
    selectError: state => state.register.error
};

export const request = (state) => {
    return { ...state, loading: true, error: null };
};

export const success = (state) => {
    return { ...state, loading: false, error: null };
};

export const failure = (state, action) => {
    return { ...state, loading: false, error: action.error };
};

export const reducer = createReducer(INITIAL_STATE, {
    [Types.REGISTER_REQUEST]: request,
    [Types.REGISTER_SUCCESS]: success,
    [Types.REGISTER_FAILURE]: failure
});