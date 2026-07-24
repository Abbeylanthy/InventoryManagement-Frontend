import DashboardCard from "../../components/dashboard/DashboardCard";
import { ShoppingCart, DollarSign, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OrderStatusChart from "../../components/dashboard/OrderStatusChart";
import { useDashboard } from "../../hooks/useDashboard";
import { useRecentOrders } from "../../hooks/useRecentOrders";
import RevenueTrendChart from "../../components/dashboard/RevenueTrendChart";

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboard();
  const navigate = useNavigate();
  const { data: recentOrders } = useRecentOrders();

  if (isLoading) {
    return (
      <div className="text-xl font-semibold">
        Loading dashboard...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-red-600 text-xl">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome to Inventory Management System
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

       <DashboardCard
  title="Total Orders"
  value={data.totalOrders}
  icon={<ShoppingCart className="text-blue-600" />}
  onClick={() => navigate("/orders")}
/>
<DashboardCard
  title="Pending Payment"
  value={data.pendingPaymentOrders}
  icon={<Clock className="text-yellow-600" />}
  onClick={() =>
    navigate("/orders?status=PendingPayment")
  }
/>
<DashboardCard
  title="Paid Orders"
  value={data.paidOrders}
  icon={<DollarSign className="text-green-600" />}
  onClick={() =>
    navigate("/orders?status=Paid")
  }
/>

<DashboardCard
  title="Processing"
  value={data.processingOrders}
  icon={<Clock className="text-purple-600" />}
  onClick={() =>
    navigate("/orders?status=Processing")
  }
/>

<DashboardCard
  title="Shipped"
  value={data.shippedOrders}
  icon={<ShoppingCart className="text-indigo-600" />}
  onClick={() =>
    navigate("/orders?status=Shipped")
  }
/>

<DashboardCard
  title="Delivered"
  value={data.deliveredOrders}
  icon={<CheckCircle className="text-green-600" />}
  onClick={() =>
    navigate("/orders?status=Delivered")
  }
/>

<DashboardCard
  title="Cancelled"
  value={data.cancelledOrders}
  icon={<Clock className="text-red-600" />}
  onClick={() =>
    navigate("/orders?status=Cancelled")
  }
/>

<DashboardCard
  title="Revenue"
  value={`₦${data.totalRevenue.toLocaleString()}`}
  icon={<DollarSign className="text-emerald-600" />}
/>

      </div>

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">

 <OrderStatusChart summary={data} />

<RevenueTrendChart />


</div>
<div className="bg-white rounded-xl shadow mt-8">

  <div className="p-6 border-b">
    <h2 className="text-xl font-bold">
      Recent Orders
    </h2>
  </div>

  <table className="w-full">

    <thead className="bg-gray-50">

      <tr>
        <th className="text-left p-4">Order</th>
        <th className="text-left p-4">Customer</th>
        <th className="text-left p-4">Amount</th>
        <th className="text-left p-4">Status</th>
        <th className="text-left p-4">Date</th>
      </tr>

    </thead>

    <tbody>

      {recentOrders?.map((order: any) => (

        <tr
          key={order.orderNumber}
          className="border-b hover:bg-gray-50"
        >

          <td className="p-4 font-medium">
            {order.orderNumber}
          </td>

          <td className="p-4">
            {order.customerName}
          </td>

          <td className="p-4">
            ₦{order.totalAmount.toLocaleString()}
          </td>

          <td className="p-4">
            {order.status}
          </td>

          <td className="p-4">
            {new Date(order.createdAt).toLocaleDateString()}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>


    </div>

    
  );
}