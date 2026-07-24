import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="py-24 bg-blue-600">

      <div className="max-w-5xl mx-auto px-6 text-center text-white">

        <h2 className="text-4xl md:text-5xl font-bold">
          Start Managing Your Inventory Today
        </h2>

        <p className="mt-6 text-lg text-blue-100 leading-8">
          Simplify inventory tracking, purchase orders, customer
          management, payments and reporting with one powerful
          platform.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">

          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Login
          </Link>

        </div>

      </div>

    </section>
  );
}