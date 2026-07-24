import {
  LayoutDashboard,
  Package,
  FolderTree,
  Truck,
  ClipboardList,
  History,
  CreditCard,
  Wallet,
  Users,
  Shield,
  KeyRound,
  Bell,
  MessageSquare,
  PackageCheck,
} from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { hasPermission } from "../../utils/permissions";
import { NavLink } from "react-router-dom";

const inventory = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard", permission: "ViewDashboard", },
  { name: "Products", icon: Package, path: "/products", permission: "ViewProducts", },
  { name: "Inventory", icon: Package, path: "/inventory", permission: "ViewInventory", },
  { name: "Customer Carts", icon: ShoppingCart, path: "/cart", permission: "GetAllCarts", },
  { name: "Categories", icon: FolderTree, path: "/categories", permission: "ViewCategories", },
  { name: "Suppliers", icon: Truck, path: "/suppliers", permission: "GetSuppliers", },
  { name: "Purchase Orders", icon: ClipboardList, path: "/purchase-orders", permission: "ViewPurchaseOrder", },
  { name: "Stock History", icon: History, path: "/stock-history", permission: "ViewStockHistory", },
  { name: "Orders", icon: PackageCheck, path: "/orders", permission: "GetAllOrders", },
];

const finance = [
  { name: "Payments", icon: CreditCard, path: "/payments", permission: "ViewPayments", },
  { name: " Wallets", icon: Wallet, path: "/wallets", permission: "ViewWallets", },
  { name: " Withdrawals", icon: Wallet, path: "/withdrawals" },
];

const administration = [
  { name: "Users", icon: Users, path: "/users" },
  { name: "Roles", icon: Shield, path: "/roles"},
  { name: "Permissions", icon: KeyRound, path: "/permissions"}, 
  { name: "System Notifications", icon: Bell, path: "/notifications", permission: "ViewNotifications",},
  { name: "Feedback", icon: MessageSquare, path: "/feedback-management", permission: "ViewFeedback",},
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col h-screen">

      <div className="px-6 py-7 border-b border-slate-700">

        <h1 className="text-2xl font-bold">
          IMS
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Inventory Management
        </p>

      </div>

      <div className="flex-1 overflow-y-auto">

        <Section title="Inventory" items={inventory} />

        <Section title="Finance" items={finance} />

        <Section title="Administration" items={administration} />

      </div>

      

    </aside>
  );
}

function Section({
  title,
  items,
}: {
  title: string;
  items: any[];
}) {

  const { user } = useAuth();
  const isSuperAdmin =
   user?.roles.some(
    (r) => r.name === "SuperAdmin"
   ) ?? false;

   const visibleItems = items.filter((item) => {
  if (
    ["Users", "Roles", "Permissions", "Withdrawals"].includes(item.name)
  ) {
    return isSuperAdmin;
  }

  return hasPermission(user, item.permission);
});

  return (
    <div className="mt-6">

      <p className="px-6 text-xs uppercase tracking-widest text-slate-400 mb-3">

        {title}

      </p>

      {visibleItems.map((item) => {

        const Icon = item.icon;

        return (

          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-3
              px-6
              py-3
              transition

              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-200"
              }
              `
            }
          >
            <Icon size={20} />

            {item.name}

          </NavLink>

        );
      })}
    </div>
  );
}