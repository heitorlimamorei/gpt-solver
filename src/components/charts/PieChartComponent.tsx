'use client';
import { COLORS } from '@/utils/chartColors';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

interface PieChartProps {
  data: { name: string; value: number }[];
}

export default function PieChartComponent({ data }: PieChartProps) {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
