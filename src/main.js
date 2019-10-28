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
import proclassform from './components/view/adminPro/adminProClass/adminProClassForm/ProClassForm'
import proform from './components/view/adminPro/adminProMessage/adminProForm/adminProForm'
import branBCform from './components/view/adminBrandDisCon/BrandDisConForm/BrandDisConForm'
import procascader from './components/view/adminPro/adminProClass/proCascader/proCascader'

//element-ui
Vue.use(ElementUI)
Vue.use(mheader)
Vue.use(mNav)
Vue.use(branform)
Vue.use(userform)
Vue.use(proclassform)
Vue.use(proform)
Vue.use(branBCform)
Vue.use(procascader)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user') //还没写具体，到时根据login存储在改动
  }
  let user = JSON.parse(sessionStorage.getItem('user')) //还没写具体，到时根据login存储在改动
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
