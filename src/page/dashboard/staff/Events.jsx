import { useState } from "react";
import {
  Calendar,
  Search,
  MapPin,
  Clock,
  Users,
  Plus,
  Filter,
  Edit3,
  MoreVertical,
  Eye,
  Trash2,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Networking Mixer",
    date: "Aug 23, 2026",
    time: "6:00 PM – 8:00 PM",
    location: "Event Space — Main Hall",
    attendees: 42,
    capacity: 60,
    status: "upcoming",
    category: "Networking",
  },
  {
    id: 2,
    title: "Startup Pitch Night",
    date: "Aug 25, 2026",
    time: "7:00 PM – 9:30 PM",
    location: "Event Space — Main Hall",
    attendees: 58,
    capacity: 60,
    status: "upcoming",
    category: "Community",
  },
  {
    id: 3,
    title: "Yoga & Meditation",
    date: "Aug 24, 2026",
    time: "7:30 AM – 8:30 AM",
    location: "Wellness Room",
    attendees: 12,
    capacity: 20,
    status: "upcoming",
    category: "Wellness",
  },
  {
    id: 4,
    title: "Design Thinking Workshop",
    date: "Aug 20, 2026",
    time: "2:00 PM – 5:00 PM",
    location: "Meeting Room — Summit",
    attendees: 18,
    capacity: 20,
    status: "completed",
    category: "Workshop",
  },
  {
    id: 5,
    title: "Member Appreciation Day",
    date: "Sep 1, 2026",
    time: "11:00 AM – 3:00 PM",
    location: "Rooftop Terrace",
    attendees: 0,
    capacity: 100,
    status: "draft",
    category: "Community",
  },
];

export default function StaffEvents() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = events.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || e.status === filter;
    return matchSearch && matchFilter;
  });

  const statusColor = (s) => {
    switch (s) {
      case "upcoming": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "draft": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-1">Manage community events and workshops.</p>
        </div>
        <button className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2">
          <Plus className="w-5 h-5" /> Create Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Upcoming</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {events.filter((e) => e.status === "upcoming").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total Attendees</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {events.reduce((sum, e) => sum + e.attendees, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Drafts</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {events.filter((e) => e.status === "draft").length}
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            {["all", "upcoming", "completed", "draft"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition ${
                  filter === f ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((event) => (
            <div key={event.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-full mt-1 inline-block">
                    {event.category}
                  </span>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {event.location}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{event.attendees}</span>
                    <span className="text-gray-400">/ {event.capacity}</span>
                    <span className="text-gray-400">registered</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                      <Edit3 className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg transition">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
                {/* Capacity Bar */}
                <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-green-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
