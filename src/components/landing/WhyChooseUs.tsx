import {
  ShieldCheck,
  Lock,
  Boxes,
  ChartNoAxesColumnIncreasing,
  ShoppingCart,
  CreditCard,
  Wallet,
  ClipboardList,
  Bell,
} from "lucide-react";

export default function WhyChooseUs() {
  const items = [
    {
      icon: Lock,
      title: "Secure JWT Authentication",
    },
    {
      icon: ShieldCheck,
      title: "Role & Permission Management",
    },
    {
      icon: Boxes,
      title: "Real-time Inventory Tracking",
    },
    {
      icon: ChartNoAxesColumnIncreasing,
      title: "Automatic Low Stock Monitoring",
    },
    {
      icon: ShoppingCart,
      title: "Order & Checkout Management",
    },
    {
      icon: CreditCard,
      title: "Paystack Payment Integration",
    },
    {
      icon: Wallet,
      title: "Wallet & Withdrawal System",
    },
    {
      icon: ClipboardList,
      title: "Purchase Order Management",
    },
    {
      icon: Bell,
      title: "In-app Notifications",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold">
            Why Choose Us
          </h2>

          <p className="text-gray-600 mt-4">
            Built with modern technologies to provide a secure,
            reliable and scalable inventory solution.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 p-6 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Icon
                    size={28}
                    className="text-blue-600"
                  />
                </div>

                <h3 className="font-semibold text-gray-800">
                  {item.title}
                </h3>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}