import { useState } from "react";
import {
  Building, Plus, Search, Filter, Eye, Edit, Trash2, MapPin,
  Users, Wifi, Coffee, Zap, Clock, CheckCircle, AlertCircle,
  Wrench, Grid3X3, List, Download,
} from "lucide-react";

const spaces = [
  { id: 1, name: "Private Office A", type: "Private Office", floor: "Floor 2", capacity: 4, price: "$299/day", status: "available", amenities: ["WiFi", "AC", "Monitor", "Whiteboard"], occupancy: 0, totalHours: 0, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop" },
  { id: 2, name: "Private Office B", type: "Private Office", floor: "Floor 2", capacity: 6, price: "$399/day", status: "occupied", amenities: ["WiFi", "AC", "Monitor", "Whiteboard", "Printer"], occupancy: 100, totalHours: 8, image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=250&fit=crop" },
  { id: 3, name: "Meeting Room A", type: "Meeting Room", floor: "Floor 3", capacity: 8, price: "$75/hr", status: "available", amenities: ["WiFi", "AC", "TV", "Video Conf"], occupancy: 0, totalHours: 0, image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=400&h=250&fit=crop" },
  { id: 4, name: "Meeting Room B", type: "Meeting Room", floor: "Floor 3", capacity: 6, price: "$75/hr", status: "maintenance", amenities: ["WiFi", "AC", "TV"], occupancy: 0, totalHours: 0, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=250&fit=crop" },
  { id: 5, name: "Conference Hall", type: "Conference Hall", floor: "Floor 1", capacity: 50, price: "$450/event", status: "booked", amenities: ["WiFi", "AC", "Projector", "Sound System", "Stage"], occupancy: 60, totalHours: 4, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop" },
  { id: 6, name: "Media Studio", type: "Studio", floor: "Floor 1", capacity: 3, price: "$120/hr", status: "available", amenities: ["WiFi", "Green Screen", "Lighting", "Audio Booth"], occupancy: 0, totalHours: 0, image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=250&fit=crop" },
  { id: 7, name: "Shared Desk Zone", type: "Hot Desk", floor: "Floor 3", capacity: 20, price: "$40/day", status: "occupied", amenities: ["WiFi", "AC", "Power"], occupancy: 75, totalHours: 6, image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=400&h=250&fit=crop" },
  { id: 8, name: "Lounge Area", type: "Common Area", floor: "Floor 1", capacity: 30, price: "Free", status: "available", amenities: ["WiFi", "Coffee", "Snacks"], occupancy: 30, totalHours: 0, image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=250&fit=crop" },
];

const statusConfig = {
  available: { label: "Available", color: "bg-green-100 text-green-700", icon: CheckCircle },
  occupied: { label: "In Use", color: "bg-blue-100 text-blue-700", icon: Users },
  booked: { label: "Booked", color: "bg-amber-100 text-amber-700", icon: Clock },
  maintenance: { label: "Maintenance", color: "bg-red-100 text-red-700", icon: Wrench },
};

const typeColors = {
  "Private Office": "bg-purple-100 text-purple-700",
  "Meeting Room": "bg-blue-100 text-blue-700",
  "Conference Hall": "bg-amber-100 text-amber-700",
  "Studio": "bg-pink-100 text-pink-700",
  "Hot Desk": "bg-green-100 text-green-700",
  "Common Area": "bg-gray-100 text-gray-700",
};

export default function AdminSpaces() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState("grid");

  const filtered = spaces.filter(
    (s) =>
      (s.name.toLowerCase().includes(search.toLowerCase()) || s.type.toLowerCase().includes(search.toLowerCase())) &&
      (typeFilter === "all" || s.type === typeFilter) &&
      (statusFilter === "all" || s.status === statusFilter)
  );

  const totalCapacity = spaces.reduce((sum, s) => sum + s.capacity, 0);
  const avgOccupancy = Math.round(spaces.filter((s) => s.occupancy > 0).reduce((sum, s) => sum + s.occupancy, 0) / spaces.filter((s) => s.occupancy > 0).length || 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Spaces Management</h2>
          <p className="text-gray-500 mt-1">Manage all workspaces, rooms, and amenities.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
            <Download size={16} /> Export
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm">
            <Plus size={16} /> Add Space
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Spaces", value: spaces.length, icon: Building, color: "bg-green-50 text-green-600" },
          { label: "Available Now", value: spaces.filter((s) => s.status === "available").length, icon: CheckCircle, color: "bg-blue-50 text-blue-600" },
          { label: "Total Capacity", value: totalCapacity, icon: Users, color: "bg-purple-50 text-purple-600" },
          { label: "Avg Occupancy", value: `${avgOccupancy}%`, icon: TrendingUp, color: "bg-amber-50 text-amber-600" },
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search spaces..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none w-56" />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-500 outline-none">
            <option value="all">All Types</option>
            <option value="Private Office">Private Office</option>
            <option value="Meeting Room">Meeting Room</option>
            <option value="Conference Hall">Conference Hall</option>
            <option value="Studio">Studio</option>
            <option value="Hot Desk">Hot Desk</option>
            <option value="Common Area">Common Area</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-500 outline-none">
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">In Use</option>
            <option value="booked">Booked</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button onClick={() => setView("grid")} className={`px-3 py-2 transition ${view === "grid" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}><Grid3X3 size={16} /></button>
          <button onClick={() => setView("list")} className={`px-3 py-2 transition ${view === "list" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}><List size={16} /></button>
        </div>
      </div>

      {/* Spaces Grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((space) => {
            const statusInfo = statusConfig[space.status];
            return (
              <div key={space.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img src={space.image} alt={space.name} className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                      <statusInfo.icon size={12} /> {statusInfo.label}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${typeColors[space.type]}`}>{space.type}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{space.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><MapPin size={11} /> {space.floor}</span>
                    <span className="flex items-center gap-1"><Users size={11} /> {space.capacity} people</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {space.amenities.map((a, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-medium">{a}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm font-bold text-green-600">{space.price}</span>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Eye size={14} className="text-gray-500" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Edit size={14} className="text-gray-500" /></button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Space</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Floor</th>
                  <th className="px-6 py-3">Capacity</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((space) => {
                  const statusInfo = statusConfig[space.status];
                  return (
                    <tr key={space.id} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={space.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <span className="text-sm font-medium text-gray-900">{space.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[space.type]}`}>{space.type}</span></td>
                      <td className="px-6 py-4 text-sm text-gray-600">{space.floor}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{space.capacity} people</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{space.price}</td>
                      <td className="px-6 py-4"><span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}><statusInfo.icon size={12} /> {statusInfo.label}</span></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Eye size={14} className="text-gray-500" /></button>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Edit size={14} className="text-gray-500" /></button>
                          <button className="p-1.5 rounded-lg hover:bg-red-50 transition"><Trash2 size={14} className="text-red-500" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
