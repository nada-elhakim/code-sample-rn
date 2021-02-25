import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    profileRequest: ['fromStorage'],
    profileSuccess: ['profile'],
    profileFailure: ['error'],
    clearProfile: null,
    startProfilePoll: null,
    stopProfilePoll: null,
    getUser: null,
    userSuccess: ['user']
});

export const ProfileTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    profile: null,
    error: null,
    user: null
};

export const ProfileSelectors = {
    selectProfile: state => state.profile.profile,
    selectLoading: state => state.profile.loading,
    selectUser: state => state.profile.user
};

export const request = (state) => ({...state, loading: true});
export const success = (state, action) => ({...state, loading: false, profile: action.profile, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error});
export const clearProfile = (state, action) => ({...state, profile: null});
export const userSuccess = (state, action) => ({...state, user: action.user});
export const reducer = createReducer(INITIAL_STATE, {
    [Types.PROFILE_REQUEST]: request,
    [Types.PROFILE_SUCCESS]: success,
    [Types.PROFILE_FAILURE]: failure,
    [Types.CLEAR_PROFILE]: clearProfile,
    [Types.USER_SUCCESS]: userSuccess,
});