import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    transferRequest: ['transferParams'],
    transferSuccess: null,
    transferFailure: ['error']
});

export const TransferTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    error: null
};

export const TransferSelectors = {
    selectLoading: state => state.transferStation.loading
};

export const request = state => ({...state, loading: true});
export const success = (state, action) => ({...state, loading: false, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.TRANSFER_REQUEST]: request,
    [Types.TRANSFER_SUCCESS]: success,
    [Types.TRANSFER_FAILURE]: failure,
});