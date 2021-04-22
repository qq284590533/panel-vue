import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Panel from '@/components/panel'

Vue.use(Panel)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
