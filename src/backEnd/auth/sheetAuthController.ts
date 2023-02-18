import sheetAuthservice from "./sheet.authservice";
interface newUserProps {
  email: string;
  role: string;
  sheetId: string;
}
interface userProps {
  email: string;
  role: string;
  id: string;
}
async function createUser(newUser: newUserProps) {
  try {
    if (newUser.role && newUser.email && newUser.sheetId) {
      return (await sheetAuthservice.createUser(newUser))[0];
    } else {
      throw new Error("Usuario fora do formato!");
    }
  } catch (err) {
    throw err;
  }
}
async function deleteUser(sheetId, userId) {
  try {
    if (sheetId && userId) {
      return await sheetAuthservice.deleteUser(sheetId, userId);
    } else {
      throw new Error("SHEETID e USERID são obrigatorios!");
    }
  } catch (err) {
    throw err;
  }
}
async function updateUser(user: userProps, sheetId) {
  try {
    if (sheetId && user.email && user.role && user.id) {
      return await sheetAuthservice.updateUser(user, sheetId);
    } else {
      throw new Error(
        "SHEETID, USERID, ROLE e ID são parametros obrigatorios!"
      );
    }
  } catch (err) {
    throw err;
  }
}
async function getUser(userId, sheetId) {
  try {
    if (userId && sheetId) {
      return await sheetAuthservice.getUser(sheetId, userId);
    }
  } catch (err) {
    throw err;
  }
}
async function getUsers(sheetId) {
  try {
    if (sheetId) {
      return await sheetAuthservice.getUsers(sheetId);
    }
  } catch (err) {
    throw err;
  }
}
export default {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getUsers,
};
