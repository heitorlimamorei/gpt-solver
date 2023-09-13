import { firestoreTimestampToDate, formatDate } from "../../utils/dateMethods";
import TimeLineItem from "./TimeLineItem";
import { memo, useCallback } from "react";
import useSheets from "../../data/hook/useSheets";
import _ from "lodash";
import { itemRenderOptions } from "../../types/sheetTypes";

const TimeLineFeed = ({ itemsRenderOptions }: {itemsRenderOptions: itemRenderOptions;}) => {
  const {
    sheet,
    filterByDescription,
    filterByName,
    filterBySpentType,
    getSortedItems,
  } = useSheets();

  const getItems = useCallback(() => {
    const { name, description, type, sortMode } = itemsRenderOptions;
    const itemsReady = filterByDescription(
      description,
      filterByName(name, filterBySpentType(type, getSortedItems(sortMode)))
    );
    return itemsReady;
  }, [sheet, itemsRenderOptions]);

  const getTimeLine = useCallback(() => {
    const items  = getItems();
    const getItemsByDate = () =>
      _.groupBy(items, (item) =>
        formatDate(firestoreTimestampToDate(item.date))
      );
    const agroupedItems = Object.entries(getItemsByDate()).map((item) => ({
      date: item[0],
      items: item[1],
    }));

    const sortCoefficient = itemsRenderOptions.sortMode == "date descending" ? -1 : 1;

    const sortItemsByDate = _.sortBy(agroupedItems, (day) => {
      const date: any = firestoreTimestampToDate(day.items[0].date);
      return date * sortCoefficient;
    });
    return sortItemsByDate;
  }, [getItems]);

  const renderTimeLine = useCallback(() => {
    const timeLine = getTimeLine();
    return timeLine.map(({ date, items }) => (
      <TimeLineItem key={date} date={date} items={items} />
    ));
  }, [getTimeLine]);

  return (
    <div>
      <ul>{renderTimeLine()}</ul>
    </div>
  );
};

export default memo(TimeLineFeed);
