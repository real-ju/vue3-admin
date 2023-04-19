export interface LoginParams {
  username: string;
  password: string;
  grant_type: string;
  captchaId: string;
  captchaCode: string;
}

export interface SetUserOrganizationParams {
  orgId: string;
  orgName: string;
}
