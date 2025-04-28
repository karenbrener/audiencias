
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  height?: number;
}

const COLORS = ['#7E69AB', '#8B5CF6', '#D3E4FD', '#E5DEFF', '#1EAEDB'];

const PieChart: React.FC<PieChartProps> = ({ data, height = 200 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #f0f0f0', 
            borderRadius: '4px',
            fontSize: '12px'
          }} 
        />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
