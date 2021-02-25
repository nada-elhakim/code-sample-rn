import React from 'react';
import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon/TabBarIcon';
import Home from '../screens/Home/Home';
import Assets from '../screens/Assets/Assets';
import Articles from '../screens/Articles/Articles';
import Article from '../screens/Article/Article';
import Settings from '../screens/Settings/Settings';
import Transactions from '../screens/Transactions/Transactions';
import Ucoin from '../screens/Ucoin/Ucoin';
import IncomeProduct from '../screens/Ucoin/IncomeProduct/IncomeProduct';
import Recharge from '../screens/Recharge/Recharge';
import Withdraw from '../screens/Withdraw/Withdraw';
import Security from '../screens/Security/Security';
import TradePassword from "../screens/TradePassword/TradePassword";
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import KYC from '../screens/KYC/KYC';
import ConfirmTradePassword from "../screens/ConfirmTradePassword/ConfirmTradePassword";

import AppLogo from "../components/AppLogo/AppLogo";
import HeaderNotificationButton from "../components/HeaderNotificationButton/HeaderNotificationButton";
import TabScreenHeaderStyles from "./TabScreenHeaderStyles";
import Language from "../screens/Language/Language";
import Messages from "../screens/Messages/Messages";
import UcoinTransactions from "../screens/Ucoin/UcoinTransactions/UcoinTransactions";
import uReturn from "../screens/uReturn/uReturn";
import RewardProductListScreen from "../screens/uReturn/RewardProductListScreen";
import ConfirmPurchaseScreen from "../screens/uReturn/ConfirmPurchaseScreen";
import PromotionCenter from "../screens/PromotionCenter/PromotionCenter";
import TransferStation from "../screens/TransferStation/TransferStation";
import JoinCommunity from "../screens/JoinCommunity/JoinCommunity";

import i18n from '../i18n/i18n.config';
import H5 from "../screens/H5/H5";
import Banner from "../screens/Banner/Banner";
import GameCenter from "../screens/GameCenter/GameCenter";
import {Image} from "react-native";
import Images from "../theme/variables/Images";


const isTabBarVisible = (navigation) => {
    const {index, routes} = navigation.state;
    const {routeName} = routes[index];
    const availableRoutes = ['Home', 'Articles', 'Assets', 'PromotionCenter', 'GameCenter'];
    return availableRoutes.indexOf(routeName) > -1;
};

const PromotionStack = createStackNavigator({
    PromotionCenter: {
        screen: PromotionCenter,
        navigationOptions: {
            headerLeft: (<AppLogo orientation="horizontal" />),
            headerRight: (<HeaderNotificationButton />),
            ...TabScreenHeaderStyles
        }
    },
    Messages: Messages,
});


PromotionStack.navigationOptions = ({navigation}) => {
    return {
        tabBarLabel: i18n.t('dashboard:navigationTabs.promotion'),
        tabBarIcon: ({ focused }) => (
            <TabBarIcon
                focused={focused}
                name="icon-promotion"
            />
        ),
        tabBarVisible: isTabBarVisible(navigation)
    }
};

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerLeft: (<AppLogo orientation="horizontal" />),
            headerRight: (<HeaderNotificationButton />),
            ...TabScreenHeaderStyles
        }
    },
    Withdraw: Withdraw,
    Recharge: Recharge,
    Messages: Messages,
    TransferStation: TransferStation,
    H5: H5,
    Ucoin: Ucoin,
    Banner: Banner
});

HomeStack.navigationOptions = ({navigation}) => {
    return {
        tabBarLabel: i18n.t('dashboard:navigationTabs.home'),
        tabBarIcon: ({ focused }) => (
            <TabBarIcon
                focused={focused}
                name="icon-home"
            />
        ),
        tabBarVisible: isTabBarVisible(navigation)
    }
};


const AssetStack = createStackNavigator({
    Assets: {
        screen: Assets,
        navigationOptions: {
            headerLeft: (<AppLogo orientation="horizontal" />),
            ...TabScreenHeaderStyles
        }
    },
    Settings: Settings,
    Transactions: Transactions,
    UcoinTransactions: UcoinTransactions,
    Ucoin: Ucoin,
    uReturn: uReturn,
    RewardProductList: RewardProductListScreen,
    IncomeProduct: IncomeProduct,
    Recharge: Recharge,
    Withdraw: Withdraw,
    Security: Security,
    TradePassword: TradePassword,
    ConfirmTradePassword: ConfirmTradePassword,
    ResetPassword: ResetPassword,
    KYC: KYC,
    Language: Language,
    ConfirmPurchaseScreen: ConfirmPurchaseScreen,
    PromotionCenter: PromotionCenter,
    JoinCommunity: JoinCommunity
});

AssetStack.navigationOptions = ({navigation}) => {
    return {
        tabBarLabel: i18n.t('dashboard:navigationTabs.assets'),
        tabBarIcon: ({ focused }) => (
            <TabBarIcon
                focused={focused}
                name="icon-assets"
            />
        ),
        tabBarVisible: isTabBarVisible(navigation)
    }

};

const ArticleStack = createStackNavigator({
    Articles: {
        screen: Articles,
        navigationOptions: {
            headerLeft: (<AppLogo orientation="horizontal" />),
            headerRight: (<HeaderNotificationButton />),
            ...TabScreenHeaderStyles
        }
    },
    Article: Article,
    Messages: Messages,
    Banner: Banner
});

ArticleStack.navigationOptions = ({navigation}) => {
    return {
        tabBarLabel: i18n.t('dashboard:navigationTabs.articles'),
        tabBarIcon: ({ focused }) => (
            <TabBarIcon
                focused={focused}
                name="icon-finder"
            />
        ),
        tabBarVisible: isTabBarVisible(navigation)
    }
};

const GameCenterStack = createStackNavigator({
    GameCenter: {
        screen: GameCenter,
        navigationOptions: {
            headerLeft: (<AppLogo orientation="horizontal" />),
            headerRight: (<HeaderNotificationButton />),
            ...TabScreenHeaderStyles
        }
    }
});

GameCenterStack.navigationOptions = ({navigation}) => {
    return {
        tabBarLabel: i18n.t('dashboard:navigationTabs.gameCenter'),
        tabBarIcon: ({ focused }) => (
            <Image
                style={{
                    width: 26,
                    height: 26,
                    top: 2
                }}
                source={focused ? Images.gameCenterTabIconActive : Images.gameCenterTabIcon}/>
        ),
        tabBarVisible: isTabBarVisible(navigation)
    }
};


const TabNavigator = createBottomTabNavigator({
    HomeStack,
    ArticleStack,
    GameCenterStack,
    PromotionStack,
    AssetStack,
});

TabNavigator.navigationOptions = ({navigation}) => {
    return {
        headerTitle: 'tab header',
        headerMode: 'auto',
        tabBarVisible: false
    }
};

export default TabNavigator;
