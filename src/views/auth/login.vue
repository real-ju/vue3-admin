<template>
  <div class="login-view">
    <a-form
      ref="formRef"
      :model="formModel"
      name="form"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 8 }"
      :rules="formRules"
    >
      <a-form-item name="username">
        <a-input v-model:value="formModel.username" size="large" placeholder="账号">
          <template #prefix>
            <Icon class="input-prefix-icon" name="auth-username" type="svg" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password v-model:value="formModel.password" size="large" placeholder="密码">
          <template #prefix>
            <Icon class="input-prefix-icon" name="auth-password" type="svg" />
          </template>
        </a-input-password>
      </a-form-item>
      <div class="captcha-box">
        <div class="input-box">
          <a-form-item name="captcha">
            <a-input
              v-model:value="formModel.captcha"
              size="large"
              placeholder="验证码"
              @keyup.enter="handleSubmit"
            >
              <template #prefix>
                <Icon class="input-prefix-icon" name="auth-captcha" type="svg" />
              </template>
            </a-input>
          </a-form-item>
        </div>
        <a-spin :spinning="captchaData.loading">
          <div
            class="captcha-img"
            :style="{ cursor: !captchaData.loading && !loginLoading ? 'pointer' : undefined }"
            @click="onClickCaptcha"
          >
            <img
              v-if="captchaData.image"
              class="captcha-img"
              :src="'data:image/jpg;base64,' + captchaData.image"
              alt="captcha"
            />
          </div>
        </a-spin>
      </div>
      <a-form-item>
        <a-button
          block
          size="large"
          @click="handleSubmit"
          :loading="loginLoading"
          :disabled="loginLoading"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts" name="VLogin">
import { getCaptcha, login, getRsaPublicKey } from '/@/api/auth';
import { LoginParams } from '/#/api/auth';
import { message, notification, Button } from 'ant-design-vue/es';
import JSEncrypt from 'jsencrypt';
import { useUserStore } from '/@/store/modules/user';

const router = useRouter();
const route = useRoute();

const formRef = ref();

const formModel = reactive({
  username: '',
  password: '',
  captcha: ''
});

const formRules = {
  username: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }],
  captcha: [{ required: true, message: '请输入验证码' }]
};

const captchaData = reactive({
  loading: false,
  id: '',
  image: ''
});

const updateCaptcha = () => {
  captchaData.loading = true;

  getCaptcha()
    .then((res) => {
      captchaData.id = res.data.captchaId;
      captchaData.image = res.data.image;

      formModel.captcha = '';
    })
    .finally(() => {
      captchaData.loading = false;
    });
};

const onClickCaptcha = () => {
  if (captchaData.loading || loginLoading.value) {
    return;
  }

  updateCaptcha();
};

const loginLoading = ref(false);

const handleSubmit = () => {
  formRef.value.validate().then(() => {
    handleLogin();
  });
};

const handleLogin = () => {
  if (!rsaPublicKey.value || !captchaData.id) {
    message.error('参数错误，请刷新页面重试');
    return;
  }

  loginLoading.value = true;
  const params: LoginParams = {
    username: formModel.username,
    password: formModel.password,
    grant_type: 'password',
    captchaId: captchaData.id,
    captchaCode: formModel.captcha
  };
  // 加密密码数据
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(rsaPublicKey.value);
  const ciphertext = encrypt.encrypt(params.password);
  params.password = 'encrypt:' + ciphertext;

  login(params)
    .then((res) => {
      const userStore = useUserStore();
      userStore.login(res.data.token);
      handleLoginSuccess(res);
    })
    .catch((res) => {
      handleLoginFail(res);
      updateCaptcha();
    })
    .finally(() => {
      loginLoading.value = false;
    });
};

const handleLoginSuccess = (res: any) => {
  const backUrl = route.query.back_url;
  const redirectUrl = backUrl ? decodeURIComponent(String(backUrl)) : '/';
  router.push(redirectUrl);
  // 延迟 1 秒显示欢迎信息
  setTimeout(() => {
    if (+res.data.warnCode === 110002) {
      const key = `open${Date.now()}`;
      notification.warning({
        message: '提示',
        description: res.message,
        duration: 0,
        key,
        btn: () => {
          return h(
            Button,
            {
              type: 'primary',
              size: 'middle',
              onClick: () => {
                notification.close(key);
                // router.push('/account/settings/security');
              }
            },
            '更新密码'
          );
        }
      });
    } else {
      notification.success({
        message: '欢迎',
        description: `${getWelcomeOfTime()}，欢迎回来`
      });
    }
  }, 1000);
};

const getWelcomeOfTime = () => {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9
    ? '早上好'
    : hour <= 11
    ? '上午好'
    : hour <= 13
    ? '中午好'
    : hour < 20
    ? '下午好'
    : '晚上好';
};

const handleLoginFail = (res: any) => {
  notification.error({
    message: '错误',
    description: res.data.message || '请求出现错误，请稍后再试',
    duration: 4
  });
};

const rsaPublicKey = ref('');

const initRsaPublicKey = () => {
  getRsaPublicKey().then((res) => {
    rsaPublicKey.value = res.data.publicKey;
  });
};

updateCaptcha();
initRsaPublicKey();
</script>

<style lang="less" scoped>
.login-view {
  .input-prefix-icon {
    color: #bfbfbf;
  }

  .captcha-box {
    width: 100%;
    display: flex;
    align-items: flex-start;

    .input-box {
      width: 0px;
      flex: 1;
    }

    .captcha-img {
      height: 40px;
      flex: none;
      min-width: 106px;

      display: flex;
      img {
        height: 100%;
      }
    }
  }
}
</style>
