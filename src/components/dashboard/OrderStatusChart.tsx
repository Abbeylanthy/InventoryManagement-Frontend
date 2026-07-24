import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  summary: any;
}

export default function OrderStatusChart({
  summary,
}: Props) {
  const data = [
    {
      name: "Pending",
      value: summary.pendingPaymentOrders,
    },
    {
      name: "Paid",
      value: summary.paidOrders,
    },
    {
      name: "Processing",
      value: summary.processingOrders,
    },
    {
      name: "Shipped",
      value: summary.shippedOrders,
    },
    {
      name: "Delivered",
      value: summary.deliveredOrders,
    },
    {
      name: "Cancelled",
      value: summary.cancelledOrders,
    },
    {
      name: "Refunded",
      value: summary.refundedOrders,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 h-[420px]">
      <h2 className="text-xl font-bold mb-6">
        Order Status Overview
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}