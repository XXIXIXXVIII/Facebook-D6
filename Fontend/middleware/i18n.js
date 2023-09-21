export default function ({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale
  if (isHMR) return
  const locale = JSON.parse(localStorage.getItem("lang")) || defaultLocale

  if (!store.state.i18Module.locales.includes(locale)) {
    return redirect('/Notfound')
  }

  store.commit('SET_LANG', locale)
  app.i18n.locale = locale
}
