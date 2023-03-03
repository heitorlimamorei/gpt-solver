import {
  sheetItemProps,
  NewSheetProps,
  newSheetItemProps,
  shortingTypes,
  NewUserProps,
  userProps,
  sheetProps,
  upadatedSheetProps,
} from "../../types/sheetTypes";
import _ from "lodash";
import axios from "axios";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useSheetsCtx from "./useSheetsCtx";
export default function useSheets() {
  const session = useSession();
  const { state, dispatch } = useSheetsCtx();
  const email = session.data?.user.email;
  useEffect(() => {
    if (email) {
      onChangeUser(email);
    }
  }, [email]);
  async function createNewSheet(payload: NewSheetProps) {
    const { data: sheet } = await axios.post(
      "http://localhost:3000/api/sheets",
      {
        ...payload,
      }
    );
    const { data: items } = await axios.post(
      `http://localhost:3000/api/sheets/${sheet.data.id}/items`,
      {
        email: sheet.data.owner,
        mode: "GET",
      }
    );
    const { data: users } = await axios.get(
      `http://localhost:3000/api/sheets/${sheet.data.id}/auth`
    );
    dispatch({
      type: "create",
      payload: {
        sheet,
        items,
        users,
      },
    });
  }
  async function updateSheet(updatedSheet: upadatedSheetProps) {
    const finalUpdatedSheet = {
      ...state.data,
      name: updatedSheet.name,
      totalValue: updatedSheet.totalValue,
      tiposDeGastos: updatedSheet.tiposDeGastos,
    };
    const { data: updatedsheetf } = await axios.put(
      `http://localhost:3000/api/sheets`,
      {
        email: state.currentUser,
        ...finalUpdatedSheet,
      }
    );
    dispatch({ type: "onUpdate", payload: updatedsheetf });
  }
  async function loadSheet(id: string) {
    const { data: sheet } = await axios.post(
      `http://localhost:3000/api/sheets/${id}`,
      {
        email: state.currentUser,
        mode: "GET",
      }
    );
    const { data: items } = await axios.post(
      `http://localhost:3000/api/sheets/${id}/items`,
      {
        email: state.currentUser,
        mode: "GET",
      }
    );
    const { data: users } = await axios.get(
      `http://localhost:3000/api/sheets/${id}/auth`
    );
    dispatch({
      type: "refresh",
      payload: {
        sheet,
        items,
        users,
      },
    });
  }
  async function loadSheetByUserSeletion(
    seletedSheet: sheetProps
  ): Promise<void> {
    const { data: items } = await axios.post(
      `http://localhost:3000/api/sheets/${seletedSheet.data.id}/items`,
      {
        email: state.currentUser,
        mode: "GET",
      }
    );
    const { data: users } = await axios.get(
      `http://localhost:3000/api/sheets/${seletedSheet.data.id}/auth`
    );
    dispatch({
      type: "refresh",
      payload: {
        sheet: seletedSheet,
        items: items,
        users: users,
      },
    });
  }
  async function refreshSheet() {
    await loadSheet(state.data.id);
  }
  async function refreshItems() {
    const { data: items } = await axios.post(
      `http://localhost:3000/api/sheets/${state.data.id}/items`,
      {
        email: state.currentUser,
        mode: "GET",
      }
    );
    dispatch({ type: "refreshItems", payload: items });
  }
  async function createUser(newUser: NewUserProps) {
    const { data: users } = await axios.post(
      `localhost:3000/api/sheets/${state.data.id}/auth`,
      {
        ...newUser,
      }
    );
    dispatch({ type: "refreshUsers", payload: users });
  }
  async function updateUser(user: userProps) {
    const { data: users } = await axios.put(
      `localhost:3000/api/sheets/${state.data.id}/auth`,
      {
        ...user,
      }
    );
    dispatch({ type: "refreshUsers", payload: users });
  }
  async function deleteUser(user: userProps) {
    const { data: users } = await axios.delete(
      `http://localhost:3000/api/sheets/${state.data.id}/auth/${user.id}`
    );
    dispatch({ type: "refreshUsers", payload: users });
  }
  async function deleteItem(id: string) {
    const { data: items } = await axios.post(
      `http://localhost:3000/api/sheets/${state.data.id}/items/${id}`,
      {
        email: state.currentUser,
        mode: "DELETE",
      }
    );
    dispatch({ type: "refreshItems", payload: items });
  }
  function onChangeUser(newUser: string) {
    dispatch({ type: "onChangeUser", payload: newUser });
  }
  async function createNewItem(newItem: newSheetItemProps) {
    const { data: items } = await axios.post(
      `http://localhost:3000/api/sheets/${state.data.id}/items`,
      {
        email: state.currentUser,
        mode: "POST",
        newItem: newItem,
      }
    );
    dispatch({ type: "refreshItems", payload: items });
  }
  async function updateItem(item: sheetItemProps) {
    const { data: items } = await axios.put(
      `http://localhost:3000/api/sheets/${state.data.id}/items`,
      {
        method: "PUT",
        email: state.currentUser,
        item: {
          ...item,
        },
      }
    );
    dispatch({ type: "refreshItems", payload: items });
  }
  function sumAllItems(): number {
    return _.sumBy(state.items, (item: sheetItemProps) =>
      typeof item.value === "number" ? item.value : parseFloat(item.value)
    );
  }
  function getBalance() {
    return Number((state.data.totalValue - sumAllItems()).toFixed(2));
  }
  function getSortedItems(sortType: shortingTypes) {
    function sortDatesAscending(items: sheetItemProps[]) {
      let itemsReady = items.map((item) => {
        return {
          date: new Date(item.date.seconds * 1000),
          item: {
            ...item,
          },
        };
      });
      itemsReady = itemsReady.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      );
      return itemsReady.map(({ item }) => item);
    }
    function sortDatesDescending(items: sheetItemProps[]) {
      let itemsReady = items.map((item) => {
        return {
          date: new Date(item.date.seconds * 1000),
          item: {
            ...item,
          },
        };
      });
      itemsReady = itemsReady.sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      );
      return itemsReady.map(({ item }) => item);
    }
    switch (sortType) {
      case "ascending":
        return _.sortBy(state.items, (item: sheetItemProps) =>
          Number(item.value)
        );
      case "descending":
        return _.sortBy(
          state.items,
          (item: sheetItemProps) => -Number(item.value)
        );
      case "date ascending": // ordena datas que estão mais longe da data atual
        return sortDatesAscending(state.items);
      case "date descending":
        return sortDatesDescending(state.items); // ordena datas que estão mais perto da data atual
      default:
        return _.sortBy(
          state.items,
          (item: sheetItemProps) => -Number(item.value)
        );
    }
  }
  function filterByName(name: string, currentItems?: sheetItemProps[]) {
    const items = currentItems !== undefined ? currentItems : state.items;
    if (name.trim().length === 0) return items;
    return items.filter((item: sheetItemProps) => {
      const nameReady = name.toLowerCase().replace(/\s+/g, "");
      const currentNameReady = item.name.toLowerCase().replace(/\s+/g, "");
      return currentNameReady.includes(nameReady);
    });
  }
  function filterByDescription(
    description: string,
    currentItems?: sheetItemProps[]
  ) {
    const items = currentItems !== undefined ? currentItems : state.items;
    if (description.trim().length === 0) return items;
    return items.filter((item: sheetItemProps) => {
      if (item.description.trim().length === 0) return false;
      const descriptionReady = description.toLowerCase().replace(/\s+/g, "");
      const currentDescriptionReady = item.description
        .toLowerCase()
        .replace(/\s+/g, "");
      return currentDescriptionReady.includes(descriptionReady);
    });
  }
  function filterBySpentType(
    spentType: string,
    currentItems?: sheetItemProps[]
  ) {
    return _.filter(currentItems ?? state.items, (item: sheetItemProps) =>
      item.type.includes(spentType)
    );
  }
  function getStats() {
    const objAgrupado = _.groupBy(
      state.items,
      (item: sheetItemProps) => item.type
    );
    const arrayAgrupado = Object.entries(objAgrupado);
    return arrayAgrupado.map((type) => {
      let sumOfSpents = 0;
      type[1].forEach((item) => (sumOfSpents += item.value));
      return {
        name: type[0],
        value: Number(sumOfSpents.toFixed(2)),
        length: type[1].length,
      };
    });
  }
  return {
    sheet: state,
    createNewSheet,
    refreshSheet,
    onChangeUser,
    dispatch,
    refreshItems,
    loadSheet,
    loadSheetByUserSeletion,
    deleteItem,
    createNewItem,
    sumAllItems,
    getBalance,
    getSortedItems,
    updateItem,
    filterByName,
    filterByDescription,
    createUser,
    updateUser,
    deleteUser,
    filterBySpentType,
    getStats,
    updateSheet,
  };
}
