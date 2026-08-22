import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Eye,
  Shield,
  Crown,
  UserCheck,
  MoreVertical,
} from "lucide-react";

const teamMembers = [
  { id: 1, name: "Alex Thompson", email: "alex@wavora.com", phone: "+1 (555) 100-1001", role: "General Manager", location: "Downtown Hub", status: "active", avatar: "AT" },
  { id: 2, name: "Maria Santos", email: "maria@wavora.com", phone: "+1 (555) 100-1002", role: "Operations Lead", location: "Midtown Office", status: "active", avatar: "MS" },
  { id: 3, name: "John Davis", email: "john@wavora.com", phone: "+1 (555) 100-1003", role: "Front Desk Staff", location: "Downtown Hub", status: "active", avatar: "JD" },
  { id: 4, name: "Rachel Kim", email: "rachel@wavora.com", phone: "+1 (555) 100-1004", role: "Front Desk Staff", location: "Uptown Studio", status: "active", avatar: "RK" },
  { id: 5, name: "David Park", email: "david@wavora.com", phone: "+1 (555) 100-1005", role: "Maintenance Lead", location: "All Locations", status: "active", avatar: "DP" },
  { id: 6, name: "Emily Chen", email: "emily@wavora.com", phone: "+1 (555) 100-1006", role: "Events Coordinator", location: "Downtown Hub", status: "active", avatar: "EC" },
];

export default function OrgTeam() {
  const [search, setSearch] = useState("");

  const filtered = teamMembers.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase()));

  const roleIcon = (role) => {
    if (role.includes("Manager") || role.includes("Lead")) return <Crown className="w-4 h-4 text-amber-500" />;
    if (role.includes("Front Desk") || role.includes("Staff")) return <UserCheck className="w-4 h-4 text-blue-500" />;
    return <Shield className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-600 mt-1">Manage your staff and team members across all locations.</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total Staff</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{teamMembers.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Managers</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Front Desk</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Support Staff</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search team members..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((member) => (
            <div key={member.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-green-700">{member.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {roleIcon(member.role)}
                      <span className="text-xs text-gray-500">{member.role}</span>
                    </div>
                  </div>
                </div>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> {member.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> {member.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> {member.location}
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                <button className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-1">
                  <Edit className="w-3 h-3" /> Edit
                </button>
                <button className="flex-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-1">
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
