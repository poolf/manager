// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import mheader from './components/layout/ManagerHeader/managerHeader'
import mNav from './components/layout/ManagerNav/managerNav'
import branform from './components/view/adminBranch/branchForm/branchForm'
import userform from './components/view/adminUser/userForm/userform'

//element-ui
Vue.use(ElementUI)
Vue.use(mheader)
Vue.use(mNav)
Vue.use(branform)
Vue.use(userform)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
