import {call, put, take, race, cancelled} from 'redux-saga/effects';
import CaptchaActions, {CaptchaTypes} from './CaptchaRedux';
import {eventChannel, END} from 'redux-saga';
import ToastActions from '../Toast/ToastRedux';
import config from "../../../config/AppConfig";

export function* getCaptchaSaga(api, action) {
    try {
        const {phone, intent = 'login'} = action;
        yield put(CaptchaActions.startCaptchaCounter());
        const res = yield call(api.captcha, phone, intent);
        console.log('captcha res', res);
        yield call(handleCaptchaResponse, res);
    } catch (error) {
    }

}

export function* handleCaptchaResponse(res) {
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleCaptchaSuccess, res.data);
        } else {
            yield call(handleCaptchaError, res);
        }
    } else {

    }
}

export function* handleCaptchaSuccess(res) {
    const {captcha} = res.data;
    yield put(CaptchaActions.captchaSuccess(captcha));
    yield put(ToastActions.showToast(`Your captcha is ${captcha}`, 'success', 300000));
}

export function* handleCaptchaError(res) {
    const errorMsg = res.data.message;
    yield put(ToastActions.showToast(errorMsg));
}

export function* watchCountdownSaga() {
    try {
        while (true) {
            yield take(CaptchaTypes.START_CAPTCHA_COUNTER);
            yield race({
                task: call(startCaptchaCountDownSaga),
                cancel:take(CaptchaTypes.RESET_CAPTCHA_COUNTER)
            });
        }
    } finally {
        console.log('watchIncrementAsync terminated')
    }
}

export function* startCaptchaCountDownSaga() {
    const chan = yield call(countdown, config.api.captchaCountDown);
    try {
        while (true) {
            let seconds = yield take(chan);
            if (!(yield cancelled())) {
                yield put(CaptchaActions.getCounter(seconds));
            } else {
                yield take(END);
            }
        }
    } finally {
        chan.close();
    }
}

export function countdown(secs) {
    return eventChannel(emitter => {
        const iv = setInterval(() => {
            secs -= 1
            if (secs >= 0) {
                emitter(secs)
            } else {
                emitter(END)
            }
        }, 1000);
        return () => {
            clearInterval(iv)
        }
    })
}
