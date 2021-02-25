import {createStackNavigator} from "react-navigation";
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import TradePassword from "../screens/TradePassword/TradePassword";
import ConfirmTradePassword from "../screens/ConfirmTradePassword/ConfirmTradePassword";

const AuthNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    ResetPassword: {
       screen: ResetPassword
    },
    TradePassword: {
        screen: TradePassword
    },
    ConfirmTradePassword: {
        screen: ConfirmTradePassword
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
});

export default AuthNavigator;