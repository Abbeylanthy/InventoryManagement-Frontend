import {
  Boxes,
  ChartColumn,
  ShoppingCart,
  CreditCard,
  Users,
  Bell,
} from "lucide-react";
export default function Features() {
  const features = [
    {
      icon: Boxes,
      title: "Product Management",
      description:
        "Create, update, categorize and manage products efficiently.",
    },
    {
      icon: ChartColumn,
      title: "Inventory Tracking",
      description:
        "Monitor stock levels and automatically track inventory movements.",
    },
    {
      icon: ShoppingCart,
      title: "Order Management",
      description:
        "Manage customer orders from checkout to delivery.",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description:
        "Integrated Paystack payment processing with secure verification.",
    },
    {
      icon: Users,
      title: "User & Role Management",
      description:
        "Control system access using roles and permissions.",
    },
    {
      icon: Bell,
      title: "Notifications",
      description:
        "Receive real-time alerts for orders, stock updates and activities.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Powerful Features
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Everything you need to manage inventory efficiently.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
                  <Icon
                    size={34}
                    className="text-blue-600"
                    strokeWidth={2}
                  />
                </div>

                <h3 className="text-2xl font-semibold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}