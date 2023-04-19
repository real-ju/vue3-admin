<template>
  <div v-show="treeData && treeData.length" class="organization-select">
    <a-tree-select
      v-model:value="organizationId"
      tree-node-label-prop="orgName"
      search-placeholder="切换组织"
      :get-popup-container="(triggerNode: HTMLElement) => triggerNode.parentNode"
      :dropdown-style="{ maxHeight: 300, maxWidth: 160 }"
      :dropdown-match-select-width="false"
      style="width: 100px; top: 1px; margin-left: 10px"
      :tree-data="treeData"
      :field-names="{
        children: 'child',
        label: 'orgName',
        value: 'orgId'
      }"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts" name="LOrganization">
import { useLayoutStore } from '/@/store/modules/layout';
import { useUserStore } from '/@/store/modules/user';
import { setUserOrganization } from '/@/api/auth';

interface treeDataNode {
  rootId?: string;
  orgId?: string;
  orgName?: string;
  child?: Array<treeDataNode>;
  enabled?: boolean;
  selectable?: boolean;
  class?: string;
}

const userStore = useUserStore();
const layoutStore = useLayoutStore();
const organizationId = ref(userStore.userCurrentOrgInfo.orgId);
const treeData = computed(() => {
  const change = (data: any[]) => {
    const newData = data.map((item) => {
      const obj: treeDataNode = { ...item };
      obj.selectable = obj.enabled;
      if (!obj.enabled) {
        obj.class = 'selected-disabled';
      }
      if (obj.child && obj.child.length) {
        obj.child = change(obj.child);
      }
      return obj;
    });
    return newData;
  };
  const orgList = change(userStore.getUserInfo.orgList || []);
  return orgList;
});
const onChange = function (value: string, label: Array<string>) {
  setUserOrganization({
    orgId: value,
    orgName: label.length ? label[0] : ''
  }).then((res) => {
    location.reload();
  });
  layoutStore.closeAllPageTabs();
};
</script>

<style lang="less" scoped>
.organization-select {
  :deep(.ant-select) {
    .ant-tree-select-dropdown {
      .ant-select-tree-treenode {
        .ant-select-tree-node-content-wrapper {
          .ant-select-tree-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
          }
        }
      }
    }

    .selected-disabled {
      > span.ant-select-tree-node-content-wrapper {
        cursor: not-allowed;
        color: rgba(0, 0, 0, 0.25);
        &:hover {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
