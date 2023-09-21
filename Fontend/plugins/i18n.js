import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: JSON.parse(localStorage.getItem("lang")), 
  fallbackLocale: JSON.parse(localStorage.getItem("lang")),
  messages: {
    'en': require('~/locales/en.json'), 
    'vi': require('~/locales/vi.json'), 
  },
})

export const $i18n = i18n; 

export default ({ app }) => {
  app.i18n = i18n
}