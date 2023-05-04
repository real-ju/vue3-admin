import type { Router } from 'vue-router';

import { setPageTitle } from '/@/router/helper/routeHelper';
import { useLayoutStore } from '/@/store/modules/layout';
import NProgress from 'nprogress';

export function createLayoutGuard(router: Router) {
  router.afterEach((to, from, failure) => {
    // 设置页面标题
    setPageTitle(to.meta.title);

    const layoutStore = useLayoutStore();
    // 更新菜单选中
    layoutStore.updateSelectedMenuKeyPath(to);
    // 更新页签
    layoutStore.updatePageTabs(to);

    console.log(layoutStore.willClearCacheRoute);

    // 加载进度条
    NProgress.done();
  });
}
