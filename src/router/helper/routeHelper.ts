import projectSetting from '/@/settings/projectSetting';
import { setDocTitle } from '../../utils/domUtils';
import { getEnv } from '/@/utils/env';

/**
 * 相对url转化为路由记录name
 */
export function routePathToName(url: string) {
  return url.split('/').join('-');
}

/**
 * 设置页面标题
 */
export function setPageTitle(title: string = '', hideSuffix: boolean = false) {
  if (!hideSuffix && projectSetting.showPageTitleSuffix) {
    const APP_TITLE = getEnv().VITE_APP_TITLE;
    title += ` - ${APP_TITLE}`;
  }
  setDocTitle(title);
}
