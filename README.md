# Vue3 + Ant Design

### 安装

- vscode 安装工作区推荐的插件
- .vscode/settings.json 为工作区设置，不建议覆盖已有配置（可添加其他配置）

### 多人开发过程中你禁止修改的文件

- ts，eslint，prettier 相关配置文件
- build 文件夹下的配置文件

如果需要修改，请自行协商，否则可能会出现代码冲突

### 代码格式化

- js，ts 文件：通过 vscode 的 eslint 插件，在保存时自动 fix
- 其他文件：保存时使用 prettier 插件格式化
- 代码提交时会执行格式化校验

### 环境变量

用于整个项目的参数，包括编译阶段+运行时用到的参数

在运行时使用环境变量：utils/env -> getEnv()

- .env 通用
- .env.development 本地开发环境
- .env.production 生产环境
- .env.test 预发布环境

### 文件夹结构和命名

- 除了组件，都使用首字母小写的驼峰式命名
- 组件需要使用文件夹包裹起来，且采用首字母大写的驼峰式命名（为了方便在 setup 中使用：https://cn.vuejs.org/api/sfc-script-setup.html#using-components）

### 别名

- /@/xxxx => /src/xxxx
- /#/xxxx => /types/xxxx

### HTTP 请求库

/@/utils/http/axios -> httpRequester

- 初始化配置：index -> createRequester 中传入 RequestOptions，所有配置参考 config 文件
- 发起请求单独配置（优先级最高）：get/post/put/delete 第二个参数传入 RequestOptions

配置优先级：发起请求配置 > createRequester 配置 > config 文件配置 > axios 配置

### 全局组件注册

- 需要在 components/registerGlobComp 中手动注册
- 引入 antd 组件也要在 design 中引入组件的样式文件

### 关于引用 Ant Design 中的资源路径

需要全部在 ant-design-vue/es 下引用 ESM，可以加快 vite 的预编译

### 图标

使用 Icon 组件，有三种类型，通过 type 属性定义

- ant antd 图标库
- iconfont 阿里巴巴图标库
- svg 本地 svg 资源，name 值格式为[dir]-[name]

### 主题

- 组件库主题：design/theme/xxx/antd 中定义组件库 less 变量覆盖默认变量
- 其他全局主题：design/theme/xxx/global 中定义 less 变量，在需要的地方引用该文件

### 一些特殊文件夹含义

- enums：TS 枚举值
- logics：与业务和框架耦合的全局逻辑代码
- settings：运行时的参数设置
- utils：完全通用的工具代码（可直接拖到其他项目也能使用）
- hooks：Vue3 Hooks

### 菜单和路由的配置

菜单和路由完全解耦，所有路由在前端控制，菜单和权限在统一权限管理平台控制

### 路由配置 meta 说明

见 types/vue-router.d.ts

### 菜单配置规则

在权限管理中配置，详细如下

#### 添加菜单目录

添加权限，类型选“菜单”，权限编码格式为“dir:xxx”（xxx 为菜单目录标识）

#### 添加菜单项

添加权限，类型选“菜单”，权限编码有两种情况：

- 菜单项点击后跳转到系统内路由，则为前端路由记录的 name 值
- 菜单项点击后跳转到外链，则格式为“link:xxx”（xxx 为 http/https 外链地址）

#### 添加非菜单的路由权限

比如个人中心这样不会在菜单上显示的路由

- 1.添加路由组：添加权限，类型选“模块”，权限编码格式为“module:xxx”（xxx 为路由组标识）
- 2.添加路由权限：在路由组下添加权限，类型选“模块”，权限编码格式为前端路由记录的 name 值

#### 添加功能点权限（按钮权限）

功能点权限是路由权限下的子权限

在“菜单项”或者“路由权限”下添加权限，类型选“按钮”，权限编码格式(建议)为“xxx:yyy”（xxx 为父级路由权限编码，yyy 为功能点标识）

#### 隐藏菜单

- 权限状态改为禁用
- 隐藏菜单目录，并且将子菜单提升到与自己平级（只是在 UI 上隐藏）：在 settings/layoutSetting -> flatDirKeys 数组中添加需要 flat 的菜单目录权限编码

#### 注意

- 菜单标识符和路由 name 都建议带上父级名，使用“-”分割，避免命名冲突
