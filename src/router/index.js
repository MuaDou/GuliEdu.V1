import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    name: '讲师管理',
    meta: { title: '讲师管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: '讲师列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'home' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/edu/subject/list'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/edu/subject/info'),
        meta: { title: '课程详细信息', icon: 'table' }
      },
      {
        path: 'info/:id',
        name: 'EduInfo',
        component: () => import('@/views/edu/subject/info'),
        meta: { title: '课程详细信息', noCache: true },
        hidden: true,
      },
      {
        path: 'chapter/:id',
        name: 'EduChapter',
        component: () => import('@/views/edu/subject/chapter'),
        meta: { title: '课程大纲', noCache: true },
        hidden: true,
      },
      {
        path: 'publish/:id',
        name: 'EduPublish',
        component: () => import('@/views/edu/subject/publish'),
        meta: { title: '课程发布', noCache: true },
        hidden: true,
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
