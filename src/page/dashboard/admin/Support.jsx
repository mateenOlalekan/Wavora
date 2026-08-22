import { useState } from "react";
import {
  MessageSquare, Search, Plus, Eye, Clock, CheckCircle, AlertCircle,
  XCircle, Send, Paperclip, MoreHorizontal, Filter, Download,
  ArrowUpRight, TrendingUp, Headphones, Tag, User,
} from "lucide-react";

const tickets = [
  { id: "TK-001", subject: "WiFi connectivity issues on Floor 3", member: "Sarah Chen", priority: "high", status: "open", category: "Technical", created: "2 hrs ago", messages: 3 },
  { id: "TK-002", subject: "Request for invoice extension", member: "Marcus Rodriguez", priority: "medium", status: "in-progress", category: "Billing", created: "5 hrs ago", messages: 5 },
  { id: "TK-003", subject: "Damage report - Meeting Room A", member: "Dr. Aisha Bello", priority: "high", status: "open", category: "Facility", created: "1 day ago", messages: 2 },
  { id: "TK-004", subject: "Plan upgrade inquiry", member: "James Kim", priority: "low", status: "resolved", category: "Billing", created: "2 days ago", messages: 4 },
  { id: "TK-005", subject: "Access card not working", member: "Emily Watson", priority: "high", status: "in-progress", category: "Technical", created: "3 hrs ago", messages: 6 },
  { id: "TK-006", subject: "Feedback on event space", member: "Lisa Thompson", priority: "low", status: "resolved", category: "General", created: "3 days ago", messages: 2 },
  { id: "TK-007", subject: "Request for additional parking", member: "David Park", priority: "medium", status: "open", category: "Facility", created: "6 hrs ago", messages: 1 },
  { id: "TK-008", subject: "Cancellation request - Weekly Pass", member: "Rachel Green", priority: "medium", status: "in-progress", category: "Billing", created: "1 day ago", messages: 3 },
];

const priorityColors = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

const statusColors = {
  open: "bg-blue-100 text-blue-700",
  "in-progress": "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-600",
};

const categoryColors = {
  Technical: "bg-purple-100 text-purple-700",
  Billing: "bg-blue-100 text-blue-700",
  Facility: "bg-amber-100 text-amber-700",
  General: "bg-gray-100 text-gray-700",
};

const chatMessages = [
  { id: 1, sender: "Sarah Chen", message: "Hi, I've been having trouble connecting to the WiFi on Floor 3 since yesterday morning.", time: "10:30 AM", isMember: true },
  { id: 2, sender: "Support Agent", message: "Hello Sarah! I'm sorry to hear about the WiFi issues. Are you experiencing this on all your devices?", time: "10:32 AM", isMember: false },
  { id: 3, sender: "Sarah Chen", message: "Yes, both my laptop and phone are affected. Other members on the same floor seem fine though.", time: "10:35 AM", isMember: true },
  { id: 4, sender: "Support Agent", message: "Thank you for the details. I'll have our IT team look into this right away. In the meantime, you're welcome to use the workspace on Floor 2.", time: "10:37 AM", isMember: false },
];

export default function AdminSupport() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const [newMessage, setNewMessage] = useState("");

  const filtered = tickets.filter(
    (t) =>
      (t.subject.toLowerCase().includes(search.toLowerCase()) || t.member.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "all" || t.status === statusFilter)
  );

  const openTickets = tickets.filter((t) => t.status === "open").length;
  const avgResolution = "2.4 hrs";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Support Center</h2>
          <p className="text-gray-500 mt-1">Manage support tickets and member inquiries.</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm w-fit">
          <Plus size={16} /> New Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Open Tickets", value: openTickets, icon: AlertCircle, color: "bg-blue-50 text-blue-600" },
          { label: "In Progress", value: tickets.filter((t) => t.status === "in-progress").length, icon: Clock, color: "bg-amber-50 text-amber-600" },
          { label: "Resolved Today", value: tickets.filter((t) => t.status === "resolved").length, icon: CheckCircle, color: "bg-green-50 text-green-600" },
          { label: "Avg Resolution", value: avgResolution, icon: Headphones, color: "bg-purple-50 text-purple-600" },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col" style={{ maxHeight: "700px" }}>
          <div className="px-4 py-3 border-b border-gray-100 space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search tickets..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none w-full" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-500 outline-none">
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filtered.map((ticket) => (
              <button key={ticket.id} onClick={() => setSelectedTicket(ticket)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50/50 transition ${selectedTicket.id === ticket.id ? "bg-green-50 border-l-2 border-green-500" : ""}`}>
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">{ticket.subject}</p>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${priorityColors[ticket.priority]}`}>{ticket.priority}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{ticket.member}</span>
                  <span>•</span>
                  <span>{ticket.created}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[ticket.status]}`}>{ticket.status}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${categoryColors[ticket.category]}`}>{ticket.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ticket Detail / Chat */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col" style={{ maxHeight: "700px" }}>
          {/* Ticket Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-gray-500">{selectedTicket.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[selectedTicket.status]}`}>{selectedTicket.status}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${priorityColors[selectedTicket.priority]}`}>{selectedTicket.priority}</span>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><MoreHorizontal size={16} className="text-gray-500" /></button>
            </div>
            <h3 className="font-semibold text-gray-900">{selectedTicket.subject}</h3>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><User size={12} /> {selectedTicket.member}</span>
              <span className="flex items-center gap-1"><Tag size={12} /> {selectedTicket.category}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {selectedTicket.created}</span>
              <span className="flex items-center gap-1"><MessageSquare size={12} /> {selectedTicket.messages} messages</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMember ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[75%] ${msg.isMember ? "bg-gray-100" : "bg-green-600 text-white"} rounded-2xl px-4 py-3`}>
                  <p className="text-xs font-medium mb-1 opacity-70">{msg.sender}</p>
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-[10px] mt-1 opacity-50">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition"><Paperclip size={18} className="text-gray-500" /></button>
              <input type="text" placeholder="Type your reply..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
              <button className="px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2">
                <Send size={16} /> Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
