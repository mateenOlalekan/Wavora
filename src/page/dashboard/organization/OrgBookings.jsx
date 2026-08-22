import { useState } from "react";
import {
  Calendar,
  Search,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreVertical,
  Filter,
} from "lucide-react";

const bookings = [
  { id: "BK-2001", member: "Sarah Johnson", space: "Private Office A", location: "Downtown Hub", date: "Aug 22, 2026", time: "09:00 – 17:00", status: "confirmed", amount: "$299" },
  { id: "BK-2002", member: "Michael Chen", space: "Meeting Room Horizon", location: "Midtown Office", date: "Aug 22, 2026", time: "10:00 – 11:30", status: "checked-in", amount: "$75" },
  { id: "BK-2003", member: "Emma Wilson", space: "Conference Hall", location: "Downtown Hub", date: "Aug 22, 2026", time: "14:00 – 17:00", status: "confirmed", amount: "$450" },
  { id: "BK-2004", member: "James Rodriguez", space: "Hot Desk Zone B", location: "Uptown Studio", date: "Aug 23, 2026", time: "08:00 – 18:00", status: "pending", amount: "$50" },
  { id: "BK-2005", member: "Lisa Park", space: "Media Studio", location: "Midtown Office", date: "Aug 23, 2026", time: "11:00 – 13:00", status: "confirmed", amount: "$120" },
  { id: "BK-2006", member: "David Kim", space: "Hot Desk Zone A", location: "Downtown Hub", date: "Aug 24, 2026", time: "09:00 – 17:00", status: "cancelled", amount: "$50" },
];

export default function OrgBookings() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = bookings.filter((b) => {
    const matchSearch = b.member.toLowerCase().includes(search.toLowerCase()) || b.space.toLowerCase().includes(search.toLowerCase()) || b.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || b.status === filter;
    return matchSearch && matchFilter;
  });

  const statusColor = (s) => {
    switch (s) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "checked-in": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const totalRevenue = bookings.filter((b) => b.status !== "cancelled").reduce((sum, b) => sum + parseInt(b.amount.replace("$", "")), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-600 mt-1">View and manage all bookings across locations.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{bookings.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Confirmed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{bookings.filter((b) => b.status === "confirmed").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{bookings.filter((b) => b.status === "pending").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search bookings..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
          <div className="flex gap-2">
            {["all", "confirmed", "checked-in", "pending", "cancelled"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition ${filter === f ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {f.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Member</th>
                <th className="pb-3 font-medium">Space</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 font-medium text-green-600">{b.id}</td>
                  <td className="py-4 font-medium text-gray-900">{b.member}</td>
                  <td className="py-4 text-gray-600">{b.space}</td>
                  <td className="py-4 text-gray-500">{b.location}</td>
                  <td className="py-4 text-gray-500">{b.date}</td>
                  <td className="py-4 text-gray-500">{b.time}</td>
                  <td className="py-4"><span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor(b.status)}`}>{b.status.replace("-", " ")}</span></td>
                  <td className="py-4 font-medium text-gray-900">{b.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
