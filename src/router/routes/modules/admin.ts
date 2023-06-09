import type { RouteRecordRaw } from 'vue-router';

import { asyncLayoutImport, asyncViewImport } from '/@/router/helper/asyncComponentImport';

const admin: RouteRecordRaw = {
  path: '/',
  name: 'admin',
  meta: {
    title: 'Admin',
    public: false
  },
  component: asyncLayoutImport('admin/index.vue'),
  children: [
    {
      path: 'test1',
      name: 'test1',
      meta: {
        title: '测试1'
      },
      component: asyncViewImport('test/index.vue')
    },
    {
      path: 'test2',
      name: 'test2',
      meta: {
        title: '测试2'
      },
      component: asyncViewImport('test/index.vue')
    },
    {
      path: 'test3',
      name: 'test3',
      meta: {
        title: '测试3'
      },
      component: asyncViewImport('test/index.vue')
    }
  ]
};

export default admin;
