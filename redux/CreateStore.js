import { createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {pollProfileSagaWatcher} from "./common/Profile/ProfileSagas";
import {watchCountdownSaga} from "./common/Captcha/CaptchaSagas";


export default (rootReducer, rootSaga) => {


    /* ------------- Redux Configuration ------------- */
    const middleware = [];
    const enhancers = [];


    /* ------------- Saga Middleware ------------- */
    const sagaMiddleware = createSagaMiddleware({});
    middleware.push(sagaMiddleware);

    // const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore;

    /* ------------- Assemble Middleware ------------- */
    enhancers.push(applyMiddleware(...middleware));

    /*-------------- Redux Persist ---------------*/

    const store = createStore(rootReducer, compose(...enhancers));
    // kick off root saga
    let sagasManager = sagaMiddleware.run(rootSaga);
    sagaMiddleware.run(pollProfileSagaWatcher);
    sagaMiddleware.run(watchCountdownSaga);

    return {
        store,
        sagasManager,
        sagaMiddleware
    };
}