<template>
  <div class="top-menu">
    <TreeMenu
      :menu-tree="showMenuTree"
      mode="horizontal"
      :theme="theme"
      :selected-keys="selectedKeys"
      @menu-click="onMenuClick"
    >
    </TreeMenu>
  </div>
</template>

<script setup lang="ts" name="LTopMenu">
import TreeMenu from '../TreeMenu/index.vue';
import { useLayoutStore } from '/@/store/modules/layout';
import { MenuModeEnum } from '/@/enums/layoutEnum';
import { goMenuFirstLeafNode, handleGoFromMenuKey } from '/@/logics/helper/layout';
import layoutSetting from '/@/settings/layoutSetting';

import type { MenuTree } from '/#/store';

const layoutStore = useLayoutStore();

const menuTree = layoutStore.menuTree;

const { menuMode, currentTopMenuKey, selectedMenuKey } = storeToRefs(layoutStore);

const showMenuTree = computed(() => {
  if (menuMode.value === MenuModeEnum.TOP) {
    return menuTree;
  } else if (menuMode.value === MenuModeEnum.MIX) {
    const tree: MenuTree = [];
    const { hiddenMixTopMenuKeys } = layoutSetting;
    menuTree.forEach((item) => {
      // const isDir = item.key.indexOf('dir:') === 0;
      // const key = isDir ? item.key.split(':')[1] : item.key;
      if (hiddenMixTopMenuKeys.indexOf(item.key) === -1) {
        const node = {
          ...item
        };
        if (node.children) {
          Reflect.deleteProperty(node, 'children');
        }
        tree.push(node);
      }
    });
    return tree;
  } else if (menuMode.value === MenuModeEnum.SIDE) {
    return [];
  }
});

const selectedKeys = computed(() => {
  if (menuMode.value === MenuModeEnum.MIX) {
    return currentTopMenuKey.value ? [currentTopMenuKey.value] : [];
  } else {
    return selectedMenuKey.value ? [selectedMenuKey.value] : [];
  }
});

const theme = computed(() => {
  return menuMode.value === MenuModeEnum.MIX ? 'dark' : 'light';
});

const onMenuClick = ({ item, key, keyPath }: any) => {
  if (menuMode.value === MenuModeEnum.TOP) {
    handleGoFromMenuKey(key);
  } else if (menuMode.value === MenuModeEnum.MIX) {
    const treeNode = menuTree.find((item) => {
      return item.key === key;
    });
    if (treeNode?.children) {
      goMenuFirstLeafNode(treeNode.children);
    } else {
      handleGoFromMenuKey(treeNode!.key);
    }
  }
};
</script>

<style lang="less" scoped>
.top-menu {
  width: 100%;
  height: 100%;

  :deep {
    .ant-menu-horizontal {
      border-bottom: none;
    }
  }
}
</style>
