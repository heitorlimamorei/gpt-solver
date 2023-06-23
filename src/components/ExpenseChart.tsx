import { memo } from "react";
import _ from "lodash";
import { firestoreTimestampToDate } from "../utils/dateMethods";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useSheets from "../data/hook/useSheets";

interface ResultsChartProps{
  [key: string]: {
    receita: number;
    despesa: number;
  }
}

const ExpenseChart = () => {
  const { sheet } = useSheets();

 
  const getItemsData = () => {
    if(sheet.items.length === 0) return [];

    let currentItemsData = sheet.items.map((item) => {
      if (item.value < 0) {
        const newDate = firestoreTimestampToDate(item.date);
        const month = newDate.getMonth();
        const day = newDate.getDate();
  
        const date = `${day}/${month + 1}`;
  
       return({ date: {finalDate: date, objDate: newDate}, despesa: item.value, receita: 0 });
      }
      
      if (item.value > 0) {
        const newDate = firestoreTimestampToDate(item.date);
        const month = newDate.getMonth();
        const day = newDate.getDate();
  
        const date = `${day}/${month + 1}`;
  
        return({ date: {finalDate: date, objDate: newDate}, receita: item.value, despesa: 0 });
      }
    });

    let sortedData = currentItemsData.sort(
      (a, b) => a.date.objDate.getTime() - b.date.objDate.getTime()
    );
   
    return sortedData.map(item => ({...item, date: item.date.finalDate }));
  }

  let data = getItemsData();

  const groupedData = _.groupBy(data, "date");

  const result:ResultsChartProps = {};

  for (const date in groupedData) {
    const entries = groupedData[date];
    const summedValues = entries.reduce(
      (sums, entry: any) => {
        sums.receita += parseFloat(entry.receita) || 0;
        sums.despesa += parseFloat(entry.despesa) || 0;
        return sums;
      },
      { receita: 0, despesa: 0 }
    );
    result[date] = summedValues;
  }

  const newArray = Object.entries(result).map(([date, values]) => ({
    date,
    ...values
  }));
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={newArray}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="receita" fill="#00b3ff"></Bar>
          <Bar dataKey="despesa" fill="#ff1c1c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(ExpenseChart);
