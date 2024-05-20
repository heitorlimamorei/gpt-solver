'use client';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface TransformedDataEntry {
  [key: string]: string | number;
  name: string;
}

interface LineChartComponentProps {
  data: TransformedDataEntry[];
}

export default function LineChartComponent({ data }: LineChartComponentProps) {
  const dataKeys = data.length > 0 ? Object.keys(data[0]).filter((key) => key !== 'name') : [];

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="transporte" stroke="#8884d8" name="transporte" />

      {dataKeys.map((key) => (
        <Line key={key} type="monotone" dataKey={key} stroke="#8884d8" name={key} />
      ))}
    </LineChart>
  );
}

