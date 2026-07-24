import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useRevenueTrend } from "../../hooks/useRevenueTrend";

export default function RevenueTrendChart() {
  const { data } = useRevenueTrend();

  return (
    <div className="bg-white rounded-xl shadow p-6 h-[420px]">

      <h2 className="text-xl font-bold mb-6">
        Revenue Trend (Last 7 Days)
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}