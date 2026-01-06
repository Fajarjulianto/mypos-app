import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Package } from "lucide-react";

export interface CategoryData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    payload: CategoryData;
    name?: string;
    value?: number;
    color?: string;
  }[];
}

// --- 3. Custom Tooltip Component ---
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;

    return (
      <div className="bg-white px-3 py-2 border border-gray-200 shadow-md rounded-md text-xs font-bold text-gray-800 whitespace-nowrap z-50">
        {data.name} : {data.value}%
      </div>
    );
  }
  return null;
};

interface SalesByCategoryChartProps {
  data: CategoryData[];
}

// --- 4. Main Chart Component ---
export const SalesByCategoryChart = ({ data }: SalesByCategoryChartProps) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-100 flex flex-col">
      {/* Header Kecil */}
      <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 mb-4">
        <Package size={18} className="text-green-600" />
        Sales by Category
      </h3>

      {/* Area Chart Compact (H-[180px]) */}
      <div className="h-45 w-full relative shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55} // Donut tebal
              outerRadius={80}
              paddingAngle={0} // Rapat
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  className="outline-none"
                />
              ))}
            </Pie>
            {/* Tooltip tanpa cursor line agar lebih bersih */}
            <Tooltip content={<CustomTooltip />} cursor={false} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Minimalis di Bawah */}
      <div className="mt-4 space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm group hover:bg-gray-50 p-1 rounded transition-colors"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-600 font-medium group-hover:text-gray-900">
                {item.name}
              </span>
            </div>
            <span className="font-bold text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
