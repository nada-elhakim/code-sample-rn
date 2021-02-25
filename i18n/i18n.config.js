import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import config from '../config/AppConfig';

const i18nextOptions = {
    ns: config.i18n.namespace,
    defaultNS: config.i18n.namespace[0],
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            common: require('./locales/en/common.json'),
            auth: require('./locales/en/auth.json'),
            dashboard: require('./locales/en/dashboard.json'),
        },
        cn: {
            common: require('./locales/cn/common.json'),
            auth: require('./locales/cn/auth.json'),
            dashboard: require('./locales/cn/dashboard.json'),
        }
    },
    saveMissing: true,
    lng: config.i18n.initialLang.code,
    fallbackLng: config.i18n.fallbackLng.code,
    whitelist: config.i18n.locales,
    react: {
        wait: true
    }
};

i18n
    .use(reactI18nextModule)
    .init(i18nextOptions);


export default i18n;
