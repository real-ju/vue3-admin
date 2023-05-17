import type { Router, RouteLocationNormalized } from 'vue-router';
import type { PerTree } from '/#/store';

import projectSetting from '/@/settings/projectSetting';
import { useUserStore } from '/@/store/modules/user';
import { usePermissionStoreWithOut } from '/@/store/modules/permission';
import { BasicPageEnum, ExceptionPageEnum } from '/@/enums/pageEnum';
import { getUserInfo, getUserRoles } from '/@/api/auth';
import { getMenuFirstLeafNode } from '/@/logics/helper/layout';
import { useLayoutStore } from '/@/store/modules/layout';

const permissionStore = usePermissionStoreWithOut();

function checkRoutePermission(to: RouteLocationNormalized) {
  return permissionStore.routePermissions.indexOf(String(to.name)) !== -1;
}

const routeWhiteList: string[] = [
  ExceptionPageEnum.EXCEPTION_403,
  ExceptionPageEnum.EXCEPTION_404,
  BasicPageEnum.REFRESH
];

export function createSafetyPermissionGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const isMatched = to.matched.length !== 0;
    if (!isMatched) {
      next(ExceptionPageEnum.EXCEPTION_404);
      return;
    }

    if (routeWhiteList.indexOf(to.path) !== -1) {
      next();
      return;
    }

    const userStore = useUserStore();
    const isLogin = userStore.isLogin;
    // const isLogin = true;
    if (isLogin) {
      if (!permissionStore.hasFetchedPermissionData) {
        getUserInfo()
          .then((res) => {
            const applications = res.data.applications;
            const application = applications.find((item: any) => {
              return (
                item.code === projectSetting.authSystemPlatCode && item.appType === 'application'
              );
            });
            if (!application) {
              const error = new Error('获取权限失败');
              next(error);
            }
            const perTree: PerTree = application.children ? application.children : [];
            permissionStore.generatePermissions(perTree);

            const userInfo = res.data.user;
            userStore.setUserInfo(userInfo);

            // 获取用户角色信息
            getUserRoles(userInfo.id)
              .then((res) => {
                const roles = res.data;
                userStore.userRoles = roles;
                permissionStore.hasFetchedPermissionData = true;
                next(to);
              })
              .catch(() => {
                const error = new Error('获取角色信息失败');
                next(error);
              });
          })
          .catch(() => {
            const error = new Error('获取权限失败');
            next(error);
          });
      } else {
        if (to.path === '/') {
          const layoutStore = useLayoutStore();
          const menuNode = getMenuFirstLeafNode(layoutStore.menuTree);
          if (menuNode) {
            next({
              name: menuNode.key
            });
          } else {
            next(ExceptionPageEnum.EXCEPTION_404);
          }
        } else if (to.path === BasicPageEnum.LOGIN) {
          next('/');
        } else {
          if (!checkRoutePermission(to)) {
            const error = new Error('没有访问权限');
            next(error);
          } else {
            next();
          }
        }
      }
    } else {
      if (!to.meta.public) {
        next({
          path: BasicPageEnum.LOGIN,
          query: {
            back_url: encodeURIComponent(to.fullPath)
          }
        });
      } else {
        next();
      }
    }
  });

  router.onError((error) => {
    router.push(ExceptionPageEnum.EXCEPTION_403);
  });
}
