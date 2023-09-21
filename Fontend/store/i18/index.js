const i18Module = {
  state() {
    return {
      locales: ['en', 'vi'],
      locale: 'en',
    }
  },
  mutations: {
    SET_LANG(state, locale) {
      if (state.locales.includes(locale)) {
        state.locale = locale;
      }
    },
  },
}

export default i18Module
