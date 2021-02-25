import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    evaluateRequest: null,
    evaluateSuccess: ['evaluate'],
    evaluateFailure: ['error']
});

export const EvaluateTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    evaluate: null,
    error: null
};

export const EvaluateSelectors = {
    selectEvaluate: state => state.evaluate.evaluate,
    selectRewardBalance: state => {
        if (state.evaluate.evaluate) {
            const results = state.evaluate.evaluate.results;
            const filtered = results.filter(result => result.type === 'reward_balance');
            return filtered[0].value;
        }
    },
    selectLoading: state => state.evaluate.loading,
};

export const request = (state) => ({...state, loading: true});
export const success = (state, action) => ({...state, loading: false, evaluate: action.evaluate, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.EVALUATE_REQUEST]: request,
    [Types.EVALUATE_SUCCESS]: success,
    [Types.EVALUATE_FAILURE]: failure,
});
