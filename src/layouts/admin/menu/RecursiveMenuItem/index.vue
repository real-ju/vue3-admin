<template>
  <a-sub-menu :key="self.key" :title="self.title">
    <!-- <template v-if="self.icon" #icon>
      <Icon :name="self.icon!.name" :type="self.icon!.type" />
    </template> -->
    <template #icon>
      <Icon name="PieChartOutlined" />
    </template>
    <template v-for="item in subMenuTree" :key="item.key">
      <LRecursiveMenuItem v-if="item.children" :self="item" />
      <a-menu-item v-else :key="item.key">{{ item.title }}</a-menu-item>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts" name="LRecursiveMenuItem">
import type { MenuItem, MenuTree } from '/#/store';

const props = defineProps({
  self: {
    type: Object as PropType<MenuItem>,
    default: () => {
      return {};
    }
  }
});

const subMenuTree = ref<MenuTree>(props.self.children!);
</script>

<style lang="less" scoped></style>
