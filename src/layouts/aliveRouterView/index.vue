<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :exclude="cacheInclude">
      <component
        :is="route.meta.cache === false ? Component : warpRouteComponent(Component, route)"
        :key="route.fullPath"
      />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts" name="LAliveRouterView">
import type { VNode, Component } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

import { useLayoutStore } from '/@/store/modules/layout';

const routeCacheComponentMap = new Map();

// 包装路由组件，修改组件名与fullPath关联，用于清空keep-alive缓存
const warpRouteComponent = (component: VNode, route: RouteLocationNormalizedLoaded) => {
  const wrapperMap = routeCacheComponentMap;
  const wrapperName = 'RouteCacheComponent_' + route.fullPath;
  let wrapper: Component;
  if (wrapperMap.has(wrapperName)) {
    wrapper = wrapperMap.get(wrapperName);
  } else {
    wrapper = {
      name: wrapperName,
      render() {
        return component;
      }
    };
    wrapperMap.set(wrapperName, wrapper);
  }
  return wrapper;
};

const layoutStore = useLayoutStore();

const cacheInclude = computed(() => {
  const routeArr = Array.from(layoutStore.cachedRoutes);
  return routeArr.map((fullPath) => {
    return 'RouteCacheComponent_' + fullPath;
  });
});
</script>
