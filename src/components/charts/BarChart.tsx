"use client";

import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
}

export function BarChart({ data, height = 200,   color = "#0447ff" }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBar data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-stone)" />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--color-ash)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "var(--color-ash)" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: "var(--color-eggshell)", border: "1px solid var(--color-stone)", borderRadius: 8 }}
          labelStyle={{ color: "var(--color-smoke)" }}
        />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBar>
    </ResponsiveContainer>
  );
}
