import type { Router } from 'vue-router';

import { createPermissionGuard } from './permission';
import { createLayoutGuard } from './layout';
import NProgress from 'nprogress';

export function setupRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
  });

  createPermissionGuard(router);
  createLayoutGuard(router);
}
