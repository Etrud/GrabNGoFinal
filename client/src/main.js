import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import VueClock from '@dangvanthanh/vue-clock'
import DatetimePicker from 'vuetify-datetime-picker'
import VueHtmlToPaper from "vue-html-to-paper";
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css' 

import colors from 'vuetify/lib/util/colors'
import store from '@/store/store'

Vue.config.productionTip = false
const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css"
  ]
};

Vue.use(VueHtmlToPaper, options);
Vue.use(Vuetify)
Vue.use(VueClock)
Vue.use(DatetimePicker)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#8C7AA9',
        secondary: colors.grey.darken1,
        accent: '#7192BE',
        error: colors.red.accent3,
      },
      dark: {
        
      },
  },
}}
)


sync(store, router)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

