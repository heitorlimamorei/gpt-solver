import userRepository from "../repositories/user.repository";
interface userProps {
  id: string;
  sheetIds: string[];
  name: string;
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
      let sheetIdsUpdated = [sheetId, ...user.sheetIds];
      await userRepository.updateSheetList(user.id, sheetIdsUpdated);
    } else {
      throw new Error(`SheetId already add into the list!`)
    }
  } else {
    throw new Error("User not found");
  }
}

async function removeSheetFromTheList(email: string, sheetId: string) {
  const user: userProps = await userRepository.getUserByEmail(email);
  if (user) {
    let sheetIdsUpdated = user.sheetIds.filter(id => sheetId !== id);
    await userRepository.updateSheetList(user.id, sheetIdsUpdated);
  } else {
    throw new Error("User not found");
  }
}
export default {
  getUserByEmail: getUserByEmailOrCreateOne,
  getAllUsers,
  addSheetIntoTheList,
  removeSheetFromTheList,
};
