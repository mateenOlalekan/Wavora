import { useState } from "react";
import {
  Users, Search, MapPin, Briefcase, Globe, MessageSquare, UserPlus,
  Star, ArrowRight, Building, Mail, Phone, Linkedin, ExternalLink,
} from "lucide-react";

const members = [
  { id: 1, name: "Sarah Chen", role: "Founder & CEO", company: "TechCorp", location: "Floor 2", industry: "Technology", bio: "Building the future of remote collaboration tools.", connections: 24, mutualConnections: 5, image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face" },
  { id: 2, name: "Marcus Rodriguez", role: "Creative Director", company: "DesignHub", location: "Floor 3", industry: "Design", bio: "Crafting beautiful digital experiences that inspire.", connections: 18, mutualConnections: 3, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: 3, name: "Dr. Aisha Bello", role: "Chief Medical Officer", company: "MedGroup", location: "Floor 1", industry: "Healthcare", bio: "Transforming healthcare delivery through technology.", connections: 31, mutualConnections: 8, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face" },
  { id: 4, name: "James Kim", role: "CTO", company: "InnovateCo", location: "Floor 2", industry: "Technology", bio: "Passionate about AI and smart workspace solutions.", connections: 22, mutualConnections: 4, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 5, name: "Lisa Thompson", role: "Startup Founder", company: "StartupIO", location: "Floor 3", industry: "Startup", bio: "Building tools for the next generation of creators.", connections: 15, mutualConnections: 2, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: 6, name: "David Park", role: "Financial Advisor", company: "FinanceCom", location: "Floor 2", industry: "Finance", bio: "Helping businesses make smarter financial decisions.", connections: 27, mutualConnections: 6, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
];

const groups = [
  { name: "Tech Innovators", members: 45, description: "A group for tech enthusiasts and innovators", color: "bg-blue-500" },
  { name: "Startup Founders", members: 32, description: "Connect with fellow entrepreneurs", color: "bg-green-500" },
  { name: "Design Collective", members: 28, description: "UI/UX designers and creative professionals", color: "bg-purple-500" },
  { name: "Finance & Legal", members: 20, description: "Financial and legal professionals", color: "bg-amber-500" },
];

const industryColors = {
  Technology: "bg-blue-100 text-blue-700",
  Design: "bg-purple-100 text-purple-700",
  Healthcare: "bg-green-100 text-green-700",
  Startup: "bg-pink-100 text-pink-700",
  Finance: "bg-amber-100 text-amber-700",
};

export default function MemberCommunity() {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");

  const filtered = members.filter(
    (m) =>
      (m.name.toLowerCase().includes(search.toLowerCase()) || m.company.toLowerCase().includes(search.toLowerCase())) &&
      (industryFilter === "all" || m.industry === industryFilter)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Community</h2>
        <p className="text-gray-500 mt-1">Connect with fellow members and professionals.</p>
      </div>

      {/* Groups */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Community Groups</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {groups.map((group, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className={`w-10 h-10 ${group.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Users size={18} className="text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">{group.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{group.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-400">{group.members} members</span>
                <button className="text-xs text-green-600 font-medium hover:text-green-700">Join</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Directory */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Member Directory</h3>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search members..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none w-64" />
          </div>
          <select value={industryFilter} onChange={(e) => setIndustryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-500 outline-none">
            <option value="all">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Design">Design</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Startup">Startup</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <img src={member.image} alt={member.name} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{member.name}</h4>
                  <p className="text-sm text-green-600 font-medium">{member.role}</p>
                  <p className="text-xs text-gray-500">{member.company} • {member.location}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3 mb-3">{member.bio}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${industryColors[member.industry]}`}>{member.industry}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">{member.mutualConnections} mutual</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex-1 py-2 bg-green-600 text-white rounded-xl text-xs font-medium hover:bg-green-700 transition flex items-center justify-center gap-1">
                  <UserPlus size={14} /> Connect
                </button>
                <button className="py-2 px-3 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
                  <MessageSquare size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
