const generateGroupPermissions = (path) => {
  return {
    all: `a:${path}`,
    create: `c:${path}`,
    read: `r:${path}`,
    update: `u:${path}`,
    delete: `d:${path}`,
  };
};

export const PERMS = {
  users: generateGroupPermissions('users'),
  roles: generateGroupPermissions('roles'),
  permissions: generateGroupPermissions('permissions'),
};
