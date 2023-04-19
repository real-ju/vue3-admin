import type { MenuTree } from '/#/store';
import type { Ref } from 'vue';

/**
 * @param filterKey 用于筛选key值等于filterKey的一级菜单下的二级菜单
 */
export function useSiderMenu(menuTree: MenuTree, filterKey: Ref, selectedMenuKeyPath: Ref) {
  const showMenuTree = ref<MenuTree>([]);
  const selectedKeys = ref<string[]>([]);
  const openKeys = ref<string[]>([]);

  watchEffect(() => {
    if (!filterKey.value) {
      showMenuTree.value = menuTree;
      return;
    }

    const node = menuTree.find((item) => {
      return item.key === filterKey.value;
    });

    showMenuTree.value = node?.children || [];
  });

  watchEffect(() => {
    let dirKeyPath = selectedMenuKeyPath.value.slice(0, selectedMenuKeyPath.value.length - 1);
    if (filterKey.value) {
      dirKeyPath = dirKeyPath.slice(1);
    }
    openKeys.value = dirKeyPath;

    const selectedMenuKey = selectedMenuKeyPath.value[selectedMenuKeyPath.value.length - 1] || '';
    selectedKeys.value = selectedMenuKey ? [selectedMenuKey] : [];
  });

  return { showMenuTree, selectedKeys, openKeys };
}
