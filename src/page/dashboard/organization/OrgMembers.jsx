import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  CheckCircle,
  XCircle,
  Building,
  Calendar,
} from "lucide-react";

const members = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", plan: "Premium", location: "Downtown Hub", joined: "Mar 2026", status: "active", bookings: 24, avatar: "SJ" },
  { id: 2, name: "Michael Chen", email: "michael@example.com", plan: "Standard", location: "Midtown Office", joined: "Jan 2026", status: "active", bookings: 18, avatar: "MC" },
  { id: 3, name: "Emma Wilson", email: "emma@example.com", plan: "Enterprise", location: "Downtown Hub", joined: "Feb 2026", status: "active", bookings: 42, avatar: "EW" },
  { id: 4, name: "James Rodriguez", email: "james@example.com", plan: "Basic", location: "Uptown Studio", joined: "Apr 2026", status: "active", bookings: 8, avatar: "JR" },
  { id: 5, name: "Lisa Park", email: "lisa@example.com", plan: "Premium", location: "Midtown Office", joined: "May 2026", status: "inactive", bookings: 12, avatar: "LP" },
  { id: 6, name: "David Kim", email: "david@example.com", plan: "Standard", location: "Downtown Hub", joined: "Jun 2026", status: "active", bookings: 15, avatar: "DK" },
  { id: 7, name: "Rachel Green", email: "rachel@example.com", plan: "Premium", location: "Uptown Studio", joined: "Jul 2026", status: "trial", bookings: 3, avatar: "RG" },
  { id: 8, name: "Tom Anderson", email: "tom@example.com", plan: "Enterprise", location: "Midtown Office", joined: "Aug 2026", status: "active", bookings: 6, avatar: "TA" },
];

export default function OrgMembers() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = members.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === "all" || m.plan.toLowerCase() === planFilter;
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchPlan && matchStatus;
  });

  const statusColor = (s) => {
    switch (s) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-600";
      case "trial": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const planColor = (p) => {
    switch (p) {
      case "Enterprise": return "bg-purple-100 text-purple-800";
      case "Premium": return "bg-green-100 text-green-800";
      case "Standard": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-600 mt-1">Manage all members across your locations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Member
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total Members</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{members.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{members.filter((m) => m.status === "active").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">On Trial</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{members.filter((m) => m.status === "trial").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Inactive</p>
          <p className="text-2xl font-bold text-gray-500 mt-1">{members.filter((m) => m.status === "inactive").length}</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
          >
            <option value="all">All Plans</option>
            <option value="enterprise">Enterprise</option>
            <option value="premium">Premium</option>
            <option value="standard">Standard</option>
            <option value="basic">Basic</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Member</th>
                <th className="pb-3 font-medium">Plan</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Joined</th>
                <th className="pb-3 font-medium">Bookings</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-green-700">{m.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-500">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${planColor(m.plan)}`}>{m.plan}</span></td>
                  <td className="py-4 text-gray-600">{m.location}</td>
                  <td className="py-4 text-gray-500">{m.joined}</td>
                  <td className="py-4 font-medium text-gray-900">{m.bookings}</td>
                  <td className="py-4"><span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColor(m.status)}`}>{m.status}</span></td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition"><Eye className="w-4 h-4 text-gray-400" /></button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition"><Edit className="w-4 h-4 text-gray-400" /></button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-4 h-4 text-red-400" /></button>
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
