import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    catBannerRequest: null,
    catBannerSuccess: ['banners'],
    catBannerFailure: ['error']
});

export const CatBannerTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    banners: null,
    error: null,
};

export const CatBannerSelectors = {
    selectBanners: state => state.catBanner.banners
};

export const request = (state, action) => {
    return {...state, loading: true};
};
export const success = (state, action) => ({...state, loading: false, banners: action.banners, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CAT_BANNER_REQUEST]: request,
    [Types.CAT_BANNER_SUCCESS]: success,
    [Types.CAT_BANNER_FAILURE]: failure,
});