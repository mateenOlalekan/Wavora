import { useState } from "react";
import {
  Calendar, Clock, MapPin, Plus, Filter, Search, ChevronRight,
  CheckCircle, AlertCircle, XCircle, ArrowRight, Building,
  CreditCard, Wifi, Coffee,
} from "lucide-react";

const upcomingBookings = [
  { id: 1, space: "Private Office A", floor: "Floor 2", date: "Today, Aug 22", time: "9:00 AM - 5:00 PM", status: "confirmed", amount: "$299", amenities: ["WiFi", "AC", "Monitor"] },
  { id: 2, space: "Meeting Room B", floor: "Floor 3", date: "Tomorrow, Aug 23", time: "2:00 PM - 4:00 PM", status: "confirmed", amount: "$75", amenities: ["WiFi", "TV", "Video Conf"] },
  { id: 3, space: "Conference Hall", floor: "Floor 1", date: "Aug 25", time: "10:00 AM - 12:00 PM", status: "pending", amount: "$450", amenities: ["WiFi", "Projector", "Sound"] },
];

const pastBookings = [
  { id: 4, space: "Shared Desk 5", floor: "Floor 3", date: "Aug 18", time: "9:00 AM - 5:00 PM", status: "completed", amount: "$40" },
  { id: 5, space: "Meeting Room A", floor: "Floor 3", date: "Aug 15", time: "2:00 PM - 4:00 PM", status: "completed", amount: "$75" },
  { id: 6, space: "Private Office A", floor: "Floor 2", date: "Aug 12", time: "9:00 AM - 5:00 PM", status: "completed", amount: "$299" },
  { id: 7, space: "Media Studio", floor: "Floor 1", date: "Aug 8", time: "1:00 PM - 3:00 PM", status: "cancelled", amount: "$120" },
];

const statusColors = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusIcons = {
  confirmed: CheckCircle, pending: AlertCircle, completed: CheckCircle, cancelled: XCircle,
};

export default function MemberBookings() {
  const [tab, setTab] = useState("upcoming");
  const data = tab === "upcoming" ? upcomingBookings : pastBookings;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
          <p className="text-gray-500 mt-1">Manage your workspace reservations.</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm w-fit">
          <Plus size={16} /> Book a Space
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center bg-gray-100 rounded-xl p-1 w-fit">
        {["upcoming", "past"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition capitalize ${tab === t ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}>
            {t} ({t === "upcoming" ? upcomingBookings.length : pastBookings.length})
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {data.map((booking) => {
          const StatusIcon = statusIcons[booking.status];
          return (
            <div key={booking.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building size={22} className="text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{booking.space}</h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[booking.status]}`}>
                        <StatusIcon size={12} /> {booking.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><MapPin size={13} /> {booking.floor}</span>
                      <span className="flex items-center gap-1"><Calendar size={13} /> {booking.date}</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {booking.time}</span>
                    </div>
                    {booking.amenities && (
                      <div className="flex items-center gap-2 mt-2">
                        {booking.amenities.map((a, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{a}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gray-900">{booking.amount}</span>
                  {booking.status === "confirmed" && (
                    <button className="px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition">Cancel</button>
                  )}
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition"><ChevronRight size={18} className="text-gray-400" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Book Cards */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Book</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Wifi, name: "Hot Desk", price: "$40/day", desc: "Flexible seating" },
            { icon: Coffee, name: "Meeting Room", price: "$75/hr", desc: "Up to 8 people" },
            { icon: Building, name: "Private Office", price: "$299/day", desc: "Dedicated space" },
          ].map((item, i) => (
            <button key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-green-100 hover:border-green-300 hover:shadow-md transition-all duration-300 text-left">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><item.icon size={18} className="text-green-600" /></div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{item.price} • {item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
