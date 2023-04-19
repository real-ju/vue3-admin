import { usePermissionStore } from '/@/store/modules/permission';

export function checkPermission(permissions: string | string[]): boolean {
  const permissionStore = usePermissionStore();
  const actionPermissions = permissionStore.actionPermissions;

  if (Array.isArray(permissions)) {
    return permissions.every((item) => actionPermissions.includes(item));
  } else {
    return actionPermissions.includes(permissions);
  }
}
