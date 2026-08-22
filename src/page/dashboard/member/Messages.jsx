import { useState } from "react";
import {
  Send, Paperclip, Search, MoreHorizontal, Phone, Video, Image,
  Smile, CheckCheck, Circle, ArrowLeft,
} from "lucide-react";

const conversations = [
  { id: 1, name: "Sarah Chen", lastMessage: "Let me know if you need any help with the booking!", time: "2m", unread: 2, online: true, avatar: "SC" },
  { id: 2, name: "Community Events", lastMessage: "New event: Startup Networking Mixer on Aug 24!", time: "1h", unread: 5, online: false, avatar: "CE", isGroup: true },
  { id: 3, name: "Support Team", lastMessage: "Your WiFi issue has been resolved. Let us know if...", time: "3h", unread: 0, online: true, avatar: "ST" },
  { id: 4, name: "Marcus Rodriguez", lastMessage: "Great meeting yesterday! Let's connect again soon.", time: "1d", unread: 0, online: false, avatar: "MR" },
  { id: 5, name: "David Park", lastMessage: "I'll send the financial report by end of day.", time: "2d", unread: 0, online: true, avatar: "DP" },
];

const chatMessages = [
  { id: 1, sender: "Sarah Chen", message: "Hi! I noticed you booked the Meeting Room B for tomorrow. Want to share it? I need it for a quick client call.", time: "10:30 AM", isOwn: false },
  { id: 2, sender: "You", message: "Sure! What time were you thinking? I have it from 2-4 PM.", time: "10:32 AM", isOwn: true, read: true },
  { id: 3, sender: "Sarah Chen", message: "Perfect! I only need it for 30 minutes around 2:30 PM. Would that work?", time: "10:35 AM", isOwn: false },
  { id: 4, sender: "You", message: "That works perfectly. I'll be in the office anyway. Let me know if you need the projector setup.", time: "10:37 AM", isOwn: true, read: true },
  { id: 5, sender: "Sarah Chen", message: "That would be amazing! Thank you so much 🙏", time: "10:38 AM", isOwn: false },
  { id: 6, sender: "Sarah Chen", message: "Let me know if you need any help with the booking!", time: "10:45 AM", isOwn: false },
];

const avatarColors = {
  SC: "from-green-400 to-green-600",
  CE: "from-blue-400 to-blue-600",
  ST: "from-purple-400 to-purple-600",
  MR: "from-amber-400 to-amber-600",
  DP: "from-cyan-400 to-cyan-600",
};

export default function MemberMessages() {
  const [selectedConvo, setSelectedConvo] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConvos = conversations.filter(
    (c) => c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
        <p className="text-gray-500 mt-1">Connect with members and staff.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex" style={{ height: "600px" }}>
        {/* Conversation List */}
        <div className={`w-full sm:w-80 border-r border-gray-100 flex flex-col ${selectedConvo ? "hidden sm:flex" : "flex"}`}>
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search conversations..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none w-full" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConvos.map((convo) => (
              <button key={convo.id} onClick={() => setSelectedConvo(convo)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50/50 transition ${
                  selectedConvo.id === convo.id ? "bg-green-50" : ""
                }`}>
                <div className="relative flex-shrink-0">
                  <div className={`w-11 h-11 bg-gradient-to-br ${avatarColors[convo.avatar]} rounded-xl flex items-center justify-center text-white text-xs font-bold`}>{convo.avatar}</div>
                  {convo.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900 truncate">{convo.name}</p>
                    <span className="text-xs text-gray-400 flex-shrink-0">{convo.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && (
                  <span className="w-5 h-5 bg-green-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0">{convo.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${!selectedConvo ? "hidden sm:flex" : "flex"}`}>
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedConvo(null)} className="sm:hidden p-1 rounded-lg hover:bg-gray-100">
                <ArrowLeft size={18} className="text-gray-600" />
              </button>
              <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white text-xs font-bold">{selectedConvo.avatar}</div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{selectedConvo.name}</p>
                <p className="text-xs text-green-500">{selectedConvo.online ? "Online" : "Last seen recently"}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition"><Phone size={16} className="text-gray-500" /></button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition"><Video size={16} className="text-gray-500" /></button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition"><MoreHorizontal size={16} className="text-gray-500" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="text-center text-xs text-gray-400 py-2">Today</div>
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] ${msg.isOwn ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"} rounded-2xl px-4 py-2.5`}>
                  <p className="text-sm">{msg.message}</p>
                  <div className={`flex items-center gap-1 mt-1 ${msg.isOwn ? "justify-end" : ""}`}>
                    <span className="text-[10px] opacity-60">{msg.time}</span>
                    {msg.isOwn && <CheckCheck size={12} className={msg.read ? "opacity-60" : "opacity-30"} />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition"><Paperclip size={18} className="text-gray-500" /></button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition"><Image size={18} className="text-gray-500" /></button>
              <input type="text" placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
              <button className="p-2 rounded-lg hover:bg-gray-100 transition"><Smile size={18} className="text-gray-500" /></button>
              <button className="px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"><Send size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
