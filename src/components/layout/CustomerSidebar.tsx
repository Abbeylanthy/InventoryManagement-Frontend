import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  PackageCheck,
  Wallet,
  Bell,
  MessageSquare,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const items = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Shop", icon: ShoppingBag, path: "/shop" },
  { name: "My Cart", icon: ShoppingCart, path: "/my-cart" },
  { name: "My Orders", icon: PackageCheck, path: "/my-orders" },
  { name: "My Wallet", icon: Wallet, path: "/my-wallet" },
  { name: "My Notifications", icon: Bell, path: "/my-notifications" },
  { name: "My Feedback", icon: MessageSquare, path: "/my-feedback" },
];

export default function CustomerSidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col h-screen">

      <div className="px-6 py-7 border-b border-slate-700">
        <h1 className="text-2xl font-bold">IMS</h1>

        <p className="text-sm text-slate-400 mt-1">
          Customer Portal
        </p>
      </div>

      <div className="flex-1 overflow-y-auto mt-6">
        {items.map((item) => {
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

    </aside>
  );
}