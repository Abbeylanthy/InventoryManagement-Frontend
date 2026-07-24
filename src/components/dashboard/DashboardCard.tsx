import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  onClick?: () => void;
}

export default function DashboardCard({
  title,
  value,
  icon,
  onClick,
}: Props) {
  return (
    <div
  onClick={onClick}
  className={`bg-white rounded-xl shadow p-6 flex justify-between items-center transition ${
    onClick
      ? "cursor-pointer hover:shadow-lg hover:-translate-y-1"
      : ""
  }`}
>
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">

            {title}

          </p>

          <h2 className="text-3xl font-bold mt-3">

            {value}

          </h2>

        </div>

        <div className="bg-blue-100 p-4 rounded-full">

          {icon}

        </div>

      </div>
    </div>
  );
}