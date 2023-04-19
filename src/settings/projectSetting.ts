import type { ProjectSetting } from '/#/config';

import { RoutePermissionModeEnum } from '/@/enums/appEnum';

const setting: ProjectSetting = {
  // 路由权限模式
  routePermissionMode: RoutePermissionModeEnum.SAFETY,
  // 网页标题后缀
  showPageTitleSuffix: true,
  // 统一权限平台标识
  authSystemPlatCode: 'customs-check',
  // 使用IconFont的图标配置
  iconfontUrl: 'https://at.alicdn.com/t/c/font_3373343_xic7ab2dkh9.js'
};

export default setting;
