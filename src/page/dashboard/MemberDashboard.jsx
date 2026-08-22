import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Bell,
  BookOpen,
  Users,
  MessageSquare,
  Star,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Zap,
  Coffee,
  Wifi,
} from "lucide-react";

// Mock data
const upcomingBookings = [
  {
    id: 1,
    space: "Private Office A",
    date: "Today",
    time: "9:00 AM - 5:00 PM",
    status: "confirmed",
    location: "Floor 2",
  },
  {
    id: 2,
    space: "Meeting Room B",
    date: "Tomorrow",
    time: "2:00 PM - 4:00 PM",
    status: "confirmed",
    location: "Floor 3",
  },
  {
    id: 3,
    space: "Conference Hall",
    date: "Aug 25",
    time: "10:00 AM - 12:00 PM",
    status: "pending",
    location: "Floor 1",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Startup Networking Mixer",
    date: "Aug 24",
    time: "6:00 PM",
    attendees: 45,
    type: "Networking",
  },
  {
    id: 2,
    title: "Design Thinking Workshop",
    date: "Aug 26",
    time: "2:00 PM",
    attendees: 30,
    type: "Workshop",
  },
  {
    id: 3,
    title: "Friday Social Hour",
    date: "Aug 29",
    time: "5:00 PM",
    attendees: 60,
    type: "Social",
  },
];

const quickLinks = [
  {
    icon: Calendar,
    label: "Book a Space",
    description: "Reserve your next workspace",
    color: "bg-green-50 text-green-600",
    href: "/member/bookings",
  },
  {
    icon: CreditCard,
    label: "My Membership",
    description: "View plan & billing",
    color: "bg-blue-50 text-blue-600",
    href: "/member/membership",
  },
  {
    icon: BookOpen,
    label: "Events",
    description: "Browse upcoming events",
    color: "bg-purple-50 text-purple-600",
    href: "/member/events",
  },
  {
    icon: MessageSquare,
    label: "Messages",
    description: "Chat with community",
    color: "bg-amber-50 text-amber-600",
    href: "/member/messages",
  },
];

const statusColors = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
};

const eventColors = {
  Networking: "bg-blue-100 text-blue-700",
  Workshop: "bg-purple-100 text-purple-700",
  Social: "bg-amber-100 text-amber-700",
};

export default function MemberDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, Member
          </h2>
          <p className="text-gray-500 mt-1">
            Your workspace dashboard — everything at a glance.
          </p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm w-fit">
          <Calendar size={16} />
          Book a Space
        </button>
      </div>

      {/* Membership Status Card */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-semibold">
                Active Member
              </span>
            </div>
            <h3 className="text-xl font-bold">Monthly Pro Plan</h3>
            <p className="text-green-100 text-sm mt-1">
              Valid until September 22, 2026
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold">24</p>
                <p className="text-green-100 text-xs">Days Left</p>
              </div>
              <div className="w-px h-10 bg-white/30"></div>
              <div className="text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-green-100 text-xs">Bookings Used</p>
              </div>
              <div className="w-px h-10 bg-white/30"></div>
              <div className="text-center">
                <p className="text-2xl font-bold">8</p>
                <p className="text-green-100 text-xs">Credits Left</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300 group"
          >
            <div
              className={`w-10 h-10 ${link.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
            >
              <link.icon size={20} />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">{link.label}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{link.description}</p>
          </a>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Bookings */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Upcoming Bookings</h3>
            <a
              href="/member/bookings"
              className="text-sm text-green-600 font-medium hover:text-green-700 transition flex items-center gap-1"
            >
              View All <ChevronRight size={14} />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="px-6 py-4 hover:bg-gray-50/50 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {booking.space}
                      </h4>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                          statusColors[booking.status]
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {booking.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {booking.location}
                      </span>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
            <a
              href="/member/events"
              className="text-sm text-green-600 font-medium hover:text-green-700 transition flex items-center gap-1"
            >
              View All <ChevronRight size={14} />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="px-6 py-4 hover:bg-gray-50/50 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {event.title}
                      </h4>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          eventColors[event.type]
                        }`}
                      >
                        {event.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {event.attendees} attending
                      </span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-medium hover:bg-green-100 transition">
                    RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Amenities Available */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          Your Membership Perks
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Wifi, label: "High-Speed WiFi", status: "Included" },
            { icon: Coffee, label: "Free Coffee & Tea", status: "Included" },
            { icon: Zap, label: "24/7 Access", status: "Included" },
            { icon: Star, label: "Priority Booking", status: "Pro" },
          ].map((perk, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <perk.icon size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {perk.label}
                </p>
                <p className="text-xs text-gray-500">{perk.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
