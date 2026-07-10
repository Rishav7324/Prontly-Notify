"use client";

import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  showGrid?: boolean;
}

export function LineChart({ data, height = 200, color = "#000000", showGrid = false }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLine data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#ebe8e4" />}
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#a59f97" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#a59f97" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: "#fdfcfc", border: "1px solid #ebe8e4", borderRadius: 8 }}
          labelStyle={{ color: "#777169" }}
        />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </RechartsLine>
    </ResponsiveContainer>
  );
}

export function Sparkline({ data, height = 40, color = "#3B82F6" }: { data: number[]; height?: number; color?: string }) {
  const chartData = data.map((v, i) => ({ label: String(i), value: v }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLine data={chartData}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={1.5} dot={false} />
      </RechartsLine>
    </ResponsiveContainer>
  );
}
