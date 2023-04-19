import { httpRequester } from '/@/utils/http/axios';
import ProjectSetting from '/@/settings/projectSetting';
import { LoginParams, SetUserOrganizationParams } from '/#/api/auth';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  // 获取用户信息
  getUserInfo = '/system/sysUser/getUserInfo',
  // 获取登录验证码
  getCaptcha = '/auth/oauth/getCaptcha',
  // 登录获取token
  login = '/auth/oauth/token',
  // 获取 RSA 加密公钥
  getRsaPublicKey = '/auth/oauth/pubKey',
  // 退出登录
  logout = '/auth/oauth/logout',
  // 根据用户ID获取角色列表
  getUserRoles = '/system/sysUser/getUserRoleInfo',
  // 切换用户组织
  setUserOrganization = '/system/sysUser/switchUserCurrentOrg'
}

export const getUserInfo = () =>
  httpRequester.get({
    url: Api.getUserInfo,
    data: {
      platCode: ProjectSetting.authSystemPlatCode
    }
  });

export const getCaptcha = () =>
  httpRequester.get({
    url: Api.getCaptcha
  });

export const login = (data: LoginParams) =>
  httpRequester.post(
    {
      url: Api.login,
      data
    },
    {
      contentType: ContentTypeEnum.FORM_DATA,
      customToken: 'Basic c3VwZXJsdWN5X3N5bmVyZ3k6c3luZXJneS0xcWF6LTJ3c3g='
    }
  );

export const getRsaPublicKey = () =>
  httpRequester.get({
    url: Api.getRsaPublicKey
  });

export const logout = () =>
  httpRequester.post({
    url: Api.logout
  });

export const getUserRoles = (userId: string) =>
  httpRequester.get({
    url: Api.getUserRoles,
    data: { id: userId }
  });

export const setUserOrganization = (data: SetUserOrganizationParams) =>
  httpRequester.put({
    url: Api.setUserOrganization,
    data
  });
