import React from "react";
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

function ExpenseChart() {
  const { sheet } = useSheets();

  let data = [];

  sheet.items.map((item) => {
    if (item.value < 0) {
      const newDate = firestoreTimestampToDate(item.date);
      const month = newDate.getMonth();
      const day = newDate.getDate();

      const date = `${day}/${month + 1}`;

      data.push({ date: date, despesa: item.value, receita: 0 });
    }
    
    if (item.value > 0) {
      const newDate = firestoreTimestampToDate(item.date);
      const month = newDate.getMonth();
      const day = newDate.getDate();

      const date = `${day}/${month + 1}`;

      data.push({ date: date, receita: item.value, despesa: 0 });
    }
  });

  const groupedData = _.groupBy(data, "date");

  const result:ResultsChartProps = {};

  for (const date in groupedData) {
    const entries = groupedData[date];
    const summedValues = entries.reduce(
      (sums, entry) => {
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
  console.log(newArray);
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

export default ExpenseChart;
