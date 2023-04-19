import type { RouteRecordRaw } from 'vue-router';

// import { BasicPageEnum } from '/@/enums/pageEnum';

const modules = import.meta.glob('./modules/**/*.ts', { eager: true });

const routeRecordList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const module = modules[key] as any;
  const mod = module.default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeRecordList.push(...modList);
});

const rootRoute: RouteRecordRaw | any = {
  path: '/',
  name: 'root',
  // redirect: BasicPageEnum.HOME,
  meta: {
    title: 'Root',
    public: false
  }
};
export default [rootRoute, ...routeRecordList];
