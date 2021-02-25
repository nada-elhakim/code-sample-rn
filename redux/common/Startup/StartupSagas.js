import { put, call, select} from 'redux-saga/effects';
import {Platform, Alert, Linking} from 'react-native';
import StartupActions from './StartupRedux';
import LanguageActions from '../../../screens/Language/LanguageRedux';
import AuthStatusActions from '../../common/AuthStatus/AuthStatusRedux';
import i18n from '../../../i18n/i18n.config';
import {getUserLanguageSaga} from "../../../screens/Language/LanguageSagas";
import config from "../../../config/AppConfig";

export function* startupSaga(api) {
    yield call(getUserLanguageSaga, api);
    yield put(StartupActions.checkUpdateRequest());
    yield put(AuthStatusActions.checkAuthStatus());
    yield put(StartupActions.startupSuccess());
}

export function *checkUpdateSaga(api) {
    const params = {
        platform: Platform.OS,
        version: config.version
    };
    const res = yield call(api.checkUpdate, params);
    console.log('update res', res);
    if (res.status === 200) {
        if (res.data.code === 200) {
            const newVersion = res.data.data.new_version;
            if (newVersion) {
                Alert.alert(
                    i18n.t('dashboard:versionUpdate.title'),
                    newVersion.description,
                    [
                        {text: i18n.t('common:interface.ok'), onPress: () => openDownloadLink(newVersion.download_url)},
                        {text: i18n.t('common:interface.cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    { cancelable: false }
                )
            }
        }
    }
}

function openDownloadLink(link) {
    Linking.canOpenURL(link).then((supported) => {
        if (supported) {
            return Linking.openURL(link)
        }
    }).catch(err => console.error('An error occurred', err));
}




