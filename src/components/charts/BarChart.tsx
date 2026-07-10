"use client";

import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
}

export function BarChart({ data, height = 200, color = "#000000" }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBar data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ebe8e4" />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#a59f97" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#a59f97" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: "#fdfcfc", border: "1px solid #ebe8e4", borderRadius: 8 }}
          labelStyle={{ color: "#777169" }}
        />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBar>
    </ResponsiveContainer>
  );
}
