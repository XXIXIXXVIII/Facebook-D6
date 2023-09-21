/* eslint-disable vue/multi-word-component-names */
import Vue from "vue";
import VueTippy, { TippyComponent } from "vue-tippy";


// Add additional themes.
import "tippy.js/themes/light.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/themes/google.css";
import "tippy.js/themes/translucent.css";

Vue.use(VueTippy);
Vue.component("Tippy", TippyComponent);

// or
Vue.use(VueTippy, {
  directive: "tippy", // => v-tippy
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false
      }
    },
  },
  maxWidth: 'none',
  theme: 'tomato'
});

Vue.component("Tippy", TippyComponent);