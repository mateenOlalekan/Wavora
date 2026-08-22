import { useState } from "react";
import {
  Calendar,
  Search,
  Clock,
  MapPin,
  User,
  Filter,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Eye,
  XCircle,
  RefreshCw,
} from "lucide-react";

const bookings = [
  {
    id: "BK-1001",
    member: "Sarah Johnson",
    space: "Hot Desk — Zone A",
    date: "Aug 22, 2026",
    time: "09:00 AM – 05:00 PM",
    status: "confirmed",
    avatar: "SJ",
  },
  {
    id: "BK-1002",
    member: "Michael Chen",
    space: "Meeting Room — Horizon",
    date: "Aug 22, 2026",
    time: "10:00 AM – 11:30 AM",
    status: "checked-in",
    avatar: "MC",
  },
  {
    id: "BK-1003",
    member: "Emma Wilson",
    space: "Private Office — 201",
    date: "Aug 22, 2026",
    time: "08:00 AM – 06:00 PM",
    status: "confirmed",
    avatar: "EW",
  },
  {
    id: "BK-1004",
    member: "James Rodriguez",
    space: "Meeting Room — Peak",
    date: "Aug 22, 2026",
    time: "02:00 PM – 03:00 PM",
    status: "cancelled",
    avatar: "JR",
  },
  {
    id: "BK-1005",
    member: "Lisa Park",
    space: "Event Space — Main Hall",
    date: "Aug 23, 2026",
    time: "06:00 PM – 09:00 PM",
    status: "confirmed",
    avatar: "LP",
  },
  {
    id: "BK-1006",
    member: "David Kim",
    space: "Hot Desk — Zone B",
    date: "Aug 23, 2026",
    time: "09:00 AM – 05:00 PM",
    status: "pending",
    avatar: "DK",
  },
  {
    id: "BK-1007",
    member: "Rachel Green",
    space: "Meeting Room — Summit",
    date: "Aug 24, 2026",
    time: "11:00 AM – 12:30 PM",
    status: "confirmed",
    avatar: "RG",
  },
];

export default function StaffBookings() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.member.toLowerCase().includes(search.toLowerCase()) ||
      b.space.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || b.status === filter;
    return matchSearch && matchFilter;
  });

  const statusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "checked-in": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const statusIcon = (status) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="w-3.5 h-3.5" />;
      case "checked-in": return <Clock className="w-3.5 h-3.5" />;
      case "pending": return <AlertCircle className="w-3.5 h-3.5" />;
      case "cancelled": return <XCircle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-600 mt-1">View and manage all member bookings.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Today", count: 3, color: "green" },
          { label: "This Week", count: 12, color: "blue" },
          { label: "Pending", count: 1, color: "yellow" },
          { label: "Cancelled", count: 1, color: "red" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.count}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "confirmed", "checked-in", "pending", "cancelled"].map((f) => (
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Booking ID</th>
                <th className="pb-3 font-medium">Member</th>
                <th className="pb-3 font-medium">Space</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((b) => (
                <tr key={b.id} className="text-gray-700 hover:bg-gray-50">
                  <td className="py-4 font-medium text-green-600">{b.id}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-green-700">{b.avatar}</span>
                      </div>
                      {b.member}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" /> {b.space}
                    </div>
                  </td>
                  <td className="py-4">{b.date}</td>
                  <td className="py-4 text-gray-500">{b.time}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${statusColor(b.status)}`}>
                      {statusIcon(b.status)} {b.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No bookings found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
