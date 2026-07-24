import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-slate-900 text-white py-16"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-2xl font-bold text-blue-400">
              Inventory Management System
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              A modern inventory management platform for managing
              products, suppliers, purchase orders, customer orders,
              inventory, wallets and payments.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <a href="#home" className="hover:text-blue-400">
                Home
              </a>

              <a href="#features" className="hover:text-blue-400">
                Features
              </a>

              <a href="#about" className="hover:text-blue-400">
                About
              </a>

            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Connect
            </h3>

            <div className="flex gap-5">

              <a
                href="https://github.com/Abbeylanthy"
                target="_blank"
                rel="noopener"
                className="hover:text-blue-400"
              >
                <FaGithub size={24} />
              </a>

              <a
                href="https://www.linkedin.com/in/abiodun-blessing-52a506407?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener"
                className="hover:text-blue-400"
              >
                <FaLinkedin size={24} />
              </a>

              <a
                href="mailto:atejioyeblessing@gmail.com"
                className="hover:text-blue-400"
              >
                <Mail size={24} />
              </a>

            </div>

          </div>

        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-gray-400">

          © {new Date().getFullYear()} Inventory Management System.
          All rights reserved.

        </div>

      </div>
    </footer>
  );
}