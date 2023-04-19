<template>
  <router-view v-slot="{ Component, route }">
    <component v-if="route.meta.keepAlive === false" :is="Component" :key="route.fullPath" />
    <keep-alive v-else>
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts" name="LAliveRouterView"></script>
