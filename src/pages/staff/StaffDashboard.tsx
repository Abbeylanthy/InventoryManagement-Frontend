import {
  Package,
  AlertTriangle,
  ClipboardList,
  CheckCircle,
  ShoppingBag,
  CreditCard,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import InventoryStatusChart from "../../components/dashboard/InventoryStatusChart";
import { useStockHistory } from "../../hooks/useStockHistory";
import { useStaffDashboardSummary } from "../../hooks/useStaffDashboardSummary";
import { useNavigate } from "react-router-dom";
import { usePurchaseOrders } from "../../hooks/usePurchaseOrders";

export default function StaffDashboard() {
  const { data, isLoading, isError } =
    useStaffDashboardSummary();
    const navigate = useNavigate();
    const { data: stockHistory } = useStockHistory();
    const { data: purchaseOrders } = usePurchaseOrders();

  if (isLoading) {
    return <h2>Loading dashboard...</h2>;
  }

  if (isError) {
    return <h2>Failed to load dashboard.</h2>;
  }

  const cards = [
  {
    title: "Total Products",
    value: data?.totalProducts ?? 0,
    icon: Package,
    path: "/products",
  },
  {
    title: "Low Stock",
    value: data?.lowStockProducts ?? 0,
    icon: AlertTriangle,
    path: "/inventory",
  },
  {
    title: "Pending Purchase Orders",
    value: data?.pendingPurchaseOrders ?? 0,
    icon: ClipboardList,
    path: "/purchase-orders",
  },
  {
    title: "Received Purchase Orders",
    value: data?.receivedPurchaseOrders ?? 0,
    icon: CheckCircle,
    path: "/purchase-orders",
  },
  {
    title: "Total Orders",
    value: data?.totalOrders ?? 0,
    icon: ShoppingBag,
    path: "/orders",
  },
  {
    title: "Paid Orders",
    value: data?.paidOrders ?? 0,
    icon: CreditCard,
    path: "/orders",
  },
  {
    title: "Stock In Today",
    value: data?.stockInToday ?? 0,
    icon: ArrowDownCircle,
    path: "/stock-history",
  },
  {
    title: "Stock Out Today",
    value: data?.stockOutToday ?? 0,
    icon: ArrowUpCircle,
    path: "/stock-history",
  },
];



  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">
        Staff Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Inventory operations overview
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
           <div
  key={card.title}
  onClick={() => navigate(card.path)}
  className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition"
>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>
                </div>

                <Icon
                  size={34}
                  className="text-blue-600"
                />
              </div>
              
            </div>

            
          );
        })}
      </div>

      <div className="mt-10">
  <InventoryStatusChart
    inStock={data?.inStockProducts ?? 0}
    lowStock={data?.lowStockProducts ?? 0}
    outOfStock={data?.outOfStockProducts ?? 0}
  />
</div>

      <div className="mt-10 bg-white rounded-xl shadow">

  <div className="p-6 border-b">
    <h2 className="text-xl font-bold">
      Recent Stock History
    </h2>
  </div>

  <table className="w-full">

    <thead className="bg-gray-50">

      <tr>
        <th className="text-left p-4">Product</th>
        <th className="text-left p-4">Action</th>
        <th className="text-left p-4">Quantity</th>
        <th className="text-left p-4">Date</th>
      </tr>

    </thead>

    <tbody>

      {stockHistory?.items
        ?.slice(0, 5)
        .map((item: any) => (

        <tr
          key={item.id}
          className="border-b hover:bg-gray-50"
        >

          <td className="p-4">
            {item.productName}
          </td>

          <td className="p-4">
            {item.actionType}
          </td>

          <td className="p-4">
            {item.quantityChanged}
          </td>

          <td className="p-4">
            {new Date(item.createdAt).toLocaleDateString()}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

<div className="mt-10 bg-white rounded-xl shadow">

  <div className="p-6 border-b">
    <h2 className="text-xl font-bold">
      Recent Purchase Orders
    </h2>
  </div>

  <table className="w-full">

    <thead className="bg-gray-50">
      <tr>
        <th className="text-left p-4">PO Number</th>
        <th className="text-left p-4">Supplier</th>
        <th className="text-left p-4">Status</th>
        <th className="text-left p-4">Date</th>
      </tr>
    </thead>

    <tbody>

      {purchaseOrders?.items
        ?.slice(0, 5)
        .map((po: any) => (

        <tr
          key={po.id}
          className="border-b hover:bg-gray-50"
        >

          <td className="p-4">
            {po.purchaseOrderNumber}
          </td>

          <td className="p-4">
            {po.supplierName}
          </td>

          <td className="p-4">
            {po.status}
          </td>

          <td className="p-4">
            {new Date(po.createdAt).toLocaleDateString()}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

    </div>
  );
}