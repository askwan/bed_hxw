import Layout from '@/layouts/Index.vue'

export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/introduce',
    hidden: true,
    // 实验床分页样式
    children: [
      {
        path: 'introduce',
        name: 'bed_introduce',
        meta: { title: '产品介绍' },
        component: () => import('@/views/Introduce.vue')
      },
      {
        path: 'source',
        name: 'bed_source',
        component: () => import('@/views/Product/TestBed.vue'),
        meta: { title: '申请资源' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/access_token',
    name: 'access_token',
    component: () => import('@/views/AccessToken'),
    meta: { title: '验证', keepAlive: false }
  },
  {
    path: '/about',
    component: () => import('@/views/About')
  },
]
