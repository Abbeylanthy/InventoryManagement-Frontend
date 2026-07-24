import { Link } from "react-router-dom";
import { Boxes } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gray-50 pt-28 md:pt-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-blue-600 font-semibold mb-3">
            Inventory Management System
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Smart Inventory
            <br />
            Management
            <span className="text-blue-600">
              {" "}Made Simple
            </span>
          </h1>

          <p className="text-gray-600 text-lg mt-6 leading-8">
            Manage products, suppliers, inventory, purchase orders,
            customer orders, payments, wallets, and notifications
            from one secure platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Get Started
            </Link>

            <a
              href="#features"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              Learn More
            </a>

          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="bg-blue-600 rounded-3xl p-8 md:p-12 shadow-2xl">
            <Boxes
              size={160}
              strokeWidth={1.5}
              className="text-white md:w-[220px] md:h-[220px]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}