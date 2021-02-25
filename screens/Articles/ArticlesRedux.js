import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    articlesRequest: ['refreshing'],
    articlesSuccess: ['articles'],
    articlesFailure: ['error'],
    bannerRequest: null,
    bannerSuccess: ['banners'],
    bannerFailure: ['error']
});

export const ArticlesTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    articles: null,
    banners: null,
    error: null,
    refreshing: false
};

export const ArticlesSelectors = {
    selectArticles: state => state.articles.articles,
    selectRefreshStatus: state => state.articles.refreshing,
    selectBanners: state => state.articles.banners
};

export const request = (state, action) => {
    const {refreshing} = action;
    return {...state, loading: true, refreshing: !!refreshing};
};
export const success = (state, action) => ({...state, loading: false, articles: action.articles, error: false, refreshing: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error, refreshing: false });

export const bannerSuccess = (state, action) => ({...state, loading: false, banners: action.banners});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ARTICLES_REQUEST]: request,
    [Types.ARTICLES_SUCCESS]: success,
    [Types.ARTICLES_FAILURE]: failure,
    [Types.BANNER_SUCCESS]: bannerSuccess
});