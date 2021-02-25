import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators } = createActions({
    startup: null,
    startupSuccess: null,
    checkUpdateRequest: null,
    checkUpdateSuccess: null,
    checkUpdateFailure: ['error']
});

export const StartupTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null
};

export const StartupSelectors = {
    selectLoading: state => state.app.loading
};

export const startup = (state, action) => {
    return { ...state, loading: true};
};

export const startupSuccess = (state, action) => {
    return { ...state, loading: false};
};

export const reducer = createReducer(INITIAL_STATE, {
    [Types.STARTUP]: startup,
    [Types.STARTUP_SUCCESS]: startupSuccess,
});
