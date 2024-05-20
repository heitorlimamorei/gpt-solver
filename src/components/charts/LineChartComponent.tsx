'use client';
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { COLORS } from '@/utils/chartColors';

interface TransformedDataEntry {
  [key: string]: string | number;
  name: string;
}

interface LineChartComponentProps {
  data: TransformedDataEntry[];
}

export default function LineChartComponent({ data }: LineChartComponentProps) {
  const keys = Object.keys(data[0]).filter((key) => key !== 'name');
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {keys.map((key, index) => (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          stroke={COLORS[index % COLORS.length]}
          strokeWidth={3}
          name={key}
        />
      ))}
    </LineChart>
  );
}

