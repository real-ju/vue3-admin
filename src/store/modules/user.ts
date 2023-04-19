import { defineStore } from 'pinia';

import type { UserState } from '/#/store';

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    isLogin: false,
    token: null,
    userInfo: null,
    userRoles: []
  }),
  getters: {
    getUserInfo(state) {
      return state.userInfo ?? {};
    },
    getToken(state) {
      return state.token ?? '';
    },
    userCurrentOrgInfo(state): Recordable {
      const userInfo = this.getUserInfo;
      return userInfo.currentOrg ?? {};
    },
    userInfoConstant(state): Recordable {
      const userInfo = this.getUserInfo;
      const orgInfo = this.userCurrentOrgInfo;
      return {
        // 报关行信息
        CUSTOMS_BROKER_ID: userInfo.rootId ?? '',
        CUSTOMS_BROKER_NO: userInfo.rootId ?? '',
        CUSTOMS_BROKER_CODE: userInfo.rootId ?? '',
        CUSTOMS_BROKER_NAME: userInfo.rootId ?? '',
        // 设置当前组织
        CUSTOMS_ORGANIZATION_UNIT: orgInfo.orgId ?? '',
        CUSTOMS_ORGANIZATION_UNIT_NAME: orgInfo.orgName ?? '',
        CUSTOMS_ORGANIZATION_TYPE: userInfo.orgType ?? []
      };
    }
  },
  actions: {
    login(token: string) {
      this.token = token;
      this.isLogin = true;
    },
    logout() {
      // 清理用户信息
      this.userInfo = null;
      this.userRoles = [];

      this.token = null;
      this.isLogin = false;
    },
    setUserInfo(userInfo: Recordable) {
      this.userInfo = userInfo;
    }
  },
  persist: { key: 'pinia-persistedstate-user', paths: ['isLogin', 'token'] }
});
