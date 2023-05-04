import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    // 标题
    title: string;

    // 是否为开放页面（无需登录授权）
    public?: boolean;

    // 是否隐藏页面标题后缀
    hideTitleSuffix?: boolean;

    // 子路由匹配选中菜单的key值，默认使用路由name匹配
    menuMatchKey?: string;

    // 允许自动添加页签
    allowTabControl?: boolean;

    // 路由缓存
    cache?: boolean;
  }
}
