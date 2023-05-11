import { store } from '/@/store';
import { defineStore } from 'pinia';
import { useLayoutStore } from './layout';
import layoutSetting from '/@/settings/layoutSetting';

import type { PermissionState, PerTreeNode, PerTree, MenuItem, MenuTree } from '/#/store';

let routePermissions: string[] = [];
let actionPermissions: string[] = [];

/**
 * 递归权限树，收集权限字符串和构建菜单树
 */
function collectPermissions(perTree: PerTree): MenuTree {
  const menuTree: MenuTree = [];
  perTree.forEach((childNode: PerTreeNode) => {
    const { appType, code, children } = childNode;
    if (appType === 'menu') {
      if (children && children.length > 0) {
        const isDir = code.indexOf('dir:') === 0;
        if (!isDir) {
          routePermissions.push(code);
          collectPermissions(children);
          const cloneNode = { ...childNode };
          if (cloneNode.children) {
            delete cloneNode.children;
          }
          menuTree.push(generateMenuItem(cloneNode));
        } else {
          const { flatDirKeys } = layoutSetting;
          if (flatDirKeys.indexOf(code) === -1) {
            menuTree.push(generateMenuItem(childNode, collectPermissions(children)));
          } else {
            menuTree.push(...collectPermissions(children));
          }
        }
      } else {
        if (code.indexOf('link:') === -1) {
          routePermissions.push(code);
        }
        menuTree.push(generateMenuItem(childNode));
      }
    } else if (appType === 'module') {
      if (children && children.length > 0) {
        collectPermissions(children);
      } else {
        routePermissions.push(code);
      }
    } else if (appType === 'button') {
      actionPermissions.push(code);
    }
  });
  return menuTree;
}

/**
 * 构建菜单项
 */
function generateMenuItem(perNode: PerTreeNode, children?: MenuTree): MenuItem {
  const menuItem: MenuItem = { title: perNode.name, key: perNode.code };
  if (perNode.icon) {
    const arr = perNode.icon.split(':');
    menuItem.icon = {
      type: arr[0],
      name: arr[1]
    };
  }
  if (children) {
    menuItem.children = children;
  }
  return menuItem;
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    hasFetchedPermissionData: false,
    routePermissions: [],
    actionPermissions: []
  }),
  getters: {},
  actions: {
    generatePermissions(perTree: PerTree) {
      console.log('perTree', perTree);
      routePermissions = [];
      actionPermissions = [];
      const menuTree = collectPermissions(perTree);
      console.log('menuTree', menuTree);
      this.routePermissions = routePermissions;
      this.actionPermissions = actionPermissions;
      const layoutStore = useLayoutStore();
      layoutStore.menuTree = menuTree;
    },
    clearPermissions() {
      this.routePermissions = [];
      this.actionPermissions = [];
      this.hasFetchedPermissionData = false;
    }
  }
});

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
