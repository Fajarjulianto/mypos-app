import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "January", value: 30 },
  { name: "February", value: 45 },
  { name: "March", value: 58 },
  { name: "April", value: 40 },
  { name: "May", value: 30 },
  { name: "June", value: 90 },
  { name: "July", value: 62 },
  { name: "August", value: 92 },
  { name: "September", value: 45 },
  { name: "October", value: 78 },
];

export const RevenueChart = () => {
  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-sm h-100 flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Sales Overview</h3>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barSize={40}
          >
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6395d3" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#6395d3" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 11 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />

            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />

            <Legend
              iconType="square"
              align="center"
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: "20px" }}
            />

            <Bar
              name="2026"
              dataKey="value"
              fill="url(#colorBar)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
