import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import  LandingPage  from "./pages/LandingPage";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import Login from "./pages/auth/Login";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import Categories from "./pages/categories/Categories";
import Suppliers from "./pages/suppliers/Suppliers";
import StockHistory from "./pages/stockHistory/StockHistory";
import Orders from "./pages/orders/Orders";
import Users from "./pages/admin/Users";
import Roles from "./pages/roles/Roles";
import Permissions from "./pages/admin/Permissions";
import PurchaseOrders from "./pages/purchaseOrders/PurchaseOrders";
import Cart from "./pages/cart/Cart";
import MyCart from "./pages/cart/MyCart";
import Payments from "./pages/payments/Payments";
import Notifications from "./pages/notifications/Notifications";
import FeedbackManagement from "./pages/feedback/FeedbackManagement"
import MyNotifications from "./pages/myNotifications/MyNotifications";
import MyFeedback from './pages/feedback/MyFeedback';
import MyOrders from "./pages/orders/MyOrders";
import Wallets from "./pages/wallet/Wallets";
import MyWallet from "./pages/wallet/MyWallet";
import Withdrawals from "./pages/wallet/Withdrawals"
import MyTransactions from "./pages/wallet/MyTransactions";
import CreateFeedback from "./pages/feedback/CreateFeedback";
import CustomerProducts from "./pages/customer/CustomerProducts";
import DashboardLayout from "./components/layout/DashboardLayout";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import Inventory from "./pages/admin/Inventory";


function App() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
       <Route path="/dashboard" element={user?.roles?.some(r => r.name === "Customer") ? (
      <CustomerDashboard />
    ) : user?.roles?.some(r => r.name === "SuperAdmin") ? (
      <Dashboard />
    ) : (
      <StaffDashboard />
    )
  }
/>

        <Route path="/profile" element={<Profile />} />

        <Route path="/change-password" element={<ChangePassword />}/>

        <Route path="/products" element={<Products />} />

         <Route path="/inventory" element={<Inventory />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/suppliers" element={<Suppliers />} />
        
        <Route path="/purchase-orders" element={<PurchaseOrders />} />
        
        <Route path="/stock-history" element={<StockHistory />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/users" element={<Users />} />

        <Route path="/roles" element={<Roles />} />

        <Route path="/permissions" element={<Permissions />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/my-cart" element={<MyCart />} />

        <Route path="/wallets" element={<Wallets />} />

        <Route path="/withdrawals" element={<Withdrawals />} />

        <Route path="/my-wallet" element={<MyWallet />} />

        <Route path="/my-transactions" element={<MyTransactions />} />

        <Route path="/payments" element={<Payments />} />

        <Route path="/notifications" element={<Notifications />} />

        <Route path="/feedback-management" element={<FeedbackManagement />} />

        <Route path="/my-feedback" element={<MyFeedback />} />

        <Route path="/my-orders" element={<MyOrders />} />

         <Route path="/create-feedback" element={<CreateFeedback />} />

         <Route path="/shop" element={<CustomerProducts />}/>

        <Route path="/my-notifications" element={
    
      
        <MyNotifications />
      
    
  }
/>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </DashboardLayout>
  );
}

export default App;