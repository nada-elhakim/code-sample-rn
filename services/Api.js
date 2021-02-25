import apisauce from 'apisauce';
import config from '../config/AppConfig';

const url = config.api.baseUrl;

const create  =  (baseURL = url) => {
    const api = apisauce.create({
        baseURL,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'version': '1.0.0',
        },
        timeout: 30000
    });

    const getRoot = () => api.get('');

    // Sessions api
    const login = (credentials) => api.post('sessions/login', credentials);
    const logout = () => api.delete('sessions/login');
    const register = (user) => api.post('sessions/register', user);
    const checkUserExists = (phone) => api.get('sessions/check', {phone});
    const captcha = (phone, intent) => api.get('sessions/captcha', {phone, intent});
    const resetPassword = (passwordParams) => api.post('sessions/reset_password', passwordParams);
    const editPassword = (passwordParams) => api.post('sessions/edit_password', passwordParams);
    const transfer = (transferParams) => api.post('sessions/transfer', transferParams);
    const profile = () => api.get('sessions/profile');
    const setTradePassword =
        (trade_password) =>
            api.post('sessions/set_trade_password', {trade_password});
    const editTradePassword = (params) =>
        api.post('sessions/edit_trade_password', params);
    const evaluate = () => api.get(`sessions/evaluate`);
    const updateKYC = (userInfo) => api.post(`sessions/update_kyc`, userInfo);


    // Articles api
    const articles = () => api.get('articles');
    const article = (articleId) => api.get(`articles/${articleId}`);
    const banners = () => api.get('banners');

    // Home api
    const currencies = () => api.get('currencies');
    const products = () => api.get('products');
    const transactions = (pagingParams) => api.get('transactions', pagingParams);
    const withdraw = (withdrawParams) => api.post('transactions', withdrawParams);
    const catBanners = () => api.get('cate/price_banners/items');

    // Messages api
    const messages = (pagingParams) => api.get('messages', pagingParams);
    const markMessageRead = (messageId) => api.post(`messages/${messageId}/read`);
    const deleteMessage = (messageId) => api.delete(`messages/${messageId}`);


    // Coin api
    const coinProductSummary = () => api.get(`coin_products/summary`);
    const coinProductList = (params) => api.get(`coin_products/products`, params);
    const coinProduct = (productId) => api.get(`coin_products/products/${productId}`);
    const coinHoldingList = (params) => api.get(`coin_products/holdings`, params);
    const coinProductProfitKline = (productId, days) => api.get(`coin_products/products/${productId}/kline`, {days});
    const buyCoinProduct = (productId, params) => api.post(`coin_products/products/${productId}/buy`, params);
    const depositCoinFromUseBalance = (amount) => api.post(`coin_products/deposit`, {amount});
    const withdrawCoinToUseBalance = (amount) => api.post(`coin_products/withdraw`, {amount});
    const redeemCoinProduct = (productId) => api.post(`coin_products/holdings/${productId}/redeem`);
    const coinProductTransactionList = (params) => api.get(`coin_products/transactions`, params);

    // Reward api
    const rewardProductSummary = () => api.get(`reward_products/summary`);
    const rewardProductList = (params) => api.get(`reward_products/products`, params);
    const rewardProductHoldings = (params) => api.get(`reward_products/holdings`, params);
    const buyRewardProduct =
        (productId, amount, trade_password) => api.post(`reward_products/products/${productId}/buy`, {amount, trade_password});
    const rewardProductTransactionList = (params) => api.get(`reward_products/transactions`, params);
    const withdrawRewardToUseBalance = (amount) => api.post(`reward_products/withdraw`, {amount});
    const withdrawRewardToCoin = (amount) => api.post(`reward_products/withdraw2coin`, {amount});

    // Check update
    const checkUpdate = (params) => api.post('check_update', params);

    return {
        instance: api,
        login,
        logout,
        checkUserExists,
        register,
        captcha,
        resetPassword,
        editPassword,
        transfer,
        profile,
        articles,
        article,
        banners,
        catBanners,
        setTradePassword,
        editTradePassword,
        evaluate,
        updateKYC,
        currencies,
        products,
        transactions,
        withdraw,
        messages,
        markMessageRead,
        deleteMessage,
        rewardProductList,
        rewardProductHoldings,
        buyRewardProduct,
        rewardProductTransactionList,
        rewardProductSummary,
        withdrawRewardToUseBalance,
        withdrawRewardToCoin,
        coinProductList,
        coinHoldingList,
        coinProductProfitKline,
        coinProduct,
        buyCoinProduct,
        depositCoinFromUseBalance,
        withdrawCoinToUseBalance,
        redeemCoinProduct,
        coinProductTransactionList,
        coinProductSummary,
        checkUpdate
    };
};

const apiNotRequiringToken = [

];

export const addTokenToRequestHeaders = (api, token) => {
    api.instance.addRequestTransform(request => {
        request.headers['Authorization'] = `Bearer UC ${token}`;
    });
};

export const addLanguageToRequestHeaders = (api, languageCode) => {
    api.instance.addRequestTransform(request => {
        request.headers['X-LANG'] = languageCode;
    });
};

export default {
    create
};


