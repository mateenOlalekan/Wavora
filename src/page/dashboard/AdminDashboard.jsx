import { useState } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Plus,
  Building,
  CreditCard,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";

// Mock data
const stats = [
  {
    title: "Total Revenue",
    value: "$124,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Active Members",
    value: "2,847",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Bookings Today",
    value: "156",
    change: "+23.1%",
    trend: "up",
    icon: Calendar,
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Occupancy Rate",
    value: "87.3%",
    change: "-2.4%",
    trend: "down",
    icon: TrendingUp,
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
  },
];

const recentBookings = [
  {
    id: 1,
    member: "Sarah Chen",
    space: "Private Office A",
    date: "Today, 9:00 AM",
    status: "confirmed",
    amount: "$299",
  },
  {
    id: 2,
    member: "Marcus Rodriguez",
    space: "Meeting Room B",
    date: "Today, 11:30 AM",
    status: "pending",
    amount: "$75",
  },
  {
    id: 3,
    member: "Dr. Aisha Bello",
    space: "Conference Hall",
    date: "Tomorrow, 2:00 PM",
    status: "confirmed",
    amount: "$450",
  },
  {
    id: 4,
    member: "James Kim",
    space: "Shared Desk",
    date: "Today, 3:00 PM",
    status: "cancelled",
    amount: "$50",
  },
  {
    id: 5,
    member: "Emily Watson",
    space: "Media Studio",
    date: "Today, 4:30 PM",
    status: "confirmed",
    amount: "$120",
  },
];

const recentMembers = [
  {
    id: 1,
    name: "Olivia Taylor",
    email: "olivia@example.com",
    plan: "Monthly Pro",
    joined: "2 days ago",
    status: "active",
  },
  {
    id: 2,
    name: "Daniel Lee",
    email: "daniel@example.com",
    plan: "Yearly Elite",
    joined: "1 week ago",
    status: "active",
  },
  {
    id: 3,
    name: "Sophia Garcia",
    email: "sophia@example.com",
    plan: "Weekly Pass",
    joined: "3 days ago",
    status: "active",
  },
  {
    id: 4,
    name: "Liam Johnson",
    email: "liam@example.com",
    plan: "Monthly Pro",
    joined: "5 days ago",
    status: "trial",
  },
];

const statusColors = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
  active: "bg-green-100 text-green-700",
  trial: "bg-blue-100 text-blue-700",
};

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, Admin
          </h2>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your workspace today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm">
            <Plus size={16} />
            Add Member
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center`}
              >
                <stat.icon className="w-5 h-5 text-gray-700" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {stat.trend === "up" ? (
                <ArrowUpRight size={14} className="text-green-500" />
              ) : (
                <ArrowDownRight size={14} className="text-red-500" />
              )}
              <span
                className={`text-xs font-semibold ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-xs text-gray-400 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Bookings</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                <Filter size={16} className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Member</th>
                  <th className="px-6 py-3">Space</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50/50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                          {booking.member.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {booking.member}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.space}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          statusColors[booking.status]
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {booking.amount}
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 rounded-lg hover:bg-gray-100 transition">
                        <MoreHorizontal size={16} className="text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: Users,
                  label: "Add User",
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  icon: Calendar,
                  label: "New Booking",
                  color: "bg-green-50 text-green-600",
                },
                {
                  icon: Building,
                  label: "Add Space",
                  color: "bg-purple-50 text-purple-600",
                },
                {
                  icon: CreditCard,
                  label: "Payments",
                  color: "bg-amber-50 text-amber-600",
                },
              ].map((action, i) => (
                <button
                  key={i}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all duration-200"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon size={18} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>


          {/* Recent Alerts */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              {[
                {
                  icon: AlertCircle,
                  color: "text-amber-500",
                  text: "Space A needs maintenance",
                  time: "2h ago",
                },
                {
                  icon: CheckCircle,
                  color: "text-green-500",
                  text: "Payment received from Olivia",
                  time: "3h ago",
                },
                {
                  icon: Clock,
                  color: "text-blue-500",
                  text: "3 new booking requests",
                  time: "5h ago",
                },
                {
                  icon: Star,
                  color: "text-amber-400",
                  text: "New 5-star review posted",
                  time: "1d ago",
                },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-3">
                  <alert.icon size={16} className={`${alert.color} mt-0.5`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{alert.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Members Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Recent Members</h3>
          <button className="text-sm text-green-600 font-medium hover:text-green-700 transition">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Member</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50/50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {member.plan}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {member.joined}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        statusColors[member.status]
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                        <Eye size={14} className="text-gray-500" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                        <Edit size={14} className="text-gray-500" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition">
                        <Trash2 size={14} className="text-red-500" />
                      </button>
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
