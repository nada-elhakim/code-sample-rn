import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    rewardSummaryRequest: null,
    rewardSummarySuccess: ['summary'],
    rewardSummaryFailure: ['error']
});

export const RewardSummaryTypes = Types;
export default Creators;

const INITIAL_STATE = {
    loading: null,
    error: null,
    summary: null
};

export const RewardSummarySelectors = {
    selectSummary: state => state.rewardSummary.summary
};

export const request = (state) => ({...state, loading: true});
export const success = (state, action) => {
    const {summary} = action;
    return {
        ...state,
        loading: false,
        summary,
        error: false
    };
};
export const failure = (state, action) => ({...state, loading: false, error: action.error});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.REWARD_SUMMARY_REQUEST]: request,
    [Types.REWARD_SUMMARY_SUCCESS]: success,
    [Types.REWARD_SUMMARY_FAILURE]: failure
});