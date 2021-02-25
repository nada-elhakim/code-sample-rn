import {call, put} from 'redux-saga/effects';
import EvaluateActions from './EvaluateRedux';

export function* evaluateSaga(api, action) {
    try {
        const res = yield call(api.evaluate);
        yield call(handleEvaluateResponse, res);
    } catch (error) {
    }
}

export function* handleEvaluateResponse(res) {
    if (res.status === 200) {
        yield call(handleEvaluateSuccess, res.data);
    } else {
        yield call(handleEvaluateError, res);
    }
}

export function* handleEvaluateSuccess(res) {
    const evaluate = res.data;
    yield put(EvaluateActions.evaluateSuccess(evaluate));
}

export function* handleEvaluateError(res) {
    const errorMsg = res.data.message;
    yield put(EvaluateActions.evaluateFailure(errorMsg));
}
