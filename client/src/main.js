import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import VueClock from '@dangvanthanh/vue-clock'
import VueHtmlToPaper from "vue-html-to-paper";
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css' 
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
//import colors from 'vuetify/lib/util/colors'
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
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);


const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
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

