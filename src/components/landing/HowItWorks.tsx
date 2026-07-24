export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Register",
      description:
        "Create an account and verify your email to get started.",
    },
    {
      number: "02",
      title: "Manage Inventory",
      description:
        "Add products, categories, suppliers and monitor stock levels.",
    },
    {
      number: "03",
      title: "Place & Process Orders",
      description:
        "Customers place orders while administrators manage fulfillment.",
    },
    {
      number: "04",
      title: "Track Payments",
      description:
        "Secure payments automatically update inventory and generate notifications.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold text-gray-900">
            How It Works
          </h2>

          <p className="mt-4 text-gray-600">
            Four simple steps to manage your inventory efficiently.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step) => (

            <div
              key={step.number}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 p-8 text-center"
            >

              <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-6">
                {step.number}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}