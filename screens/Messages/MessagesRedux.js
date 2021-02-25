import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    messagesRequest: ['pagingParams', 'refreshing'],
    messagesSuccess: ['messages', 'refreshing'],
    messagesFailure: ['error'],
    deleteMessage: ['messageId'],
    deleteMessageSuccess: null,
    deleteMessageError: ['error'],
    markMessageRead: ['messageId'],
    markMessageReadSuccess: null,
    markMessageReadError: ['error'],
    messagesReset: null,

});

export const MessagesTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    messages: null,
    error: null,
    refreshing: false
};

export const MessagesSelectors = {
    selectMessages: state => state.messages.messages,
    selectRefreshStatus: state => state.messages.refreshing
};

export const request = (state, action) => {
    const {refreshing} = action;
    return {...state, loading: true, refreshing: !!refreshing};
};

export const success = (state, action) => {
    const {messages, refreshing} = action;
    let oldMessages = state.messages ? state.messages.items : [];
    if (refreshing) {
        oldMessages = [];
    }
    const newMessages= oldMessages.concat(messages.items);
    console.log('new messages', newMessages);
    messages.items = newMessages;

    return {
        ...state,
        loading: false,
        messages,
        error: false,
        refreshing: false
    }
};
export const failure = (state, action) => ({...state, loading: false, error: action.error, refreshing: false });
export const reset = (state, action) => ({...state, messages: null});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.MESSAGES_REQUEST]: request,
    [Types.MESSAGES_SUCCESS]: success,
    [Types.MESSAGES_FAILURE]: failure,
    [Types.MESSAGES_RESET]: reset,

});