import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import VueClock from '@dangvanthanh/vue-clock'
import 'vuetify/dist/vuetify.min.css' 


Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueClock)

new Vue({
  router,
  vuetify : new Vuetify(),
  render: h => h(App)
}).$mount('#app')

