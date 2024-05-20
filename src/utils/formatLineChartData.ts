interface IDataLineChart {
  name: string;
  value: ILineChartItem[];
}

interface ILineChartItem {
  name: string;
  value: number;
}

export default function formatLineChartData(data: IDataLineChart[]) {
  return data.map((c) => {
    const values = Object.values(c);
    let obj = { name: values[0] };
    values[1].forEach((item) => {
      let itemKeyValue = Object.entries(item);
      obj[itemKeyValue[0][1]] = itemKeyValue[1][1];
    });
    return obj;
  });
}
