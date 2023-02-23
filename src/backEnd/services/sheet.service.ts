import sheetRepository from "../repositories/sheet.repository";
import sheetAuthservice from "../auth/sheet.authservice";
import userService from "./user.service";
interface sheetProps {
  id: string;
  owner: string;
  tiposDeGastos: string[];
  totalValue: number;
  type: string;
  name:string;
}
async function getAllSheets() {
  return await sheetRepository.getSheets();
}
async function createSheet(newSheet) {
  const sheet:sheetProps = await sheetRepository.createSheet(newSheet);
  await userService.addSheetIntoTheList(sheet.owner, sheet.id);
  return  await getSheetById(sheet.id, sheet.owner)
}
async function getSheetById(sheetId: string, email: string) {
  if (await sheetAuthservice.authenticate(email, sheetId)) {
    const sheetData = await sheetRepository.getSheetById(sheetId);
    const sessionData = await sheetAuthservice.getSessionData(email, sheetId);
    return {
      data: {
        ...sheetData,
      },
      session: {
        ...sessionData,
      },
    };
  } else {
    return {
        session: {
            authenticated: false,
        }
    }
  }
}
async function deleteSheet(sheetId: string, email: string) {
  async function removeSheetFromTheLists() {
    const users = await sheetAuthservice.getUsers(sheetId);
    let requests = [];
    users.forEach((user) =>
      requests.push(userService.removeSheetFromTheList(user.email, sheetId))
    );
    await Promise.all(requests);
  }
  if(await sheetRepository.sheetExists(sheetId)){
    if (await sheetAuthservice.checkPermission(email, sheetId, "canDelete")) {
      await removeSheetFromTheLists()
      return await sheetRepository.deleteSheet(sheetId);
    } else {
      throw new Error ("ERRO: 401, somente ROLE: owner pode deletar!")
    } 
  } else {
    throw new Error('Planilha não existe!')
  }
}
async function updateSheet(updatedSheet: sheetProps, email: string) {
  if (
    await sheetAuthservice.checkPermission(
      email,
      updatedSheet.id,
      "canManageSheetProps"
    )
  ) {
    return await sheetRepository.updateSheet(updatedSheet);
  } else {
    throw new Error("ERRO: 401, Não possui role para atualizar planilha.");
  }
}
export default {
  getAllSheets,
  createSheet,
  getSheetById,
  deleteSheet,
  updateSheet,
};
