export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录', hidden: true },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    meta: { title: 'layout', hidden: false, icon: 'HomeFilled' },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '首页', hidden: false, icon: 'HomeFilled' },
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    path: '/screen',
    name: 'screen',
    meta: { title: '可视化大屏', hidden: false, icon: 'Platform' },
    component: () => import('@/views/screen/index.vue'),
  },
]

//异步路由
export const asyncRoutes = [
  {
    path: '/acl',
    name: 'Acl',
    redirect: '/acl/user',
    meta: { title: '权限管理', hidden: false, icon: 'Lock' },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/acl/user',
        name: 'User',
        meta: { title: '用户管理', hidden: false, icon: 'User' },
        component: () => import('@/views/acl/user/index.vue'),
      },
      {
        path: '/acl/role',
        name: 'Role',
        meta: { title: '角色管理', hidden: false, icon: 'UserFilled' },
        component: () => import('@/views/acl/role/index.vue'),
      },
      {
        path: '/acl/permission',
        name: 'Permission',
        meta: { title: '菜单管理', hidden: false, icon: 'Monitor' },
        component: () => import('@/views/acl/permission/index.vue'),
      },
    ],
  },
  {
    path: '/product',
    name: 'Product',
    redirect: '/product/attr',
    meta: { title: '菜单管理', hidden: false, icon: 'Coin' },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/product/attr',
        name: 'Atrr',
        meta: { title: '属性管理', hidden: false, icon: 'Handbag' },
        component: () => import('@/views/product/atrr/index.vue'),
      },
      {
        path: '/product/sku',
        name: 'Sku',
        meta: { title: 'SKU管理', hidden: false, icon: 'ShoppingCart' },
        component: () => import('@/views/product/sku/index.vue'),
      },
      {
        path: '/product/spu',
        name: 'Spu',
        meta: { title: 'SPU管理', hidden: false, icon: 'ShoppingCartFull' },
        component: () => import('@/views/product/spu/index.vue'),
      },
      {
        path: '/product/tradeMark',
        name: 'TradeMark',
        meta: { title: '品牌管理', hidden: false, icon: 'Goods' },
        component: () => import('@/views/product/trademark/index.vue'),
      },
    ],
  },
]

//任意路由
export const anyRoutes = [
  {
    path: '/404',
    name: '404',
    meta: { title: '404', hidden: true },
    component: () => import('@/views/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: { title: '任意路由', hidden: true },
  },
]
