import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  { path: '/',
    name: '/login',
    component: resolve => require(['@/components/view/login/login'], resolve)
  },
  { path: '/managerIndex',
    name: 'shouye',
    component: resolve => require(['@/components/view/shouye/shouye'], resolve),
    children: [
      { path: '/managerIndex',
        name: 'managerIndex',
        component: resolve => require(['@/components/view/managerindex/managerindex'], resolve)
      },
      { path: '/managerUser',
        name: 'managerUser',
        component: resolve => require(['@/components/view/manageruser/manageruser'], resolve)
      },
      { path: '/managerComm',
        name: 'managerComm',
        component: resolve => require(['@/components/view/managercomm/managercomm'], resolve)
      },
      { path: '/managerOrder',
        name: 'managerOrder',
        component: resolve => require(['@/components/view/managerorder/managerorder'], resolve)
      },
      { path: '/adminBraAdd',
        name: 'adminBraAdd',
        component: resolve => require(['@/components/view/adminBranch/adminbraadd/adminbraadd'], resolve)
      },
      { path: '/adminBraSearch',
        name: 'adminBraSearch',
        component: resolve => require(['@/components/view/adminBranch/adminbrasearch/adminbrasearch'], resolve)
      },
      { path: '/adminBraUpdate',
        name: 'adminBraUpdate',
        component: resolve => require(['@/components/view/adminBranch/adminBraUpdate/adminBraUpdate'], resolve)
      },
      { path: '/adminUserAdd',
        name: 'adminUserAdd',
        component: resolve => require(['@/components/view/adminUser/adminUserAdd/adminUserAdd'], resolve)
      },
      { path: '/adminUserSearch',
        name: 'adminUserSearch',
        component: resolve => require(['@/components/view/adminUser/adminUserSearch/adminUserSearch'], resolve)
      },
      { path: '/adminUserUpdate',
        name: 'adminUserUpdate',
        component: resolve => require(['@/components/view/adminUser/adminUserUpdate/adminUserUpdate'], resolve)
      }
    ]
  }
]

export default new Router({
  routes
})
