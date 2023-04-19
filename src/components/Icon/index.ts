import type { FunctionalComponent } from 'vue';
import SvgIcon from './src/SvgIcon/index.vue';
import * as AntIcons from '@ant-design/icons-vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import projectSetting from '/@/settings/projectSetting';

const IconFont = createFromIconfontCN({
  scriptUrl: projectSetting.iconfontUrl
});

interface Props {
  type: 'ant' | 'iconfont' | 'svg';
  name: string;
}

const Icon: FunctionalComponent<Props> = (props: Props) => {
  const { type = 'ant', name } = props;

  if (type === 'ant') {
    return h((AntIcons as Recordable)[name]);
  } else if (type === 'iconfont') {
    return h(IconFont, { type: name });
  } else if (type === 'svg') {
    return h(SvgIcon, { name: name });
  }
};

export default Icon;
