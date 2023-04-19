import type { MenuTree, MenuItem } from '/#/store';

import { router } from '/@/router';

/**
 * 查找等于key值的节点的路径
 */
export function generateMenuKeyPath(menuTree: MenuTree, key: string): string[] {
  let menuKeyPath: string[] = [];

  const generate = (menuTree: MenuTree, key: string): true | undefined => {
    for (let index = 0; index < menuTree.length; index++) {
      const menuNode = menuTree[index];
      menuKeyPath.push(menuNode.key);
      if (menuNode.key === key) {
        return true;
      }
      if (menuNode.children) {
        const rst = generate(menuNode.children, key);
        if (rst) {
          return rst;
        }
      }
      menuKeyPath.pop();
    }
  };

  generate(menuTree, key);

  return menuKeyPath;
}

/**
 * 根据keyPath查找菜单节点
 */
export function getMenuNodeFromKeyPath(menuTree: MenuTree, keyPath: string[]): MenuItem | null {
  if (keyPath.length === 0) {
    return null;
  }

  let currentMenuTree = menuTree;
  let rstNode;

  for (let index = 0; index < keyPath.length; index++) {
    const key = keyPath[index];
    const treeNode = currentMenuTree.find((item) => {
      return item.key === key;
    });
    if (index < keyPath.length - 1) {
      currentMenuTree = treeNode!.children!;
    } else {
      rstNode = treeNode;
    }
  }
  return rstNode || null;
}

/**
 * 获取菜单树第一个叶子节点
 */
export function getMenuFirstLeafNode(menuTree: MenuTree): MenuItem | null {
  let currentNode: any = { children: menuTree };
  while (currentNode.children) {
    if (currentNode.children.length === 0) {
      return null;
    }
    currentNode = currentNode.children[0];
  }
  return currentNode;
}

/**
 * 根据菜单key值跳转路由
 */
export function handleGoFromMenuKey(key: string) {
  if (key.indexOf('link:') === -1) {
    router.push({
      name: key
    });
  } else {
    const arr = key.split(':');
    arr.shift();
    window.open(arr.join(':'));
  }
}

/**
 * 跳转到菜单树第一个叶子节点
 */
export function goMenuFirstLeafNode(menuTree: MenuTree) {
  const node = getMenuFirstLeafNode(menuTree);
  if (node) {
    handleGoFromMenuKey(node.key);
  }
}
