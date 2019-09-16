import Vue from 'vue'
import router from './router'
import App from '@/components/layout/App'
import BootstrapVue from 'bootstrap-vue'
import VueToastr2 from 'vue-toastr-2'
import store from '@/store/store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'

window.toastr = require('toastr')

Vue.config.productionTip = false

Vue.use(BootstrapVue) 
Vue.use(VueToastr2)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})