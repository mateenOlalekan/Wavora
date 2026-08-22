import { useState } from "react";
import {
  CheckCircle,
  Search,
  User,
  Clock,
  QrCode,
  UserPlus,
  UserMinus,
  AlertTriangle,
  Calendar,
  Filter,
  RefreshCw,
} from "lucide-react";

const todayCheckins = [
  { id: 1, name: "Sarah Johnson", type: "Member", plan: "Premium", time: "08:15 AM", status: "checked-in", avatar: "SJ" },
  { id: 2, name: "Michael Chen", type: "Member", plan: "Standard", time: "08:45 AM", status: "checked-in", avatar: "MC" },
  { id: 3, name: "Emma Wilson", type: "Guest", plan: "Day Pass", time: "09:00 AM", status: "checked-in", avatar: "EW" },
  { id: 4, name: "James Rodriguez", type: "Member", plan: "Premium", time: "09:30 AM", status: "checked-in", avatar: "JR" },
  { id: 5, name: "Lisa Park", type: "Member", plan: "Basic", time: "10:00 AM", status: "checked-out", avatar: "LP" },
  { id: 6, name: "David Kim", type: "Guest", plan: "Meeting Room", time: "10:15 AM", status: "checked-in", avatar: "DK" },
  { id: 7, name: "Rachel Green", type: "Member", plan: "Standard", time: "10:30 AM", status: "expected", avatar: "RG" },
  { id: 8, name: "Tom Anderson", type: "Member", plan: "Premium", time: "11:00 AM", status: "expected", avatar: "TA" },
];

export default function StaffCheckin() {
  const [search, setSearch] = useState("");
  const [scanMode, setScanMode] = useState(false);
  const [filter, setFilter] = useState("all");

  const filtered = todayCheckins.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const checkedIn = todayCheckins.filter((c) => c.status === "checked-in").length;
  const checkedOut = todayCheckins.filter((c) => c.status === "checked-out").length;
  const expected = todayCheckins.filter((c) => c.status === "expected").length;

  const statusColor = (status) => {
    switch (status) {
      case "checked-in": return "bg-green-100 text-green-800";
      case "checked-out": return "bg-gray-100 text-gray-600";
      case "expected": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Check-in Desk</h1>
          <p className="text-gray-600 mt-1">Manage daily member and guest arrivals.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setScanMode(!scanMode)}
            className={`px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition ${
              scanMode
                ? "bg-green-600 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <QrCode className="w-5 h-5" />
            {scanMode ? "Scanning..." : "Scan QR Code"}
          </button>
          <button className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2">
            <UserPlus className="w-5 h-5" /> Walk-in Guest
          </button>
        </div>
      </div>

      {/* QR Scanner Placeholder */}
      {scanMode && (
        <div className="bg-gray-900 rounded-xl p-12 text-center">
          <div className="w-48 h-48 border-4 border-green-400 rounded-2xl mx-auto flex items-center justify-center relative">
            <QrCode className="w-20 h-20 text-green-400" />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-lg" />
          </div>
          <p className="text-green-400 mt-6 font-medium">Position QR code within the frame</p>
          <button
            onClick={() => setScanMode(false)}
            className="mt-4 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition text-sm"
          >
            Cancel Scanner
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{checkedIn}</p>
              <p className="text-xs text-gray-500">Checked In</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <UserMinus className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{checkedOut}</p>
              <p className="text-xs text-gray-500">Checked Out</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{expected}</p>
              <p className="text-xs text-gray-500">Expected</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{todayCheckins.length}</p>
              <p className="text-xs text-gray-500">Total Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            {[
              { value: "all", label: "All" },
              { value: "checked-in", label: "Checked In" },
              { value: "checked-out", label: "Checked Out" },
              { value: "expected", label: "Expected" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  filter === f.value
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Check-in List */}
        <div className="divide-y divide-gray-100">
          {filtered.map((person) => (
            <div key={person.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-green-700 text-sm">{person.avatar}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{person.name}</p>
                  <p className="text-sm text-gray-500">
                    {person.type} · {person.plan} · {person.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor(person.status)}`}>
                  {person.status.replace("-", " ")}
                </span>
                {person.status === "expected" && (
                  <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition">
                    Check In
                  </button>
                )}
                {person.status === "checked-in" && (
                  <button className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-300 transition">
                    Check Out
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No check-ins match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
