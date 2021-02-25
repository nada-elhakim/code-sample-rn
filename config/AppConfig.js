export const languages = [
    {
        code: 'en',
        name: 'English'
    },
    {
        code: 'cn',
        name: '简体中文'
    }
];

export default {
    appName: 'Test',
    domain: '',
    version: 9,
    i18n: {
        locales: ['en', 'cn'],
        languages,
        fallbackLng: languages[1],
        initialLang: languages[1],
        namespace: ['common', 'menu', 'auth', 'dashboard']
    },
    api: {
        baseUrl: '',
        pollProfileInterval: 10 * 60 * 1000,
        captchaCountDown: 60
    },
    xgPush: {
        ios: {
            accessId: '',
            accessKey: ''
        },
        android: {
            accessId: '',
            accessKey: ''
        }
    }
};

