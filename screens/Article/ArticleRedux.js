import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    articleRequest: ['articleSummary', 'refreshing'],
    articleSuccess: ['article'],
    articleFailure: ['error']
});

export const ArticleTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    article: null,
    error: null,
    refreshing: false
};

export const ArticleSelectors = {
    selectArticle: state => {
        return state.article && state.article.article
    },
    selectRefreshStatus: state => state.article.refreshing
};

export const request = (state, action) => {
    const {refreshing} = action;
    return {...state, loading: true, refreshing: !!refreshing};
};
export const success = (state, action) => ({...state, loading: false, article: action.article, error: false, refreshing: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error, refreshing: false });

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ARTICLE_REQUEST]: request,
    [Types.ARTICLE_SUCCESS]: success,
    [Types.ARTICLE_FAILURE]: failure,
});