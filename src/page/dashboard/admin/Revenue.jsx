import {
  DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  BarChart3, PieChart, Download, Calendar, CreditCard, Users,
  Building, Filter, ChevronDown, ArrowRight,
} from "lucide-react";
import { useState } from "react";

const monthlyRevenue = [
  { month: "Jan", revenue: 42000, target: 40000 },
  { month: "Feb", revenue: 45000, target: 42000 },
  { month: "Mar", revenue: 51000, target: 45000 },
  { month: "Apr", revenue: 48000, target: 47000 },
  { month: "May", revenue: 55000, target: 50000 },
  { month: "Jun", revenue: 62000, target: 55000 },
  { month: "Jul", revenue: 58000, target: 58000 },
  { month: "Aug", revenue: 67500, target: 60000 },
];

const revenueStreams = [
  { name: "Monthly Memberships", amount: 48500, percentage: 72, color: "bg-green-500" },
  { name: "Meeting Room Rentals", amount: 8200, percentage: 12, color: "bg-blue-500" },
  { name: "Event Space Bookings", amount: 5100, percentage: 7.5, color: "bg-purple-500" },
  { name: "Day Passes & Weekly", amount: 3400, percentage: 5, color: "bg-amber-500" },
  { name: "Add-on Services", amount: 2300, percentage: 3.5, color: "bg-pink-500" },
];

const recentTransactions = [
  { id: 1, description: "Monthly Pro - Sarah Chen", amount: 20000, type: "membership", date: "Aug 22, 2025" },
  { id: 2, description: "Meeting Room B - Marcus R.", amount: 7500, type: "booking", date: "Aug 22, 2025" },
  { id: 3, description: "Yearly Elite - Lisa Thompson", amount: 240500, type: "membership", date: "Aug 21, 2025" },
  { id: 4, description: "Conference Hall - Dr. Aisha B.", amount: 45000, type: "event", date: "Aug 21, 2025" },
  { id: 5, description: "Hot Desk - Rachel Green", amount: 4000, type: "booking", date: "Aug 20, 2025" },
  { id: 6, description: "Media Studio - Emily Watson", amount: 12000, type: "booking", date: "Aug 20, 2025" },
];

const typeColors = {
  membership: "bg-green-100 text-green-700",
  booking: "bg-blue-100 text-blue-700",
  event: "bg-purple-100 text-purple-700",
};

const maxRevenue = Math.max(...monthlyRevenue.map((m) => Math.max(m.revenue, m.target)));

export default function AdminRevenue() {
  const [period, setPeriod] = useState("8months");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Revenue Analytics</h2>
          <p className="text-gray-500 mt-1">Track financial performance and revenue streams.</p>
        </div>
        <div className="flex gap-3">
          <select value={period} onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-green-500 outline-none">
            <option value="30days">Last 30 Days</option>
            <option value="3months">Last 3 Months</option>
            <option value="8months">Last 8 Months</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$67,500", change: "+12.5%", trend: "up", icon: DollarSign, color: "bg-green-50 text-green-600", sub: "This month" },
          { label: "Avg. per Member", value: "$1,850", change: "+5.2%", trend: "up", icon: Users, color: "bg-blue-50 text-blue-600", sub: "Monthly average" },
          { label: "Revenue Growth", value: "18.3%", change: "+2.1%", trend: "up", icon: TrendingUp, color: "bg-purple-50 text-purple-600", sub: "vs last month" },
          { label: "Outstanding", value: "$4,200", change: "-8.4%", trend: "down", icon: CreditCard, color: "bg-amber-50 text-amber-600", sub: "Pending payments" },
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{m.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{m.value}</p>
                <p className="text-xs text-gray-400 mt-1">{m.sub}</p>
              </div>
              <div className={`w-10 h-10 ${m.color} rounded-xl flex items-center justify-center`}>
                <m.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {m.trend === "up" ? <ArrowUpRight size={14} className="text-green-500" /> : <ArrowDownRight size={14} className="text-red-500" />}
              <span className={`text-xs font-semibold ${m.trend === "up" ? "text-green-500" : "text-red-500"}`}>{m.change}</span>
              <span className="text-xs text-gray-400 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-900">Revenue vs Target</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-green-500 rounded-full"></span> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-gray-300 rounded-full"></span> Target</span>
          </div>
        </div>
        <div className="flex items-end gap-3 h-64">
          {monthlyRevenue.map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end gap-1 justify-center" style={{ height: "220px" }}>
                <div className="w-4 bg-green-500 rounded-t-lg transition-all duration-500 hover:bg-green-600"
                  style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}></div>
                <div className="w-4 bg-gray-200 rounded-t-lg transition-all duration-500"
                  style={{ height: `${(m.target / maxRevenue) * 100}%` }}></div>
              </div>
              <span className="text-xs font-medium text-gray-500">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Streams */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Revenue Streams</h3>
          <div className="space-y-4">
            {revenueStreams.map((stream, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-700 font-medium">{stream.name}</span>
                  <span className="text-sm font-semibold text-gray-900">${stream.amount.toLocaleString()}</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${stream.color} rounded-full transition-all duration-700`} style={{ width: `${stream.percentage}%` }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{stream.percentage}% of total</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
            <button className="text-sm text-green-600 font-medium hover:text-green-700 transition flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50/50 transition">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeColors[tx.type]}`}>
                    {tx.type === "membership" ? <Users size={14} /> : tx.type === "booking" ? <Calendar size={14} /> : <Building size={14} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-green-600">+${tx.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
