import itemRepository from "../repositories/item.repository";
import sheetAuthservice from "../auth/sheet.authservice";
import sheetRepository from "../repositories/sheet.repository";
interface ItemProps {
  id: string;
  name: string;
  description: string;
  date: any;
  value: number;
  author: string;
  sheetId: string;
  type: string;
}
interface newItemProps {
  name: string;
  description: string;
  value: number;
  author: string;
  sheetId: string;
  type: string;
}
async function createItem(newItem: newItemProps, email: string) {
  if (
    await sheetAuthservice.checkPermission(
      email,
      newItem.sheetId,
      "canEditItems"
    )
  ) {
    return (await itemRepository.createItem(newItem))
  } else {
    throw new Error(
      "ERRO: 401, Não possui role para editar os itens da planilha."
    );
  }
}
async function getItemById(sheetId: string, itemId: string) {
  return await itemRepository.getItemById(sheetId, itemId);
}
async function getItems(sheetId: string, email: string) {
  if (await sheetAuthservice.authenticate(email, sheetId)) {
    return await itemRepository.getItems(sheetId);
  } else {
    throw new Error("ERRO: 401, Seu email não pode ser autenticado.");
  }
}
async function updateItem(item: ItemProps, email: string) {
  if (
    await sheetAuthservice.checkPermission(email, item.sheetId, "canEditItems")
  ) {
    return (await itemRepository.updateItem(item))
  } else {
    throw new Error(
      "ERRO: 401, Não possui role para editar os itens da planilha."
    );
  }
}
async function deleteItem(itemId: string, sheetId: string, email: string) {
  if (await sheetAuthservice.checkPermission(email, sheetId, "canEditItems")) {
    return await itemRepository.deleteItem(sheetId, itemId);
  } else {
    throw new Error(
      "ERRO: 401, Não possui role para editar os itens da planilha."
    );
  }
}
async function cloneItemsFromForeignSheet(
  foreignId: string,
  sheetId: string,
  email: string
) {
  if(foreignId === sheetId) throw new Error('Não é possivel uma planilha se clonar!')
  if(!await sheetRepository.sheetExists(foreignId)) throw new Error('Planilha extrangeira não existe!')
  if (await sheetAuthservice.authenticate(email, sheetId) && await sheetAuthservice.authenticate(email, foreignId)) {
    let foreignItems = await itemRepository.getItems(foreignId);
    for (let item of foreignItems) {
      await itemRepository.createForeignItem(item, sheetId);
    }
  } else {
    throw new Error('Autenticação falhou!')
  }
}
export default {
  createItem,
  getItemById,
  getItems,
  updateItem,
  deleteItem,
  cloneItemsFromForeignSheet,
};
