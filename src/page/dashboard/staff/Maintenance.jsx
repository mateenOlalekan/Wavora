import { useState } from "react";
import {
  Wrench,
  Search,
  AlertTriangle,
  Clock,
  CheckCircle,
  Filter,
  Plus,
  MoreVertical,
  Thermometer,
  Wifi,
  Droplets,
  Lightbulb,
  DoorOpen,
  Monitor,
} from "lucide-react";

const requests = [
  {
    id: "MR-001",
    title: "AC not cooling in Zone B",
    area: "Hot Desk — Zone B",
    priority: "high",
    status: "in-progress",
    reportedBy: "Sarah Johnson",
    date: "Aug 22, 2026",
    icon: Thermometer,
    assignee: "Maintenance Team",
  },
  {
    id: "MR-002",
    title: "Wi-Fi connectivity issues",
    area: "Meeting Room — Horizon",
    priority: "medium",
    status: "open",
    reportedBy: "Michael Chen",
    date: "Aug 22, 2026",
    icon: Wifi,
    assignee: "Unassigned",
  },
  {
    id: "MR-003",
    title: "Leaky faucet in kitchen",
    area: "Kitchen — Floor 2",
    priority: "low",
    status: "resolved",
    reportedBy: "Lisa Park",
    date: "Aug 21, 2026",
    icon: Droplets,
    assignee: "Plumbing Co.",
  },
  {
    id: "MR-004",
    title: "Broken overhead light",
    area: "Private Office — 203",
    priority: "medium",
    status: "open",
    reportedBy: "Emma Wilson",
    date: "Aug 21, 2026",
    icon: Lightbulb,
    assignee: "Unassigned",
  },
  {
    id: "MR-005",
    title: "Door lock jammed",
    area: "Main Entrance",
    priority: "high",
    status: "resolved",
    reportedBy: "Staff",
    date: "Aug 20, 2026",
    icon: DoorOpen,
    assignee: "Security Team",
  },
  {
    id: "MR-006",
    title: "Projector not displaying",
    area: "Meeting Room — Peak",
    priority: "medium",
    status: "in-progress",
    reportedBy: "James Rodriguez",
    date: "Aug 20, 2026",
    icon: Monitor,
    assignee: "IT Support",
  },
];

export default function StaffMaintenance() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = requests.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.area.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || r.status === filter;
    return matchSearch && matchFilter;
  });

  const statusColor = (s) => {
    switch (s) {
      case "open": return "bg-yellow-100 text-yellow-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const priorityColor = (p) => {
    switch (p) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-orange-100 text-orange-700";
      case "low": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const openCount = requests.filter((r) => r.status === "open").length;
  const inProgressCount = requests.filter((r) => r.status === "in-progress").length;
  const resolvedCount = requests.filter((r) => r.status === "resolved").length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Maintenance</h1>
          <p className="text-gray-600 mt-1">Track and manage facility maintenance requests.</p>
        </div>
        <button className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{openCount}</p>
              <p className="text-xs text-gray-500">Open</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{inProgressCount}</p>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{resolvedCount}</p>
              <p className="text-xs text-gray-500">Resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            {["all", "open", "in-progress", "resolved"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition ${
                  filter === f ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-3">
          {filtered.map((req) => {
            const Icon = req.icon;
            return (
              <div key={req.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{req.title}</h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColor(req.priority)}`}>
                          {req.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {req.area} · Reported by {req.reportedBy} · {req.date}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Assigned to: {req.assignee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor(req.status)}`}>
                      {req.status.replace("-", " ")}
                    </span>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
