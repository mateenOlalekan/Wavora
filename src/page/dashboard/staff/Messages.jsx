import { useState } from "react";
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Clock,
  CheckCheck,
  AlertCircle,
  Inbox,
  Filter,
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    lastMessage: "Thanks for helping with the AC issue!",
    time: "2 min ago",
    unread: 2,
    online: true,
    type: "support",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "MC",
    lastMessage: "Is the meeting room available at 3 PM?",
    time: "15 min ago",
    unread: 1,
    online: true,
    type: "general",
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "EW",
    lastMessage: "I need to extend my booking for tomorrow.",
    time: "1 hr ago",
    unread: 0,
    online: false,
    type: "booking",
  },
  {
    id: 4,
    name: "James Rodriguez",
    avatar: "JR",
    lastMessage: "The printer on floor 2 is jammed again.",
    time: "2 hrs ago",
    unread: 3,
    online: false,
    type: "maintenance",
  },
  {
    id: 5,
    name: "Lisa Park",
    avatar: "LP",
    lastMessage: "When is the next networking event?",
    time: "5 hrs ago",
    unread: 0,
    online: true,
    type: "general",
  },
  {
    id: 6,
    name: "David Kim",
    avatar: "DK",
    lastMessage: "Can I get an extra guest pass for this week?",
    time: "Yesterday",
    unread: 0,
    online: false,
    type: "general",
  },
];

const chatMessages = [
  { id: 1, sender: "Sarah Johnson", text: "Hi, I reported an AC issue in Zone B earlier.", time: "10:30 AM", isStaff: false },
  { id: 2, sender: "You", text: "Hello Sarah! Yes, I can see the maintenance request MR-001. Our team is on it.", time: "10:32 AM", isStaff: true },
  { id: 3, sender: "Sarah Johnson", text: "Great, thank you! Do you have an ETA?", time: "10:33 AM", isStaff: false },
  { id: 4, sender: "You", text: "The maintenance team should be there within the next hour. I'll update you once it's resolved.", time: "10:35 AM", isStaff: true },
  { id: 5, sender: "Sarah Johnson", text: "Thanks for helping with the AC issue!", time: "10:40 AM", isStaff: false },
];

export default function StaffMessages() {
  const [selectedConvo, setSelectedConvo] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = conversations.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.type === filter;
    return matchSearch && matchFilter;
  });

  const typeColor = (t) => {
    switch (t) {
      case "support": return "bg-red-100 text-red-700";
      case "booking": return "bg-blue-100 text-blue-700";
      case "maintenance": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-1">Communicate with members and manage inquiries.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ height: "600px" }}>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>
              <div className="flex gap-1 flex-wrap">
                {["all", "support", "general", "booking", "maintenance"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-2 py-1 rounded text-xs font-medium capitalize transition ${
                      filter === f ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.map((convo) => (
                <button
                  key={convo.id}
                  onClick={() => setSelectedConvo(convo)}
                  className={`w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition border-b border-gray-50 ${
                    selectedConvo.id === convo.id ? "bg-green-50 border-l-2 border-l-green-600" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-green-700">{convo.avatar}</span>
                    </div>
                    {convo.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 text-sm truncate">{convo.name}</span>
                      <span className="text-xs text-gray-400 shrink-0">{convo.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-xs text-gray-500 truncate">{convo.lastMessage}</p>
                      {convo.unread > 0 && (
                        <span className="w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center shrink-0 ml-2">
                          {convo.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-green-700">{selectedConvo.avatar}</span>
                  </div>
                  {selectedConvo.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedConvo.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${typeColor(selectedConvo.type)}`}>
                      {selectedConvo.type}
                    </span>
                    <span className="text-xs text-gray-400">
                      {selectedConvo.online ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Phone className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Video className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-center">
                <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">Today</span>
              </div>
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isStaff ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs lg:max-w-md ${msg.isStaff ? "order-2" : ""}`}>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm ${
                        msg.isStaff
                          ? "bg-green-600 text-white rounded-br-md"
                          : "bg-gray-100 text-gray-900 rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <p className={`text-xs text-gray-400 mt-1 ${msg.isStaff ? "text-right" : ""}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-100">
              <form onSubmit={handleSend} className="flex items-center gap-3">
                <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Paperclip className="w-5 h-5 text-gray-400" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
