<template>
  <div class="container auth-layout">
    <div class="main-content">
      <div class="welcome-box">
        <img class="logo" src="/src/assets/images/layout/logo.png" alt="logo" />
        <div class="welcome-words">Welcome to</div>
        <h1 class="system-title">{{ systemTitle }}</h1>
      </div>
      <div class="login-box">
        <div class="header-area">
          <img class="logo" src="/src/assets/images/layout/logo.png" alt="logo" />
          <h1 class="system-title">{{ systemTitle }}</h1>
        </div>
        <AliveRouterView></AliveRouterView>
      </div>
    </div>
    <div class="footer">Copyright © {{ currentYear }} 重庆超体科技有限公司</div>
  </div>
</template>

<script setup lang="ts" name="LAuth">
import AliveRouterView from '../aliveRouterView/index.vue';
import { getEnv } from '/@/utils/env';
import dayjs from 'dayjs';

const { VITE_APP_TITLE: systemTitle } = getEnv();
const currentYear = dayjs().subtract(3, 'month').format('YYYY');
</script>

<style lang="less" scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  background-color: #aaa;
  background-image: url('/src/assets/images/layout/auth-bg.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .main-content {
    width: 100%;
    height: 0px;
    flex: 1;
    padding: 0px 18%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .welcome-box {
      height: 377px;

      .logo {
        width: 40px;
        margin-bottom: 10px;
      }

      .welcome-words,
      .system-title {
        font-size: 30px;
        color: #ffffff;
        font-weight: bold;
      }
    }

    .login-box {
      width: 410px;
      padding: 30px 40px;
      border-radius: 10px;
      box-shadow: 0px 6px 12px 0px rgba(7, 17, 27, 0.06);
      background-color: rgba(255, 255, 255, 0.1);

      .header-area {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;

        .logo {
          width: 40px;
          margin-right: 10px;
        }

        .system-title {
          font-size: 26px;
          color: #ffffff;
          font-weight: 600;
        }
      }
    }
  }

  .footer {
    width: 100%;
    height: 80px;
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
}
</style>
