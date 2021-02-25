import rootReducer from './rootReducer';
import configureStore from './CreateStore';
import rootSaga from './rootSaga';
export default () => {
    return configureStore(rootReducer, rootSaga);
}