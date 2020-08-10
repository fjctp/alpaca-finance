import Vue from 'vue'
import App from './App.vue'

import 'vue-instant/dist/vue-instant.css'
import VueInstant from 'vue-instant'

Vue.use(VueInstant)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
