import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import VueClock from '@dangvanthanh/vue-clock'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css' 
import store from '@/store/store'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueClock)

sync(store, router)

new Vue({
  router,
  store,
  vuetify : new Vuetify(),
  render: h => h(App)
}).$mount('#app')

