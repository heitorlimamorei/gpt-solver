import sheetAuthservice from "../auth/sheet.authservice";
import userRepository from "../repositories/user.repository";
interface userProps {
  id: string;
  sheetIds: string[];
  name: string;
  email: string;
}
interface newUser {
  name: string;
  email: string;
}
async function getUserByEmailOrCreateOne(currentUser: newUser) {
  if (currentUser.email === undefined) throw new Error(`Dados não suportados`);
  const user = await userRepository.getUserByEmail(currentUser.email);
  if (user) {
    return user;
  } else {
    return await userRepository.createUser(currentUser);
  }
}
async function getAllUsers() {
  return await userRepository.getAllUsers();
}
async function addSheetIntoTheList(email: string, sheetId: string) {
  const user: userProps = await userRepository.getUserByEmail(email);
  if (user) {
    if (user.sheetIds.findIndex((currentId) => currentId === sheetId) < 0) {
      if (await sheetAuthservice.authenticate(email, sheetId)) {
        let sheetIdsUpdated = [sheetId, ...user.sheetIds];
        return await userRepository.updateSheetList(user.id, sheetIdsUpdated);
      } else {
        throw new Error(`USER: ${user.email} is not authenticated in ${sheetId} sheet.`)
      }
    } else {
      throw new Error(`SheetId already add into the list!`);
    }
  } else {
    throw new Error("User not found");
  }
}
async function removeSheetFromTheList(email: string, sheetId: string) {
  const user: userProps = await userRepository.getUserByEmail(email);
  if (user) {
    let sheetIdsUpdated = user.sheetIds.filter((id) => sheetId !== id);
    return await userRepository.updateSheetList(user.id, sheetIdsUpdated);
  } else {
    throw new Error("User not found");
  }
}
async function updateUser(user: userProps) {
  if (
    user.email !== undefined &&
    user.name !== undefined &&
    user.id !== undefined &&
    user.sheetIds !== undefined
  ) {
    return await userRepository.updateUser(user);
  }
}
async function deleteUser(id: string) {
  await userRepository.deleteUser(id);
}
export default {
  getUserByEmail: getUserByEmailOrCreateOne,
  getAllUsers,
  addSheetIntoTheList,
  removeSheetFromTheList,
  updateUser,
  deleteUser,
};
