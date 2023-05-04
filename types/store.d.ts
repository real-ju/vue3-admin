import { MenuModeEnum } from '/@/enums/layoutEnum';

/* user module */
export interface UserState {
  isLogin: boolean;
  userInfo: Nullable<Recordable>;
  token: Nullable<string>;
  userRoles: Recordable[];
}

// interface UserInfo {}

/* permission module */
export interface PermissionState {
  routePermissions: string[];
  actionPermissions: string[];
}

export type PerTree = PerTreeNode[];

export interface PerTreeNode {
  name: string;
  appType: string;
  code: string;
  icon: string;
  children?: PerTreeNode[];
}

/* layout module */
export interface LayoutState {
  menuMode: MenuModeEnum;
  menuTree: MenuTree;
  selectedMenuKeyPath: string[];
  pageTabs: TabInfo[];
  currentTabIndex: number;
  // 将要清除缓存的路由fullPath
  willClearCacheRoute: Set<string>;
}

export interface TabInfo {
  route: string;
  title: string;
}

export type MenuTree = MenuItem[];

export interface MenuItem {
  title: string;
  key: string;
  icon?: {
    type: string;
    name: string;
  };
  children?: MenuItem[];
}
