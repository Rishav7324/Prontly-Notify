"use client";

import { PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  height?: number;
}

export function DonutChart({ data, height = 200 }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPie>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8 }}
          labelStyle={{ color: "#94A3B8" }}
        />
      </RechartsPie>
    </ResponsiveContainer>
  );
}
