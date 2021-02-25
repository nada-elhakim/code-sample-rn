import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    checkAuthStatus: null
});

export const AuthStatusTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    error: null
};

export const request = (state) => ({...state, loading: true});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHECK_AUTH_STATUS]: request
});