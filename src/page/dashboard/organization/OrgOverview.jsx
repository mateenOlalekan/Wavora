import { useState } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  MapPin,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  { title: "Total Members", value: "342", change: "+15.3%", trend: "up", icon: Users, bgColor: "bg-purple-50" },
  { title: "Monthly Revenue", value: "$68,400", change: "+8.7%", trend: "up", icon: DollarSign, bgColor: "bg-green-50" },
  { title: "Active Bookings", value: "89", change: "+22.1%", trend: "up", icon: Calendar, bgColor: "bg-blue-50" },
  { title: "Occupancy Rate", value: "78.5%", change: "+3.2%", trend: "up", icon: TrendingUp, bgColor: "bg-amber-50" },
];

const locations = [
  { name: "Downtown Hub", members: 156, occupancy: 82, revenue: "$32,100" },
  { name: "Midtown Office", members: 98, occupancy: 74, revenue: "$21,300" },
  { name: "Uptown Studio", members: 88, occupancy: 79, revenue: "$15,000" },
];

const recentActivity = [
  { action: "New member joined", detail: "Olivia Taylor — Downtown Hub", time: "10 min ago", icon: Users, color: "text-green-500" },
  { action: "Booking confirmed", detail: "Meeting Room A — 3:00 PM", time: "25 min ago", icon: Calendar, color: "text-blue-500" },
  { action: "Payment received", detail: "$299 from Daniel Lee", time: "1 hr ago", icon: DollarSign, color: "text-green-500" },
  { action: "Maintenance resolved", detail: "AC filter replaced — Midtown", time: "2 hrs ago", icon: CheckCircle, color: "text-green-500" },
  { action: "Alert: High occupancy", detail: "Downtown Hub at 92%", time: "3 hrs ago", icon: AlertCircle, color: "text-amber-500" },
];

export default function OrganizationDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Organization Overview</h2>
          <p className="text-gray-500 mt-1">Manage your coworking spaces, members, and operations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
            <BarChart3 size={16} /> View Reports
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm">
            <Building size={16} /> Add Location
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-gray-700" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {stat.trend === "up" ? <ArrowUpRight size={14} className="text-green-500" /> : <ArrowDownRight size={14} className="text-red-500" />}
              <span className={`text-xs font-semibold ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>{stat.change}</span>
              <span className="text-xs text-gray-400 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Locations (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Locations</h3>
            <button className="text-sm text-green-600 font-medium hover:text-green-700 transition">Manage All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {locations.map((loc, i) => (
              <div key={i} className="px-6 py-4 hover:bg-gray-50/50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{loc.name}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                        <span className="flex items-center gap-1"><Users size={12} /> {loc.members} members</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {loc.occupancy}% occupancy</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{loc.revenue}</p>
                    <p className="text-xs text-gray-500">monthly revenue</p>
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-purple-500 h-1.5 rounded-full transition-all" style={{ width: `${loc.occupancy}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((activity, i) => (
              <div key={i} className="px-6 py-3 hover:bg-gray-50/50 transition">
                <div className="flex items-start gap-3">
                  <activity.icon size={16} className={`${activity.color} mt-0.5 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 truncate">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
