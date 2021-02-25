import { takeLatest, all, call, fork } from 'redux-saga/effects';

import API from '../services/Api';

import {LoginTypes} from '../screens/Login/LoginRedux';
import {loginSaga, logoutSaga} from '../screens/Login/LoginSaga';

import {ProfileTypes} from './common/Profile/ProfileRedux';
import {getProfileSaga, getUserSaga} from './common/Profile/ProfileSagas';

import {AuthStatusTypes} from './common/AuthStatus/AuthStatusRedux';
import {checkAuthStatusSaga} from './common/AuthStatus/AuthStatusSagas';

import {ResetPasswordTypes} from '../screens/ResetPassword/ResetPasswordRedux';
import {resetPasswordSaga} from '../screens/ResetPassword/ResetPasswordSagas';

import {RegisterTypes} from '../screens/Register/RegisterRedux';
import {registerSaga, checkUserExistenceSaga} from '../screens/Register/RegisterSagas';

import {KYCTypes} from '../screens/KYC/KYCRedux';
import {updateKYCSaga} from '../screens/KYC/KYCSagas';

import {TradePasswordTypes} from '../screens/TradePassword/TradePasswordRedux';
import {setTradePasswordSaga} from '../screens/TradePassword/TradePasswordSagas';

import {CaptchaTypes} from './common/Captcha/CaptchaRedux';
import {getCaptchaSaga, startCaptchaCountDownSaga, watchCountdownSaga} from './common/Captcha/CaptchaSagas';

import {EvaluateTypes} from './common/Evaluate/EvaluateRedux';
import {evaluateSaga} from './common/Evaluate/EvaluateSagas';

import {ToastTypes} from './common/Toast/ToastRedux';
import {showToastSaga} from './common/Toast/ToastSaga';

import {ArticlesTypes} from '../screens/Articles/ArticlesRedux';
import {getArticles, getBannerSaga} from '../screens/Articles/ArticlesSagas';

import {ArticleTypes} from '../screens/Article/ArticleRedux';
import {getArticle} from '../screens/Article/ArticleSagas';

import {UcoinTypes} from '../screens/Ucoin/redux/UcoinRedux';
import {getProductsSaga, getCoinSummarySaga} from '../screens/Ucoin/redux/UcoinSagas';

import {TransactionsTypes} from '../screens/Transactions/TransactionsRedux';
import {getTransactionsSaga} from '../screens/Transactions/TransactionsSagas';

import {WithdrawTypes} from '../screens/Withdraw/WithdrawRedux';
import {withdrawSaga} from '../screens/Withdraw/WithdrawSagas';

import {CurrencyTypes} from './common/Currency/CurrencyRedux';
import {getCurrenciesSaga, selectCurrencyAddressSaga} from './common/Currency/CurrencySagas';


import {LanguageTypes} from '../screens/Language/LanguageRedux';
import {changeLanguageSaga, getUserLanguageSaga} from '../screens/Language/LanguageSagas';

import {HomeTypes} from '../screens/Home/redux/HomeRedux';
import {loadHomeDataSaga} from '../screens/Home/redux/HomeSagas';

import {CatBannerTypes} from '../screens/Home/redux/CatBannerRedux';
import {getCatBannerSaga} from '../screens/Home/redux/CatBannerSagas';

import {StartupTypes} from './common/Startup/StartupRedux';
import {startupSaga, checkUpdateSaga} from './common/Startup/StartupSagas';

import {MessagesTypes} from '../screens/Messages/MessagesRedux';
import {getMessagesSaga, deleteMessageSaga, markMessageReadSaga} from '../screens/Messages/MessagesSagas';

import {TransferCoinTypes} from '../screens/Ucoin/redux/TransferCoinRedux';
import {transferCoinSaga} from '../screens/Ucoin/redux/TransferCoinSagas';

import {BuyCoinTypes} from '../screens/Ucoin/redux/BuyCoinRedux';
import {buyCoinSaga} from '../screens/Ucoin/redux/BuyCoinSagas';

import {UcoinTransactionsTypes} from '../screens/Ucoin/redux/UcoinTransactionsRedux';
import {getUcoinTransactionsSaga} from '../screens/Ucoin/redux/UcoinTransactionsSagas';

import {CoinProductTypes} from '../screens/Ucoin/IncomeProduct/CoinProductRedux';
import {getCoinProductSaga} from '../screens/Ucoin/IncomeProduct/CoinProductSagas';

import {CoinHoldingListTypes} from '../screens/Ucoin/CoinHoldingList/CoinHoldingListRedux';
import {getCoinHoldingListSaga} from '../screens/Ucoin/CoinHoldingList/CoinHoldingListSagas';


import {RewardSummaryTypes} from '../screens/uReturn/redux/RewardSummaryRedux';
import {getRewardSummarySaga} from '../screens/uReturn/redux/RewardSummarySagas';

import {RewardHoldingTypes} from '../screens/uReturn/redux/RewardHoldingRedux';
import {getHoldingSaga} from '../screens/uReturn/redux/RewardHoldingSagas';

