import { ShoppingBag, ShoppingCart, PackageCheck, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMyOrders } from "../../hooks/useMyOrders";
import { useWalletBalance } from "../../hooks/useWallet";

export default function CustomerDashboard() {
  const navigate = useNavigate();
const { user } = useAuth();
const { data: orders } = useMyOrders();
const totalOrders = orders?.items?.length ?? 0;
const { data: walletBalance } = useWalletBalance();

const deliveredOrders =
  orders?.items?.filter(
    (x) => x.status === "Delivered"
  ).length ?? 0;

const ordersInTransit =
  orders?.items?.filter(
    (x) =>
      x.status === "Processing" ||
      x.status === "Shipped"
  ).length ?? 0;
const [showBalance, setShowBalance] = useState(true);
  const cards = [
  {
    title: "Orders In Transit",
    value: ordersInTransit,
    icon: ShoppingBag,
    path: "/my-orders? status=Processing",
  },
  {
    title: "Delivered Orders",
    value: deliveredOrders,
    icon: PackageCheck,
    path: "/my-orders? status=Delivered",
  },
  {
    title: "Total Orders",
    value: totalOrders,
    icon: ShoppingCart,
    path: "/my-orders",
  },
];

  return (
    <div>

     <div className="flex justify-between items-center mb-8">
  <div>
   <h1 className="text-3xl font-bold">
  Welcome back, {user?.firstName ?? user?.userName}! 👋
</h1>

<p className="text-gray-500 mt-2">
  Browse products, track your orders and manage your wallet.
</p>
  </div>

 <div className="bg-white rounded-xl shadow px-6 py-4 min-w-[260px]">

  <p className="text-gray-500 text-sm">
    Wallet Balance
  </p>

  <div className="flex items-center justify-between mt-2">

    <h2 className="text-2xl font-bold text-green-600">
      {showBalance
  ? `₦${(walletBalance?.balance ?? 0).toLocaleString()}`
  : "••••••••"}
    </h2>

    <button
      onClick={() => setShowBalance(!showBalance)}
      className="text-gray-500 hover:text-black"
    >
      {showBalance ? <EyeOff size={22} /> : <Eye size={22} />}
    </button>

  </div>

  

</div>


</div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              onClick={() => navigate(card.path)}
             className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-lg hover:scale-105 transistion"
            >
              <Icon
                size={42}
                className="text-blue-600 mb-5"
              />

             <p className="text-gray-500 text-sm">
  {card.title}
</p>

<h2 className="text-4xl font-bold mt-2">
  {card.value}
</h2>
            </div>
          );
        })}

      </div>
<div className="mt-10 bg-white rounded-xl shadow">

  <div className="p-6 border-b">
    <h2 className="text-xl font-bold">
      Recent Orders
    </h2>
  </div>

  <table className="w-full">

    <thead className="bg-gray-50">
      <tr>
        <th className="text-left p-4">Order Number</th>
        <th className="text-left p-4">Status</th>
        <th className="text-left p-4">Amount</th>
        <th className="text-left p-4">Date</th>
      </tr>
    </thead>

    <tbody>

      {orders?.items
        ?.slice(0, 5)
        .map((order) => (

        <tr
          key={order.id}
          className="border-b hover:bg-gray-50"
        >

          <td className="p-4 font-medium">
            {order.orderNumber}
          </td>

          <td className="p-4">
            {order.status}
          </td>

          <td className="p-4">
            ₦{order.totalAmount.toLocaleString()}
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