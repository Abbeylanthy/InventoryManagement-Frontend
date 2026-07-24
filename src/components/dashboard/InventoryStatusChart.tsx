import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#16a34a",
  "#eab308",
  "#dc2626",
];

export default function InventoryStatusChart({
  inStock,
  lowStock,
  outOfStock,
}: {
  inStock: number;
  lowStock: number;
  outOfStock: number;
}) {

  const data = [
    {
      name: "In Stock",
      value: inStock,
    },
    {
      name: "Low Stock",
      value: lowStock,
    },
    {
      name: "Out of Stock",
      value: outOfStock,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 h-[420px]">

      <h2 className="text-xl font-bold mb-5">
        Inventory Status
      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
            label
          >

            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}