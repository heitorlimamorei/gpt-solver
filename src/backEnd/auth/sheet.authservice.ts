import sheetAuthrepo from "./sheet.authrepo";
import RolesService from "./Roles";
import Roles from "./Roles";

interface userProps {
  email: string;
  role: string;
  id: string;
}
interface newUser {
  email: string;
  role: string;
  sheetId: string;
}

async function findUserByEmail(email: string, sheetId: string) {
  return await sheetAuthrepo.getUsersByEmail(sheetId, email);
}
async function authenticate(email: string, sheetId: string) {
  const findUser = await findUserByEmail(email, sheetId);
  if (findUser) {
    return true;
  } else {
    return false;
  }
}
async function checkPermission(
  email: string,
  sheetId: string,
  neededPermission: string
) {
  const findUser = await findUserByEmail(email, sheetId);
  if (findUser) {
    return RolesService.verifyPermissionsByRole(
      findUser.role,
      neededPermission
    );
  } else {
    return false;
  }
}
async function getSessionData(email: string, sheetId: string) {
  const user: userProps = await findUserByEmail(email, sheetId);
  const permissions = Roles.getRoleData(user.role).permissions;
  return {
    authenticated: true,
    role: user.role,
    ...permissions,
  };
}
async function createUser(newUser: newUser) {
  if (!(await userAlreadyExists(newUser.sheetId, newUser.email))) {
    if(newUser.role !== Roles.roles[0].name){
      return await sheetAuthrepo.createUser(newUser);
    } else {
      throw new Error(`User role: ${newUser.role} not allowed!`)
    }
  } else {
    throw new Error(`User ${newUser.email} already exists!`)
  }
}
async function deleteUser(sheetId: string, userId: string) {
  return await sheetAuthrepo.deleteUser(sheetId, userId);
}
async function updateUser(user: userProps, sheetId: string) {
  return (await sheetAuthrepo.updateUser(user, sheetId))[0];;
}
async function getUsers(sheetId: string) {
  return await sheetAuthrepo.getUsers(sheetId);
}
async function getUser(sheetId: string, userId: string) {
  return await sheetAuthrepo.getUserById(sheetId, userId);
}
async function userAlreadyExists(sheetId: string, email: string) {
  const users = await getUsers(sheetId);
  return users.find((user) => user.email === email);
}
export default {
  authenticate,
  checkPermission,
  getSessionData,
  createUser,
  deleteUser,
  updateUser,
  getUsers,
  getUser,
};
