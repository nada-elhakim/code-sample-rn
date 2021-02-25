import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    loadHomeData: ['refreshing'],
    loadHomeDataSuccess: null,
    loadHomeDataFailure: ['error'],
});

export const HomeTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    error: null,
    refreshing: false
};

export const HomeSelectors = {
    selectCurrencies: state => state.currency.currencies,
    selectRefreshStatus: state => state.home.refreshing
};

export const loadData = (state, action) => {
    const {refreshing} = action;
    return {...state, loading: true, refreshing: !!refreshing};
};
export const loadDataSuccess = (state, action) => ({...state, loading: false, error: false, refreshing: false});
export const loadDataFailure = (state, action) => ({...state, loading: false, error: action.error, refreshing: false });

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_HOME_DATA]: loadData,
    [Types.LOAD_HOME_DATA_SUCCESS]: loadDataSuccess,
    [Types.LOAD_HOME_DATA_FAILURE]: loadDataFailure,
});