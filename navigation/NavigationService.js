import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

function push(routeName, params) {
    _navigator.dispatch(
        StackActions.push({
            routeName,
            params,
        })
    );
}

function back(key = null) {
    _navigator.dispatch(
        NavigationActions.back({key})
    );
}

function pop(n) {
    _navigator.dispatch(
        StackActions.pop({n})
    )
}

export default {
    navigate,
    back,
    push,
    pop,
    setTopLevelNavigator,
};

