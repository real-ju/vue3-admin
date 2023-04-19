import type { LayoutSetting } from '/#/config';

import { MenuModeEnum } from '/@/enums/layoutEnum';

const setting: LayoutSetting = {
  // 菜单显示模式 可选SIDE|TOP|MIX
  menuMode: MenuModeEnum.SIDE,
  // MIX模式下隐藏一级菜单(显示上)的key集合
  hiddenMixTopMenuKeys: [],
  // 隐藏目录，并且将子菜单提升到与自己平级
  flatDirKeys: []
};

export default setting;
