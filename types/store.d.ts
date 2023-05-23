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
  hasFetchedPermissionData: boolean;
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
  cachedRoutes: Set<string>;
}

export interface TabInfo {
  route: string;
  title: string;
  cache: boolean;
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
