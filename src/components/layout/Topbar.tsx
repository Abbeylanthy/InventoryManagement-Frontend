import { Bell, UserCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useUnreadNotificationCount } from "../../hooks/useUnreadNotificationCount";
import { useNotifications } from "../../hooks/useNotifications";
import { useMarkAllNotificationsRead } from "../../hooks/useMarkAllNotificationsRead";
import { useMarkNotificationRead } from "../../hooks/useMarkNotificationRead";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

export default function Topbar() {
  const { user, logout } = useAuth();
  

  const [openNotifications, setOpenNotifications] = useState(false);
  const [openProfile, setOpenProfile] =
  useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);

const profileRef = useRef<HTMLDivElement>(null);

const { data: unread } =
  useUnreadNotificationCount();

  const navigate = useNavigate();

  const markNotificationMutation =
  useMarkNotificationRead();

const { data: notifications } =
  useNotifications();

const markAllMutation =
  useMarkAllNotificationsRead();

  useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;

    if (
      notificationRef.current &&
      !notificationRef.current.contains(target)
    ) {
      setOpenNotifications(false);
    }

    if (
      profileRef.current &&
      !profileRef.current.contains(target)
    ) {
      setOpenProfile(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">

      <div>
        <h1 className="text-xl font-bold text-gray-800">
          Inventory Management System
        </h1>
      </div>

      <div className="flex items-center gap-6">

       <div
  ref={notificationRef}
  className="relative"
>

 <button
  onClick={() =>
    setOpenNotifications(!openNotifications)
  }
  className="
    relative
    h-12
    w-12
    bg-white
    border
    border-gray-200
    rounded-xl
    shadow-sm
    flex
    items-center
    justify-center
    hover:bg-gray-50
    transition
  "
>
    <Bell
      className="text-gray-600"
      size={22}
    />

    {unread?.count > 0 && (
      <span
        className="
          absolute
          -top-2
          -right-2
          bg-red-600
          text-white
          text-xs
          rounded-full
          h-5
          w-5
          flex
          items-center
          justify-center
        "
      >
        {unread.count}
      </span>
    )}
  </button>

  {openNotifications && (
  <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-xl border z-50">

    <div className="flex justify-between items-center p-4 border-b">

      <h3 className="font-bold text-lg">
        Notifications
      </h3>


      <button
  onClick={() =>
    markAllMutation.mutate(undefined, {
      onSuccess: () => {
        setOpenNotifications(false);
      },
    })
  }
  disabled={
    markAllMutation.isPending ||
    unread?.count === 0
  }
  className="text-blue-600 text-sm disabled:text-gray-400"
>
  {markAllMutation.isPending
    ? "Marking..."
    : "Mark all as read"}
</button>



    </div>

    <div className="max-h-96 overflow-y-auto">

      {notifications?.items?.length === 0 ? (

        <div className="p-6 text-center text-gray-500">
          No notifications
        </div>

        

        

      ) : (

        

        notifications?.items?.map((notification: any) => (

         <div
  key={notification.id}
  onClick={() => {
    if (!notification.isRead) {
      markNotificationMutation.mutate(notification.id);
    }
  }}
  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
    !notification.isRead
      ? "bg-blue-50"
      : ""
  }`}
>

            <div className="flex justify-between">

              <p className="font-semibold">
                {notification.type}
              </p>

              {!notification.isRead && (
                <span className="h-2 w-2 rounded-full bg-blue-600 mt-2"></span>
              )}

            </div>

            <p className="text-sm mt-2">
              {notification.message}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              {new Date(
                notification.createdAt
              ).toLocaleString()}
            </p>

          </div>

          

        ))

      )}

   </div>

    <div className="border-t p-3">

      <button
        onClick={() => {
          setOpenNotifications(false);
          navigate("/my-notifications");
        }}
        className="w-full text-center text-blue-600 font-medium hover:text-blue-800"
      >
        View My Notifications
      </button>

    </div>

  </div>
)}

</div>

        <div
  ref={profileRef}
  className="relative"
>

  <button
    onClick={() =>
      setOpenProfile(!openProfile)
    }
    className="
flex
items-center
gap-3
bg-white
border
border-gray-200
rounded-xl
shadow-sm
px-4
py-2
hover:bg-gray-50
transition
"
  >
    <UserCircle
      size={34}
      className="text-gray-600"
    />

    <div className="text-left">
      <p className="font-semibold">
        {user?.userName}
      </p>

      <p className="text-sm text-gray-500">
        {user?.roles?.[0]?.name}
      </p>
    </div>
  </button>

  {openProfile && (
  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border z-50">

    <button
      onClick={() => 
        navigate("/profile")
      }
      className="w-full text-left px-4 py-3 hover:bg-gray-100"
    >
      👤 My Profile
    </button>

    <button
      onClick={() => {
        setOpenProfile(false);
        navigate("/change-password");
      }}
      className="w-full text-left px-4 py-3 hover:bg-gray-100"
    >
      🔒 Change Password
    </button>

   <button
  onClick={() => {
    setOpenProfile(false);
    logout();
    toast.success("Logged out successfully.");
    navigate("/");
  }}
  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
>
  🚪 Logout
</button>

  </div>
)}

</div>

      </div>

    </header>
  );
}