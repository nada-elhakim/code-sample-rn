import {call, put} from 'redux-saga/effects';
import i18n from '../../i18n/i18n.config';
import {NativeModules, Platform} from 'react-native';
import * as _ from 'lodash';

import {languages} from '../../config/AppConfig';
import {getLanguage, saveLanguage} from "../../services/Storage";
import LanguageActions from './LanguageRedux';
import config from "../../config/AppConfig";
import {addLanguageToRequestHeaders} from "../../services/Api";

// import {setMomentLocale} from "../../Services/Utils";

export function* changeLanguageSaga(api, action) {
    let {language} = action;
    language = _.pick(language, ['code', 'name']);
    i18n.changeLanguage(language.code);
    yield call(saveLanguage, language);
    yield put(LanguageActions.changeLanguageSuccess(language));
    yield call(addLanguageToRequestHeaders, api, language.code);
    // yield call(setMomentLocale, language.code);
}

export function* getUserLanguageSaga(api, action) {
    let language = yield call(getLanguage);
    if (!language) {
        language = yield call(getDefaultLanguage);
    }
    i18n.changeLanguage(language.code);
    yield call(addLanguageToRequestHeaders, api, language.code);
    console.log('Add language to request headers')
    yield put(LanguageActions.changeLanguageSuccess(language));
}


export function getDefaultLanguage() {
    const locale = getDeviceLocale();
    console.log('locale', locale);
    const filtered = languages.filter(language => locale.indexOf(language.code) > -1);
    if (filtered.length > 0) {
        return filtered[0];
    } else {
        return config.i18n.initialLang;
    }
}

export function getDeviceLocale() {
    return (
        Platform.OS === 'android' ?
            NativeModules.I18nManager.localeIdentifier :
            NativeModules.SettingsManager.settings.AppleLocale
    );
}

