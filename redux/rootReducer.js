import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    articles: require('../screens/Articles/ArticlesRedux').reducer,
    login: require('../screens/Login/LoginRedux').reducer,
    register: require('../screens/Register/RegisterRedux').reducer,
    article: require('../screens/Article/ArticleRedux').reducer,
    profile: require('./common/Profile/ProfileRedux').reducer,
    authStatus: require('./common/AuthStatus/AuthStatusRedux').reducer,
    currency: require('./common/Currency/CurrencyRedux').reducer,
    ucoin: require('../screens/Ucoin/redux/UcoinRedux').reducer,
    transactions: require('../screens/Transactions/TransactionsRedux').reducer,
    language: require('../screens/Language/LanguageRedux').reducer,
    app: require('./common/Startup/StartupRedux').reducer,
    withdraw: require('../screens/Withdraw/WithdrawRedux').reducer,
    messages: require('../screens/Messages/MessagesRedux').reducer,
    home: require('../screens/Home/redux/HomeRedux').reducer,
    catBanner: require('../screens/Home/redux/CatBannerRedux').reducer,
    kyc: require('../screens/KYC/KYCRedux').reducer,
    resetPassword: require('../screens/ResetPassword/ResetPasswordRedux').reducer,
    captcha: require('./common/Captcha/CaptchaRedux').reducer,
    uCoinTransfer: require('../screens/Ucoin/redux/TransferCoinRedux').reducer,
    uCoinTransactions: require('../screens/Ucoin/redux/UcoinTransactionsRedux').reducer,
    uCoinBuy: require('../screens/Ucoin/redux/BuyCoinRedux').reducer,
    coinProduct: require('../screens/Ucoin/IncomeProduct/CoinProductRedux').reducer,
    rewardHolding: require('../screens/uReturn/redux/RewardHoldingRedux').reducer,
    rewardProducts: require('../screens/uReturn/redux/RewardProductListRedux').reducer,
    rewardPurchase: require('../screens/uReturn/redux/BuyRewardRedux').reducer,
    rewardWithdraw: require('../screens/uReturn/redux/WithdrawRewardRedux').reducer,
    rewardSummary: require('../screens/uReturn/redux/RewardSummaryRedux').reducer,
    evaluate: require('./common/Evaluate/EvaluateRedux').reducer,
    coinHolding: require('../screens/Ucoin/CoinHoldingList/CoinHoldingListRedux').reducer,
    transferStation: require('../screens/TransferStation/TransferStationRedux').reducer,

});

export default rootReducer;