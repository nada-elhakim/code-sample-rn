import i18n from '../../../i18n/i18n.config';
import {ToastContainer as Toast} from '../../../theme/components/Toast/ToastContainer';

export function* showToastSaga(action) {
    const {message, toastType, duration} = action;
    console.log('message', message, toastType);
    Toast.show({
        text: message,
        buttonText: i18n.t('common:interface.ok'),
        duration: duration ? duration : 4000,
        type: toastType ? toastType : 'danger'
    });
}