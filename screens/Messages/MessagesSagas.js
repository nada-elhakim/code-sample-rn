import {call, put} from 'redux-saga/effects';
import MessagesActions from './MessagesRedux';

export function* getMessagesSaga(api, action) {
    try {
        const {
            refreshing,
            pagingParams
        } = action;
        if (!refreshing) {
            // yield put(LoadingIndicatorActions.showLoadingIndicator(true));
        }
        const res = yield call(api.messages, pagingParams);
        console.log('messages res', res);
        yield call(handleMessagesResponse, res, refreshing);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }

}

export function* handleMessagesResponse(res, refreshing) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        if (res.data.code === 200) {
            yield call(handleMessagesSuccess, res.data, refreshing);
        } else {
            yield call(handleMessagesError, res);
        }
    }

}

export function* handleMessagesSuccess(res, refreshing) {
    const messages = res.data;
    yield put(MessagesActions.messagesSuccess(messages, refreshing));
}

export function* handleMessagesError(res) {
    // TODO: handle news error
}

export function* markMessageReadSaga(api, action) {
    try {
        const {messageId} = action;
        const res = yield call(api.markMessageRead, messageId);
        console.log('mark message res', res);
        yield call(handleMarkMessageReadResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }
}

export function* handleMarkMessageReadResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        yield call(handleMarkMessageReadSuccess);
    } else {
        yield call(handleMarkMessageReadError, res);
    }
}

export function* handleMarkMessageReadSuccess() {
    yield put(MessagesActions.markMessageReadSuccess());
}

export function* handleMarkMessageReadError(res) {
    // TODO: handle news error
    const errorMsg = 'error'
    yield put(MessagesActions.markMessageReadError(errorMsg));
}


export function* deleteMessageSaga(api, action) {
    try {
        const {messageId} = action;
        const res = yield call(api.deleteMessage, messageId);
        console.log('deleteMessage res', res);
        yield call(handleDeleteMessageResponse, res);
    } catch (error) {
        // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    }
}

export function* handleDeleteMessageResponse(res) {
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        yield call(handleDeleteMessageSuccess);
    } else {
        yield call(handleDeleteMessageError, res);
    }
}

export function* handleDeleteMessageSuccess() {
    yield put(MessagesActions.deleteMessageSuccess());
}

export function* handleDeleteMessageError(res) {
    // TODO: handle news error
    const errorMsg = 'error'
    yield put(MessagesActions.deleteMessageError(errorMsg));
}