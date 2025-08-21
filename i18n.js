const i18nConfig = {
  locales: ['en', 'ar', 'fr'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
  },
  loadLocaleFrom: (lang, ns) => import(`./public/locales/${lang}.json`).then(m => m.default),
};

export default i18nConfig;
