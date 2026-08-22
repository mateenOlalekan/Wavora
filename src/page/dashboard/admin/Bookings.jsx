import { useState } from "react";
import {
  Calendar, Search, Filter, Plus, Clock, MapPin, User, DollarSign,
  ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertCircle, Eye,
  MoreHorizontal, Download, TrendingUp, ArrowUpRight, CalendarDays,
} from "lucide-react";

const mockBookings = [
  { id: "BK-1001", member: "Sarah Chen", email: "sarah@techcorp.com", space: "Private Office A", floor: "Floor 2", date: "2025-08-22", time: "9:00 AM - 5:00 PM", status: "confirmed", amount: 299, type: "Daily" },
  { id: "BK-1002", member: "Marcus Rodriguez", email: "marcus@designhub.io", space: "Meeting Room B", floor: "Floor 3", date: "2025-08-22", time: "11:30 AM - 1:30 PM", status: "confirmed", amount: 75, type: "Hourly" },
  { id: "BK-1003", member: "Dr. Aisha Bello", email: "aisha@medgroup.org", space: "Conference Hall", floor: "Floor 1", date: "2025-08-23", time: "2:00 PM - 6:00 PM", status: "pending", amount: 450, type: "Event" },
  { id: "BK-1004", member: "James Kim", email: "james@innovate.co", space: "Shared Desk 12", floor: "Floor 3", date: "2025-08-22", time: "8:00 AM - 12:00 PM", status: "cancelled", amount: 50, type: "Hourly" },
  { id: "BK-1005", member: "Emily Watson", email: "emily@creative.studio", space: "Media Studio", floor: "Floor 1", date: "2025-08-22", time: "4:30 PM - 7:30 PM", status: "confirmed", amount: 120, type: "Hourly" },
  { id: "BK-1006", member: "Lisa Thompson", email: "lisa@startup.io", space: "Private Office C", floor: "Floor 2", date: "2025-08-24", time: "9:00 AM - 5:00 PM", status: "confirmed", amount: 299, type: "Daily" },
  { id: "BK-1007", member: "David Park", email: "david@finance.com", space: "Meeting Room A", floor: "Floor 3", date: "2025-08-25", time: "10:00 AM - 12:00 PM", status: "pending", amount: 75, type: "Hourly" },
  { id: "BK-1008", member: "Rachel Green", email: "rachel@marketing.co", space: "Hot Desk", floor: "Floor 2", date: "2025-08-22", time: "1:00 PM - 5:00 PM", status: "confirmed", amount: 40, type: "Half-Day" },
];

const statusColors = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

const statusIcons = {
  confirmed: CheckCircle,
  pending: AlertCircle,
  cancelled: XCircle,
  completed: CheckCircle,
};

const calendarDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function generateCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

export default function AdminBookings() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState("list");
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7));
  const [selectedDate, setSelectedDate] = useState(22);

  const filtered = mockBookings.filter(
    (b) =>
      (b.member.toLowerCase().includes(search.toLowerCase()) || b.space.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "all" || b.status === statusFilter)
  );

  const calendarDays2 = generateCalendarDays(currentMonth.getFullYear(), currentMonth.getMonth());
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const todayBookings = mockBookings.filter((b) => b.date === "2025-08-22" && b.status !== "cancelled").length;
  const todayRevenue = mockBookings.filter((b) => b.date === "2025-08-22" && b.status === "confirmed").reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bookings Management</h2>
          <p className="text-gray-500 mt-1">View and manage all space bookings.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
            <Download size={16} /> Export
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm">
            <Plus size={16} /> New Booking
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Bookings", value: todayBookings, icon: Calendar, color: "bg-blue-50 text-blue-600", change: "+12%" },
          { label: "Today's Revenue", value: `$${todayRevenue}`, icon: DollarSign, color: "bg-green-50 text-green-600", change: "+8%" },
          { label: "Pending", value: mockBookings.filter((b) => b.status === "pending").length, icon: Clock, color: "bg-amber-50 text-amber-600", change: "-3%" },
          { label: "This Week", value: mockBookings.length, icon: CalendarDays, color: "bg-purple-50 text-purple-600", change: "+15%" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center`}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <div className="flex items-center gap-1">
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <span className="text-xs text-green-500 font-medium">{s.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Toggle & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button onClick={() => setView("list")} className={`px-4 py-2 text-sm font-medium transition ${view === "list" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}>List View</button>
          <button onClick={() => setView("calendar")} className={`px-4 py-2 text-sm font-medium transition ${view === "calendar" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}>Calendar</button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search bookings..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none w-56" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-500 outline-none">
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {view === "list" ? (
        /* List View */
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Booking ID</th>
                  <th className="px-6 py-3">Member</th>
                  <th className="px-6 py-3">Space</th>
                  <th className="px-6 py-3">Date & Time</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((booking) => {
                  const StatusIcon = statusIcons[booking.status];
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-4 text-sm font-mono text-gray-600">{booking.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">{booking.member.charAt(0)}</div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{booking.member}</p>
                            <p className="text-xs text-gray-500">{booking.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-900">{booking.space}</p>
                            <p className="text-xs text-gray-500">{booking.floor}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-gray-900">{booking.date}</p>
                          <p className="text-xs text-gray-500">{booking.time}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{booking.type}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">${booking.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[booking.status]}`}>
                          <StatusIcon size={12} /> {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Eye size={14} className="text-gray-500" /></button>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><MoreHorizontal size={14} className="text-gray-500" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Calendar View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">{monthName}</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 rounded-lg hover:bg-gray-100 transition"><ChevronLeft size={16} /></button>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 rounded-lg hover:bg-gray-100 transition"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {calendarDays.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays2.map((day, i) => (
                <button key={i} onClick={() => day && setSelectedDate(day)}
                  className={`aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition ${
                    day === selectedDate ? "bg-green-600 text-white font-semibold" : day ? "hover:bg-gray-100 text-gray-700" : ""
                  }`}>
                  {day}
                  {day && [22, 23, 24, 25].includes(day) && day !== selectedDate && (
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-0.5"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Day Details */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">August {selectedDate}, 2025</h3>
            <div className="space-y-3">
              {mockBookings.filter((b) => b.date === `2025-08-${String(selectedDate).padStart(2, "0")}`).map((b) => (
                <div key={b.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">{b.space}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[b.status]}`}>{b.status}</span>
                  </div>
                  <p className="text-xs text-gray-500">{b.member} • {b.time}</p>
                  <p className="text-xs font-medium text-gray-700 mt-1">${b.amount}</p>
                </div>
              ))}
              {mockBookings.filter((b) => b.date === `2025-08-${String(selectedDate).padStart(2, "0")}`).length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No bookings for this date</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
