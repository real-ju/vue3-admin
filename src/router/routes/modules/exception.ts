import type { RouteRecordRaw } from 'vue-router';

import { asyncViewImport } from '/@/router/helper/asyncComponentImport';

const exception: RouteRecordRaw[] = [
  {
    path: '/404',
    name: 'exception-404',
    meta: {
      title: '404 Not Found',
      public: true,
      hideTitleSuffix: true,
      allowTabControl: false
    },
    component: asyncViewImport('exception/index.vue'),
    props: { code: 404 }
  },
  {
    path: '/403',
    name: 'exception-403',
    meta: {
      title: '403 Forbidden',
      public: true,
      hideTitleSuffix: true,
      allowTabControl: false
    },
    component: asyncViewImport('exception/index.vue'),
    props: { code: 403 }
  }
];

export default exception;
