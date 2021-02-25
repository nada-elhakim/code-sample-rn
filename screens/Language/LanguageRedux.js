import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
    changeLanguage: ['language'],
    changeLanguageSuccess: ['language'],
    changeLanguageFailure: ['error'],
    getUserLanguage: null,
    getUserLanguageSuccess: ['language'],
});

export const LanguageTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    language: null,
    error: null
};

export const LanguageSelectors = {
    selectLanguage: state => state.language.language
};

export const request = (state) => ({...state, loading: true, error: null });
export const success = (state, action) => ({...state, loading: false, language: action.language, error: null });
export const failure = (state, action) => ({...state, loading: false, language: null, error: action.error });

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_LANGUAGE]: request,
    [Types.CHANGE_LANGUAGE_SUCCESS]: success,
    [Types.CHANGE_LANGUAGE_FAILURE]: failure,
    [Types.GET_USER_LANGUAGE]: request,
    [Types.GET_USER_LANGUAGE_SUCCESS]: success
});