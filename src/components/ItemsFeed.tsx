import React, { memo, useCallback } from "react";
import CardItem from "./CardItem";
import { itemRenderOptions, sheetItemProps } from "../types/sheetTypes";
import useSheets from "../data/hook/useSheets";

interface ItemsFeedProps {
  itemsRenderOptions: itemRenderOptions;
  setEditMode: (c: sheetItemProps) => void;
}

const ItemsFeed = (props:ItemsFeedProps) => {
  const { itemsRenderOptions, setEditMode } = props;
  const {
    sheet,
    filterByDescription,
    filterByName,
    filterBySpentType,
    getSortedItems,
  } = useSheets();

  const renderItems = useCallback(() => {
    const { name, description, type, sortMode } = itemsRenderOptions;
    const itemsReady = filterByDescription(
      description,
      filterByName(name, filterBySpentType(type, getSortedItems(sortMode)))
    );
    return itemsReady.map((item) => (
      <CardItem key={item.id} item={item} setEditMode={setEditMode} />
    ));
  }, [sheet, itemsRenderOptions]);

  return (
    <div>
      <ul className="flex flex-wrap mt-4 w-full transition-all duration-500 ease-linear">
        {renderItems()}
      </ul>
    </div>
  );
};

export default memo(ItemsFeed);
