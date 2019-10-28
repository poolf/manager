import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/components/view/login/login'], resolve)
  },
  {
    path: '/',
    name: 'shouye',
    component: resolve => require(['@/components/view/shouye/shouye'], resolve),
    children: [
      {
        path: '/managerIndex',
        name: 'managerIndex',
        component: resolve =>
          require(['@/components/view/managerIndex/managerIndex'], resolve)
      },
      {
        path: '/managerUser',
        name: 'managerUser',
        component: resolve =>
          require(['@/components/view/managerUser/managerUser'], resolve)
      },
      {
        path: '/managerComm',
        name: 'managerComm',
        component: resolve =>
          require(['@/components/view/managerComm/managerComm'], resolve)
      },
      {
        path: '/managerOrder',
        name: 'managerOrder',
        component: resolve =>
          require(['@/components/view/managerOrder/managerOrder'], resolve)
      },
      //门店信息管理部分
      {
        path: '/adminBraAdd',
        name: 'adminBraAdd',
        component: resolve =>
          require([
            '@/components/view/adminBranch/adminBraAdd/adminBraAdd'
          ], resolve)
      },
      {
        path: '/adminBraSearch',
        name: 'adminBraSearch',
        component: resolve =>
          require([
            '@/components/view/adminBranch/adminBraSearch/adminBraSearch'
          ], resolve)
      },
      {
        path: '/adminBraUpdate',
        name: 'adminBraUpdate',
        component: resolve =>
          require([
            '@/components/view/adminBranch/adminBraUpdate/adminBraUpdate'
          ], resolve)
      },
      //门店集群号更新
      {
        path: '/adminBraSearchUpdate',
        name: 'adminBraSearchUpdate',
        component: resolve =>
          require([
            '@/components/view/adminBranch/adminBraSearch/adminbraUpdateBcids'
          ], resolve)
      },
      //门店管理员
      {
        path: '/adminBraManagerList',
        name: 'adminBraManagerList',
        component: resolve =>
          require([
            '@/components/view/adminBranch/adminBraManager/adminBraManagerList/adminBraManagerList'
          ], resolve)
      },
      //门店配送规则管理
      {
        path: '/adminBrandDisConList',
        name: 'adminBrandDisConList',
        component: resolve =>
          require([
            '@/components/view/adminBrandDisCon/BrandDisConList/BrandDisConList'
          ], resolve)
      },
      {
        path: '/adminBrandDisConAdd',
        name: 'adminBrandDisConAdd',
        component: resolve =>
          require([
            '@/components/view/adminBrandDisCon/BrandDisConAdd/BrandDisConAdd'
          ], resolve)
      },
      {
        path: '/adminBrandDisConUpdate',
        name: 'adminBrandDisConUpdate',
        component: resolve =>
          require([
            '@/components/view/adminBrandDisCon/BrandDisConUpdate/BrandDisConUpdate'
          ], resolve)
      },
      //用户管理部分
      {
        path: '/adminUserAdd',
        name: 'adminUserAdd',
        component: resolve =>
          require([
            '@/components/view/adminUser/adminUserAdd/adminUserAdd'
          ], resolve)
      },
      {
        path: '/adminUserSearch',
        name: 'adminUserSearch',
        component: resolve =>
          require([
            '@/components/view/adminUser/adminUserSearch/adminUserSearch'
          ], resolve)
      },
      {
        path: '/adminUserUpdate',
        name: 'adminUserUpdate',
        component: resolve =>
          require([
            '@/components/view/adminUser/adminUserUpdate/adminUserUpdate'
          ], resolve)
      },
      //集群管理
      {
        path: '/branchCluster',
        component: () =>
          import('@/components/view/adminBranchCluster/BranchCluster'),
        meta: { title: '门店集群管理' }
      },
      {
        path: '/branPriceCluster',
        component: () =>
          import(
            '@/components/view/adminProCluster/adminProClusterList/adminProClusterList'
          ),
        meta: { title: '商品集群价格管理' }
      },
      //商品类别管理
      {
        path: '/adminProClassList',
        name: 'adminProClassList',
        component: resolve =>
          require([
            '@/components/view/adminPro/adminProClass/adminProClassList/adminProClassList'
          ], resolve)
      },
      {
        path: '/adminProClassUpdate',
        name: 'adminProClassUpdate',
        component: resolve =>
          require([
            '@/components/view/adminPro/adminProClass/adminProClassUpdate/adminProClassUpdate'
          ], resolve)
      },
      {
        path: '/adminProClassAdd',
        name: 'adminProClassAdd',
        component: resolve =>
          require([
            '@/components/view/adminPro/adminProClass/adminProClassAdd/adminProClassAdd'
          ], resolve)
      },
      //商品信息管理
      {
        path: '/adminProList',
        name: 'adminProList',
        component: resolve =>
          require([
            '@/components/view/adminPro/adminProMessage/adminProList/adminProList'
          ], resolve)
      },
      {
        path: '/adminProAdd',
        name: 'adminProAdd',
        component: resolve =>
          require([
            '@/components/view/adminPro/adminProMessage/adminProAdd/adminProAdd'
          ], resolve)
      },
      {
        path: '/adminProUpdate',
        name: 'adminProUpdate',
        component: resolve =>
          require([
            '@/components/view/adminPro/adminProMessage/adminProUpdate/adminProUpdate'
          ], resolve)
      }
    ]
  }
]

export default new Router({
  routes
})
