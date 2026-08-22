import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Building,
  Clock,
} from "lucide-react";

const monthlyRevenue = [
  { month: "Mar", revenue: 45200 },
  { month: "Apr", revenue: 48900 },
  { month: "May", revenue: 52100 },
  { month: "Jun", revenue: 55800 },
  { month: "Jul", revenue: 61200 },
  { month: "Aug", revenue: 68400 },
];

const planBreakdown = [
  { plan: "Enterprise", members: 45, revenue: "$27,000", percentage: 13, color: "bg-purple-500" },
  { plan: "Premium", members: 128, revenue: "$25,600", percentage: 37, color: "bg-green-500" },
  { plan: "Standard", members: 112, revenue: "$11,200", percentage: 33, color: "bg-blue-500" },
  { plan: "Basic", members: 57, revenue: "$4,600", percentage: 17, color: "bg-gray-400" },
];

const locationPerformance = [
  { name: "Downtown Hub", revenue: "$32,100", members: 156, growth: "+12.3%", trend: "up" },
  { name: "Midtown Office", revenue: "$21,300", members: 98, growth: "+8.1%", trend: "up" },
  { name: "Uptown Studio", revenue: "$15,000", members: 88, growth: "+5.7%", trend: "up" },
];

const topMetrics = [
  { label: "Avg. Revenue per Member", value: "$199.42", change: "+3.2%", trend: "up" },
  { label: "Member Retention Rate", value: "91.2%", change: "+1.8%", trend: "up" },
  { label: "Avg. Booking Duration", value: "4.2 hrs", change: "-0.3 hrs", trend: "down" },
  { label: "Peak Occupancy", value: "94%", change: "+2.1%", trend: "up" },
];

const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));

export default function OrganizationAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track performance across all your locations and membership plans.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topMetrics.map((m) => (
          <div key={m.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">{m.label}</p>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-2xl font-bold text-gray-900">{m.value}</p>
              <div className="flex items-center gap-0.5 mb-1">
                {m.trend === "up" ? <ArrowUpRight size={14} className="text-green-500" /> : <ArrowDownRight size={14} className="text-red-500" />}
                <span className={`text-xs font-semibold ${m.trend === "up" ? "text-green-500" : "text-red-500"}`}>{m.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Monthly Revenue</h3>
          <div className="flex items-end gap-3 h-48">
            {monthlyRevenue.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-gray-600">${(m.revenue / 1000).toFixed(1)}k</span>
                <div className="w-full bg-green-100 rounded-t-lg" style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}>
                  <div className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg h-full" />
                </div>
                <span className="text-xs text-gray-500">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Plan Breakdown</h3>
          <div className="space-y-4">
            {planBreakdown.map((p) => (
              <div key={p.plan}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${p.color}`} />
                    <span className="text-sm font-medium text-gray-900">{p.plan}</span>
                  </div>
                  <span className="text-sm text-gray-500">{p.members} members</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${p.color}`} style={{ width: `${p.percentage}%` }} />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">{p.revenue}/month</span>
                  <span className="text-xs font-medium text-gray-600">{p.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-6">Location Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Revenue</th>
                <th className="pb-3 font-medium">Members</th>
                <th className="pb-3 font-medium">Growth</th>
                <th className="pb-3 font-medium">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {locationPerformance.map((loc, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Building className="w-4 h-4 text-purple-600" />
                      </div>
                      {loc.name}
                    </div>
                  </td>
                  <td className="py-4 font-semibold text-gray-900">{loc.revenue}</td>
                  <td className="py-4 text-gray-600">{loc.members}</td>
                  <td className="py-4">
                    <span className={`text-xs font-semibold ${loc.trend === "up" ? "text-green-500" : "text-red-500"}`}>{loc.growth}</span>
                  </td>
                  <td className="py-4 w-48">
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${50 + i * 15}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
