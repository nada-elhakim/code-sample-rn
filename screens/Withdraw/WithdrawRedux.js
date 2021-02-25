import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    withdrawRequest: ['withdrawParams'],
    withdrawSuccess: null,
    withdrawFailure: ['error']
});

export const WithdrawTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    error: null
};

export const WithdrawSelectors = {
    selectLoading: state => state.withdraw.loading
};

export const request = state => ({...state, loading: true});
export const success = (state, action) => ({...state, loading: false, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.WITHDRAW_REQUEST]: request,
    [Types.WITHDRAW_SUCCESS]: success,
    [Types.WITHDRAW_FAILURE]: failure,
});