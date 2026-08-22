import { useState } from "react";
import {
  Users as UsersIcon, Search, Filter, Plus, Eye, Edit, Trash2,
  MoreHorizontal, Download, Upload, Shield, UserCheck, UserX,
  Mail, Phone, ChevronDown, CheckCircle, XCircle, ArrowUpRight,
} from "lucide-react";

const mockUsers = [
  { id: 1, name: "Sarah Chen", email: "sarah@techcorp.com", phone: "+1 555-0101", role: "member", plan: "Yearly Elite", status: "active", joined: "Jan 12, 2024", lastActive: "2 min ago", avatar: "SC" },
  { id: 2, name: "Marcus Rodriguez", email: "marcus@designhub.io", phone: "+1 555-0102", role: "member", plan: "Monthly Pro", status: "active", joined: "Mar 5, 2024", lastActive: "15 min ago", avatar: "MR" },
  { id: 3, name: "Dr. Aisha Bello", email: "aisha@medgroup.org", phone: "+1 555-0103", role: "staff", plan: "N/A", status: "active", joined: "Feb 1, 2024", lastActive: "1 hr ago", avatar: "AB" },
  { id: 4, name: "James Kim", email: "james@innovate.co", phone: "+1 555-0104", role: "member", plan: "Weekly Pass", status: "active", joined: "Jun 20, 2024", lastActive: "5 min ago", avatar: "JK" },
  { id: 5, name: "Emily Watson", email: "emily@creative.studio", phone: "+1 555-0105", role: "member", plan: "Monthly Pro", status: "suspended", joined: "Apr 10, 2024", lastActive: "3 days ago", avatar: "EW" },
  { id: 6, name: "David Park", email: "david@finance.com", phone: "+1 555-0106", role: "staff", plan: "N/A", status: "active", joined: "Jan 15, 2024", lastActive: "30 min ago", avatar: "DP" },
  { id: 7, name: "Lisa Thompson", email: "lisa@startup.io", phone: "+1 555-0107", role: "member", plan: "Yearly Elite", status: "active", joined: "Sep 1, 2023", lastActive: "1 hr ago", avatar: "LT" },
  { id: 8, name: "Omar Hassan", email: "omar@consulting.biz", phone: "+1 555-0108", role: "member", plan: "Monthly Pro", status: "inactive", joined: "Nov 12, 2023", lastActive: "2 weeks ago", avatar: "OH" },
  { id: 9, name: "Rachel Green", email: "rachel@marketing.co", phone: "+1 555-0109", role: "member", plan: "Weekly Pass", status: "active", joined: "Jul 8, 2024", lastActive: "10 min ago", avatar: "RG" },
  { id: 10, name: "Tom Bradley", email: "tom@enterprise.com", phone: "+1 555-0110", role: "admin", plan: "N/A", status: "active", joined: "Jan 1, 2023", lastActive: "Just now", avatar: "TB" },
];

const roleColors = {
  admin: "bg-red-100 text-red-700",
  staff: "bg-blue-100 text-blue-700",
  member: "bg-green-100 text-green-700",
};

const statusColors = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-600",
  suspended: "bg-red-100 text-red-700",
};

const planColors = {
  "Yearly Elite": "bg-purple-100 text-purple-700",
  "Monthly Pro": "bg-blue-100 text-blue-700",
  "Weekly Pass": "bg-amber-100 text-amber-700",
  "N/A": "bg-gray-100 text-gray-500",
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const filtered = mockUsers.filter(
    (u) =>
      (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter === "all" || u.role === roleFilter) &&
      (statusFilter === "all" || u.status === statusFilter)
  );

  const toggleSelect = (id) => {
    setSelectedUsers((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const toggleAll = () => {
    if (selectedUsers.length === filtered.length) setSelectedUsers([]);
    else setSelectedUsers(filtered.map((u) => u.id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-500 mt-1">Manage all users, roles, and permissions.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
            <Download size={16} /> Export CSV
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
            <Upload size={16} /> Import
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm">
            <Plus size={16} /> Add User
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "1,247", icon: UsersIcon, color: "bg-blue-50 text-blue-600" },
          { label: "Active Members", value: "1,089", icon: UserCheck, color: "bg-green-50 text-green-600" },
          { label: "Staff Members", value: "24", icon: Shield, color: "bg-purple-50 text-purple-600" },
          { label: "Suspended", value: "8", icon: UserX, color: "bg-red-50 text-red-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center`}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 border-b border-gray-100 gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none w-64"
              />
            </div>
            <select
              value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="member">Member</option>
            </select>
            <select
              value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          {selectedUsers.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{selectedUsers.length} selected</span>
              <button className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition">Bulk Delete</button>
              <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition">Change Role</button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3 w-10">
                  <input type="checkbox" checked={selectedUsers.length === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                </th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3">Last Active</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => toggleSelect(user.id)} className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">{user.avatar}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${roleColors[user.role]}`}>{user.role}</span></td>
                  <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${planColors[user.plan]}`}>{user.plan}</span></td>
                  <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[user.status]}`}>{user.status}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.joined}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.lastActive}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Eye size={14} className="text-gray-500" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Edit size={14} className="text-gray-500" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 transition"><Trash2 size={14} className="text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Showing {filtered.length} of {mockUsers.length} users</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition">Previous</button>
            <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium">1</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition">2</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition">3</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
