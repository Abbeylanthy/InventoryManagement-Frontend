import dashboard from "../../assets/screenshots/dashboard.png";
import products from "../../assets/screenshots/products.png";
import inventory from "../../assets/screenshots/inventory.png";
import orders from "../../assets/screenshots/orders.png";

export default function Screenshots() {
  const screenshots = [
    {
      title: "Dashboard",
      image: dashboard,
    },
    {
      title: "Products",
      image: products,
    },
    {
      title: "Inventory",
      image: inventory,
    },
    {
      title: "Orders",
      image: orders,
    },
  ];

  return (
    <section id="screenshots" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            System Screenshots
          </h2>

          <p className="mt-4 text-gray-600">
            Explore the clean and intuitive interface of the Inventory Management System.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {screenshots.map((shot) => (
            <div
              key={shot.title}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={shot.image}
                alt={shot.title}
                className="w-full h-auto"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {shot.title}
                </h3>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}