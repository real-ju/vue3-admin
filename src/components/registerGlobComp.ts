import type { App } from 'vue';

import {
  ConfigProvider,
  Button,
  Menu,
  Dropdown,
  Tabs,
  Form,
  Input,
  Spin,
  Result,
  TreeSelect
} from 'ant-design-vue/es';

import Icon from './Icon';

export function registerGlobComp(app: App) {
  // antd components register
  app.component(ConfigProvider.name, ConfigProvider);
  app.component(Button.name, Button);
  app.component(Menu.name, Menu);
  app.component(Menu.Item.name, Menu.Item);
  app.component(Menu.SubMenu.name, Menu.SubMenu);
  app.component(Dropdown.name, Dropdown);
  app.component(Tabs.name, Tabs);
  app.component(Tabs.TabPane.name, Tabs.TabPane);
  app.component(Form.name, Form);
  app.component(Form.Item.name, Form.Item);
  app.component(Input.name, Input);
  app.component(Input.Password.name, Input.Password);
  app.component(Spin.name, Spin);
  app.component(Result.name, Result);
  app.component(TreeSelect.name, TreeSelect);

  // common components register
  app.component('Icon', Icon);
}
