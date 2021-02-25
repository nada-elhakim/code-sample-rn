import {createActions} from 'reduxsauce';

const { Types, Creators } = createActions({
    showToast: ['message', 'toastType', 'duration']
});
export const ToastTypes = Types;
export default Creators;