import {RewardProductListTypes} from '../screens/uReturn/redux/RewardProductListRedux';
import {getRewardProductsSaga} from '../screens/uReturn/redux/RewardProductListSagas';

import {BuyRewardProductTypes} from '../screens/uReturn/redux/BuyRewardRedux';
import {buyRewardProductSaga} from '../screens/uReturn/redux/BuyRewardSagas';

import {WithdrawRewardTypes} from '../screens/uReturn/redux/WithdrawRewardRedux';
import {withdrawRewardSaga} from '../screens/uReturn/redux/WithdrawRewardSagas';

import {TransferTypes} from '../screens/TransferStation/TransferStationRedux';
import {transferSaga} from '../screens/TransferStation/TransferStationSaga';

const api = API.create();

export default function * root () {
    yield all([
        takeLatest(LanguageTypes.CHANGE_LANGUAGE, changeLanguageSaga, api),
        takeLatest(LanguageTypes.GET_USER_LANGUAGE, getUserLanguageSaga, api),

        takeLatest(StartupTypes.STARTUP, startupSaga, api),
        takeLatest(StartupTypes.CHECK_UPDATE_REQUEST, checkUpdateSaga, api),

        takeLatest(LoginTypes.LOGIN_REQUEST, loginSaga, api),
        takeLatest(LoginTypes.LOGOUT_REQUEST, logoutSaga, api),

        takeLatest(AuthStatusTypes.CHECK_AUTH_STATUS, checkAuthStatusSaga, api),

        takeLatest(ProfileTypes.PROFILE_REQUEST, getProfileSaga, api),
        takeLatest(ProfileTypes.GET_USER, getUserSaga),

        takeLatest(KYCTypes.KYC_REQUEST, updateKYCSaga, api),

        takeLatest(ResetPasswordTypes.RESET_PASSWORD_REQUEST, resetPasswordSaga, api),

        takeLatest(RegisterTypes.REGISTER_REQUEST, registerSaga, api),
        takeLatest(RegisterTypes.CHECK_USER_EXISTENCE, checkUserExistenceSaga, api),

        takeLatest(CaptchaTypes.CAPTCHA_REQUEST, getCaptchaSaga, api),

        takeLatest(TradePasswordTypes.TRADE_PASSWORD_REQUEST, setTradePasswordSaga, api),

        takeLatest(ArticlesTypes.ARTICLES_REQUEST, getArticles, api),
        takeLatest(ArticlesTypes.BANNER_REQUEST, getBannerSaga, api),
        takeLatest(ArticleTypes.ARTICLE_REQUEST, getArticle, api),

        takeLatest(UcoinTypes.PRODUCTS_REQUEST, getProductsSaga, api),
        takeLatest(UcoinTypes.COIN_SUMMARY_REQUEST, getCoinSummarySaga, api),
        takeLatest(UcoinTransactionsTypes.COIN_TRANSACTIONS_REQUEST, getUcoinTransactionsSaga, api),
        takeLatest(TransferCoinTypes.TRANSFER_COIN, transferCoinSaga, api),
        takeLatest(BuyCoinTypes.BUY_COIN, buyCoinSaga, api),
        takeLatest(CoinProductTypes.COIN_PRODUCT_REQUEST, getCoinProductSaga, api),
        takeLatest(CoinHoldingListTypes.HOLDING_LIST_REQUEST, getCoinHoldingListSaga, api),

        takeLatest(TransactionsTypes.TRANSACTIONS_REQUEST, getTransactionsSaga, api),

        takeLatest(WithdrawTypes.WITHDRAW_REQUEST, withdrawSaga, api),

        takeLatest(CurrencyTypes.CURRENCY_REQUEST, getCurrenciesSaga, api),
        takeLatest(CurrencyTypes.SELECT_CURRENCY_ADDRESS, selectCurrencyAddressSaga),

        takeLatest(MessagesTypes.MESSAGES_REQUEST, getMessagesSaga, api),
        takeLatest(MessagesTypes.DELETE_MESSAGE, deleteMessageSaga, api),
        takeLatest(MessagesTypes.MARK_MESSAGE_READ, markMessageReadSaga, api),

        takeLatest(RewardHoldingTypes.HOLDING_REQUEST, getHoldingSaga, api),
        takeLatest(RewardSummaryTypes.REWARD_SUMMARY_REQUEST, getRewardSummarySaga, api),
        takeLatest(RewardProductListTypes.REWARD_PRODUCT_LIST_REQUEST, getRewardProductsSaga, api),
        takeLatest(BuyRewardProductTypes.BUY_REWARD_PRODUCT, buyRewardProductSaga, api),
        takeLatest(WithdrawRewardTypes.WITHDRAW_REWARD, withdrawRewardSaga, api),

        takeLatest(TransferTypes.TRANSFER_REQUEST, transferSaga, api),


        takeLatest(EvaluateTypes.EVALUATE_REQUEST, evaluateSaga, api),

        takeLatest(ToastTypes.SHOW_TOAST, showToastSaga),

        takeLatest(CatBannerTypes.CAT_BANNER_REQUEST, getCatBannerSaga, api),
        takeLatest(HomeTypes.LOAD_HOME_DATA, loadHomeDataSaga),
    ]);
};