// eslint-disable-next-line
import { FixedLayout } from '@/layouts'
// eslint-disable-next-line

export const asyncRouterMap = [
  {
    path: '/lab',
    // component: () => import('@/views/Lab.vue'),
    component: FixedLayout,
    name: 'lab',
    children: [
      {
        path: '',
        component: () => import('@/views/Lab.vue'),
        redirect: '/lab/list',
        children: [
          {
            path: 'list',
            component: () => import('@/views/Lab/LabList')
          },
          {
            path: 'add',
            name: 'lab_add',
            meta: {
              breadcrumbs: [{ text: '项目管理', path: '/lab/list' }, { text: '创建项目' }],
              hiddenSideBar: true
            },
            component: () => import('@/views/Lab/AddLab')
          },
          {
            path: 'lab_edit',
            name: 'lab_edit',
            meta: {
              breadcrumbs: [{ text: '项目详情', go: -1 }, { text: '编辑项目' }],
              hiddenSideBar: true
            },
            component: () => import('@/views/Lab/AddLab')
          },
        ]
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    component: FixedLayout,
    meta: { title: 'menu.product' },
    redirect: '/product/test-bed',
    children: [
      {
        path: 'test-bed',
        name: 'test-bed',
        component: () => import('@/views/Product/TestBed.vue'),
        meta: { title: '实验床', keepAlive: true }
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
    path: '/',
    component: FixedLayout,
    redirect: '/labcombo',
    hidden: true,
    children: [
      {
        path: '/labcombo',
        name: 'labcombo',
        meta: { title: '实验床' },
        component: () => import('@/views/LabCombo')
      },
      {
        path: '/labintroduce',
        name: 'labintroduce',
        meta: { title: '线上实验室' },
        component: () => import('@/views/LabIntroduce')
      },
      // ===================================智能核心网===================
      {
        path: '/networklabintro',
        name: 'networklabintro',
        component: () => import('@/views/IntelligentNetworkLabIntro')
      },
      {
        path: '/networklaborder',
        name: 'networklaborder',
        component: () => import('@/views/IntelligentNetworkLabOrder')
      }
      // ===================================智能核心网=====================
    ]
  },
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
