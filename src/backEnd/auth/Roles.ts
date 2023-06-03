const roles = [
  {
    name: "owner",
    permissions: {
      canView: true,
      canDelete: true,
      canEditItems: true,
      canEditUsers: true,
      canManageSheetProps: true,
    },
  },
  {
    name: "admin",
    permissions: {
      canView: true,
      canDelete: false,
      canEditItems: true,
      canEditUsers: true,
      canManageSheetProps: true,
    },
  },
  {
    name: "editor",
    permissions: {
      canView: true,
      canDelete: false,
      canEditItems: true,
      canEditUsers: false,
      canManageSheetProps: false,
    },
  },
  {
    name: "viewer",
    permissions: {
      canView: true,
      canDelete: false,
      canEditItems: false,
      canEditUsers: false,
      canManageSheetProps: false,
    },
  },
];
function getRoleData(roleName: string){
  return roles.find(role => role.name === roleName);
}
function verifyPermissionsByRole(currentRole, neededPermission){
    return getRoleData(currentRole).permissions[neededPermission]
}
export default {
  roles,
  verifyPermissionsByRole,
  getRoleData
};
