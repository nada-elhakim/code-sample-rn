import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    kycRequest: ['userInfo'],
    kycSuccess: null,
    kycFailure: ['error']
});

export const KYCTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    error: null
};

export const KYCSelectors = {
    selectLoading: state => state.kyc.loading
};

export const request = (state) => ({...state, loading: true});
export const success = (state, action) => ({...state, loading: false, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.KYC_REQUEST]: request,
    [Types.KYC_SUCCESS]: success,
    [Types.KYC_FAILURE]: failure,
});