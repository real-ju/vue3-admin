<template>
  <router-view v-slot="{ Component, route }">
    <component v-if="route.meta.cache === false" :is="Component" :key="route.fullPath" />
    <keep-alive v-else :exclude="cacheExclude">
      <component :is="warpRouteComponent(Component, route)" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts" name="LAliveRouterView">
import type { VNode, Component } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

import { useLayoutStore } from '/@/store/modules/layout';

const routeCacheComponentMap = new Map();

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

const cacheExclude = computed(() => {
  const routeArr = Array.from(layoutStore.willClearCacheRoute);
  return routeArr.map((fullPath) => {
    return 'RouteCacheComponent_' + fullPath;
  });
});
</script>
