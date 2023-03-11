import ItemService from "../services/Item.service";
interface newItemProps {
  name: string;
  description: string;
  value: number;
  author: string;
  sheetId: string;
  type: string;
}
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
function isValidNewItemProps(item: newItemProps) {
  if (
    item.name &&
    item.value &&
    item.author &&
    item.sheetId &&
    item.type
  ) {
    return true;
  } else {
    return false;
  }
}
function isValidItemProps(item: ItemProps) {
  if (
    item.name &&
    item.value &&
    item.author &&
    item.sheetId &&
    item.type &&
    item.id
  ) {
    return true;
  } else {
    return false;
  }
}
async function createNewItem(newItem: newItemProps, email: string) {
  try {
    if (isValidNewItemProps(newItem)) {
      return await ItemService.createItem(newItem, email);
    } else {
      throw new Error("ERRO: Cannot create new item( item out of format )");
    }
  } catch (err) {
    throw err;
  }
}
async function updateItem(item: ItemProps, email: string) {
  try {
    if (isValidItemProps(item)) {
      return ItemService.updateItem(item, email);
    } else {
      throw new Error("ERRO: Cannot update  item( item out of format )");
    }
  } catch (err) {
    throw err;
  }
}
export default {
    updateItem,
    createNewItem
}