import { useState } from "react";
import {
  Calendar, Clock, MapPin, Users, Search, Filter, Plus, ChevronRight,
  Star, Tag, ArrowRight, CheckCircle, Ticket,
} from "lucide-react";

const events = [
  { id: 1, title: "Startup Networking Mixer", description: "Connect with fellow entrepreneurs and investors over drinks and light bites.", date: "Aug 24", time: "6:00 PM - 9:00 PM", venue: "Main Lounge", attendees: 45, maxAttendees: 60, type: "Networking", status: "upcoming", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop" },
  { id: 2, title: "Design Thinking Workshop", description: "Hands-on workshop led by industry experts on applying design thinking to your business.", date: "Aug 26", time: "2:00 PM - 5:00 PM", venue: "Conference Hall", attendees: 30, maxAttendees: 40, type: "Workshop", status: "upcoming", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=200&fit=crop" },
  { id: 3, title: "Friday Social Hour", description: "Unwind with your workspace community. Music, drinks, and great conversations.", date: "Aug 29", time: "5:00 PM - 7:00 PM", venue: "Café Area", attendees: 60, maxAttendees: 80, type: "Social", status: "upcoming", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop" },
  { id: 4, title: "AI in the Workplace", description: "Explore how artificial intelligence is transforming modern workspaces and productivity.", date: "Sep 2", time: "10:00 AM - 12:00 PM", venue: "Meeting Room A", attendees: 18, maxAttendees: 30, type: "Talk", status: "upcoming", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop" },
  { id: 5, title: "Community Breakfast", description: "Start your day right with a complimentary breakfast and morning networking.", date: "Sep 5", time: "8:00 AM - 9:30 AM", venue: "Café Area", attendees: 25, maxAttendees: 40, type: "Social", status: "upcoming", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop" },
  { id: 6, title: "Pitch Night", description: "Present your startup idea to investors and get valuable feedback.", date: "Sep 10", time: "6:00 PM - 9:00 PM", venue: "Conference Hall", attendees: 50, maxAttendees: 100, type: "Competition", status: "upcoming", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=200&fit=crop" },
];

const pastEvents = [
  { id: 7, title: "Summer Networking Gala", date: "Jul 20", time: "7:00 PM", attendees: 85, type: "Networking", rating: 4.8 },
  { id: 8, title: "Productivity Hacks Workshop", date: "Jul 15", time: "2:00 PM", attendees: 35, type: "Workshop", rating: 4.6 },
  { id: 9, title: "Community BBQ", date: "Jul 10", time: "5:00 PM", attendees: 70, type: "Social", rating: 4.9 },
];

const typeColors = {
  Networking: "bg-blue-100 text-blue-700",
  Workshop: "bg-purple-100 text-purple-700",
  Social: "bg-amber-100 text-amber-700",
  Talk: "bg-green-100 text-green-700",
  Competition: "bg-pink-100 text-pink-700",
};

export default function MemberEvents() {
  const [tab, setTab] = useState("upcoming");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Events</h2>
          <p className="text-gray-500 mt-1">Discover and join community events.</p>
        </div>
      </div>

      <div className="flex items-center bg-gray-100 rounded-xl p-1 w-fit">
        {["upcoming", "past"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition capitalize ${tab === t ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "upcoming" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const spotsLeft = event.maxAttendees - event.attendees;
            const pctFull = Math.round((event.attendees / event.maxAttendees) * 100);
            return (
              <div key={event.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${typeColors[event.type]}`}>{event.type}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <p className="text-xs font-bold text-green-600">{event.date}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{event.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {event.venue}</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">{event.attendees}/{event.maxAttendees} attending</span>
                      <span className={`font-medium ${spotsLeft < 10 ? "text-red-500" : "text-green-600"}`}>{spotsLeft} spots left</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${pctFull}%` }}></div>
                    </div>
                  </div>
                  <button className="w-full py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center justify-center gap-2">
                    <Ticket size={16} /> RSVP Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {pastEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><Calendar size={20} className="text-green-600" /></div>
                <div>
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{event.date}</span><span>•</span><span>{event.time}</span><span>•</span><span>{event.attendees} attended</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-sm text-amber-500"><Star size={14} fill="currentColor" /> {event.rating}</span>
                <button className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition">View Recap</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
