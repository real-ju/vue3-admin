import type { RouteRecordRaw } from 'vue-router';

import { asyncLayoutImport, asyncViewImport } from '/@/router/helper/asyncComponentImport';

const auth: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  redirect: '/auth/login',
  meta: {
    title: 'Auth',
    public: true,
    allowTabControl: false
  },
  component: asyncLayoutImport('auth/index.vue'),
  children: [
    {
      path: 'login',
      name: 'auth-login',
      meta: {
        title: '登陆'
      },
      component: asyncViewImport('auth/login.vue')
    }
  ]
};

export default auth;
