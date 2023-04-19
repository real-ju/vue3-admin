<template>
  <div class="tree-menu" :class="{ 'horizontal-mode': mode === 'horizontal' }">
    <a-menu
      :mode="mode"
      :theme="theme"
      :selected-keys="selectedKeys"
      :open-keys="openKeys"
      :inline-collapsed="inlineCollapsed"
      @click="onMenuClick"
    >
      <template v-for="item in menuTree" :key="item.key">
        <RecursiveMenuItem v-if="item.children" :self="item" />
        <a-menu-item v-else :key="item.key">
          <!-- <template v-if="item.icon" #icon>
            <Icon :name="item.icon!.name" :type="item.icon!.type" />
          </template> -->
          <template #icon>
            <Icon name="PieChartOutlined" />
          </template>
          <span>{{ item.title }}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script setup lang="ts" name="LTreeMenu">
import type { MenuTree } from '/#/store';

import RecursiveMenuItem from '../RecursiveMenuItem/index.vue';

const props = defineProps({
  menuTree: {
    type: Object as PropType<MenuTree>,
    default: () => {
      return [];
    }
  },
  mode: {
    type: String,
    default: 'inline'
  },
  theme: {
    type: String,
    default: 'light'
  },
  selectedKeys: {
    type: Object as PropType<string[]>,
    default: () => {
      return [];
    }
  },
  openKeys: {
    type: Object as PropType<string[]>,
    default: () => {
      return [];
    }
  },
  inlineCollapsed: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['menuClick']);

const onMenuClick = (info: any) => {
  emit('menuClick', info);
};
</script>

<style lang="less" scoped>
.tree-menu {
  width: 100%;

  &.horizontal-mode {
    height: 100%;

    :deep {
      .ant-menu {
        height: 100%;
      }
    }
  }
}
</style>
