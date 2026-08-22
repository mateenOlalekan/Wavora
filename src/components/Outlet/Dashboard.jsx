import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  BarChart3,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  CreditCard,
  MessageSquare,
  BookOpen,
  Building,
  UserCheck,
  FileText,
  HelpCircle,
  PieChart,
  Briefcase,
  Search,
  ArrowLeftRight,
  Home,
  Moon,
  Sun,
} from "lucide-react";
import logo from "../../assets/logo.svg";

// ─── Nav items ──────────────────────────────────────────────
const adminLinks = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Bookings", path: "/admin/bookings", icon: Calendar },
  { name: "Revenue", path: "/admin/revenue", icon: BarChart3 },
  { name: "Spaces", path: "/admin/spaces", icon: Building },
  { name: "Payments", path: "/admin/payments", icon: CreditCard },
  { name: "Support", path: "/admin/support", icon: MessageSquare },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

const memberLinks = [
  { name: "Dashboard", path: "/member", icon: LayoutDashboard },
  { name: "My Bookings", path: "/member/bookings", icon: Calendar },
  { name: "Membership", path: "/member/membership", icon: CreditCard },
  { name: "Events", path: "/member/events", icon: BookOpen },
  { name: "Community", path: "/member/community", icon: Users },
  { name: "Messages", path: "/member/messages", icon: MessageSquare },
  { name: "Help", path: "/member/help", icon: HelpCircle },
  { name: "Settings", path: "/member/settings", icon: Settings },
];

const staffLinks = [
  { name: "Dashboard", path: "/staff", icon: LayoutDashboard },
  { name: "Check-in", path: "/staff/checkin", icon: UserCheck },
  { name: "Bookings", path: "/staff/bookings", icon: Calendar },
  { name: "Maintenance", path: "/staff/maintenance", icon: FileText },
  { name: "Events", path: "/staff/events", icon: BookOpen },
  { name: "Messages", path: "/staff/messages", icon: MessageSquare },
  { name: "Settings", path: "/staff/settings", icon: Settings },
];

const orgLinks = [
  { name: "Overview", path: "/organization", icon: LayoutDashboard },
  { name: "Members", path: "/organization/members", icon: Users },
  { name: "Bookings", path: "/organization/bookings", icon: Calendar },
  { name: "Analytics", path: "/organization/analytics", icon: PieChart },
  { name: "Billing", path: "/organization/billing", icon: CreditCard },
  { name: "Team", path: "/organization/team", icon: Briefcase },
  { name: "Settings", path: "/organization/settings", icon: Settings },
];

const allRoles = [
  { id: "admin", label: "Admin", color: "bg-red-100 text-red-700", icon: Shield },
  { id: "member", label: "Member", color: "bg-green-100 text-green-700", icon: Users },
  { id: "staff", label: "Staff", color: "bg-blue-100 text-blue-700", icon: UserCheck },
  { id: "organization", label: "Organization", color: "bg-purple-100 text-purple-700", icon: Briefcase },
];

const roleLabels = {
  admin: { label: "Admin", color: "bg-red-100 text-red-700" },
  member: { label: "Member", color: "bg-green-100 text-green-700" },
  staff: { label: "Staff", color: "bg-blue-100 text-blue-700" },
  organization: { label: "Organization", color: "bg-purple-100 text-purple-700" },
};

const roleMap = {
  admin: adminLinks,
  member: memberLinks,
  staff: staffLinks,
  organization: orgLinks,
};

// ─── Shield icon (used in role switcher) ────────────────────
function Shield({ size = 20, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// ─── Main Component ─────────────────────────────────────────
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const roleSwitcherRef = useRef(null);
  const profileRef = useRef(null);

  // Determine role from path
  const pathParts = location.pathname.split("/").filter(Boolean);
  const role = pathParts[0] || "member";
  const links = roleMap[role] || memberLinks;
  const roleInfo = roleLabels[role] || roleLabels.member;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (roleSwitcherRef.current && !roleSwitcherRef.current.contains(e.target)) {
        setRoleSwitcherOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile sidebar open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const isActive = (path) => {
    if (path === `/${role}`) return location.pathname === `/${role}`;
    return location.pathname.startsWith(path);
  };

  const handleRoleSwitch = (newRole) => {
    setRoleSwitcherOpen(false);
    setProfileOpen(false);
    // Navigate to the new role's dashboard
    navigate(`/${newRole}`);
  };

  // Get current page title from active link
  const activeLink = links.find((l) => isActive(l.path));
  const pageTitle = activeLink?.name || `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`;

  // Get the 5 bottom nav items for mobile (first 5 links)
  const bottomNavLinks = links.slice(0, 5);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── Sidebar Overlay (mobile) ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0 lg:shadow-none"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Wavora" className="h-8 w-auto" />
            <span className="text-lg font-bold text-gray-900">Wavora</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X size={22} className="text-gray-500" />
          </button>
        </div>

        {/* Role Badge */}
        <div className="px-5 py-3">
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${roleInfo.color}`}
          >
            {roleInfo.label} Panel
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>
          <ul className="space-y-0.5">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px] ${
                    isActive(link.path)
                      ? "bg-green-50 text-green-700 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100"
                  }`}
                >
                  <link.icon
                    size={20}
                    className={isActive(link.path) ? "text-green-600" : "text-gray-400"}
                  />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-100 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 min-h-[44px]"
          >
            <Home size={20} className="text-gray-400" />
            Back to Home
          </Link>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Menu size={22} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-semibold text-gray-900">{pageTitle}</h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search (hidden on very small screens) */}
            <div className="relative hidden sm:block">
              <Search
                size={16}
                className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${searchFocused ? "text-green-500" : "text-gray-400"}`}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-44 lg:w-64 pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition min-w-[44px] min-h-[44px] flex items-center justify-center">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Role Switcher */}
            <div className="relative" ref={roleSwitcherRef}>
              <button
                onClick={() => { setRoleSwitcherOpen(!roleSwitcherOpen); setProfileOpen(false); }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition hover:bg-gray-100 min-h-[44px] ${roleInfo.color}`}
              >
                <ArrowLeftRight size={14} />
                <span className="hidden md:inline">Switch Role</span>
                <ChevronDown size={14} className={`transition-transform ${roleSwitcherOpen ? "rotate-180" : ""}`} />
              </button>

              {roleSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Switch Dashboard</p>
                  {allRoles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleRoleSwitch(r.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition hover:bg-gray-50 min-h-[44px] ${
                        role === r.id ? "bg-green-50 text-green-700" : "text-gray-700"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${r.color}`}>
                        {r.label.charAt(0)}
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{r.label}</p>
                        <p className="text-xs text-gray-400">{r.id}.dashboard</p>
                      </div>
                      {role === r.id && (
                        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => { setProfileOpen(!profileOpen); setRoleSwitcherOpen(false); }}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition min-h-[44px]"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {role.charAt(0).toUpperCase()}
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform hidden lg:block ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {role.charAt(0).toUpperCase() + role.slice(1)} User
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">user@wavora.com</p>
                      <span className={`inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full ${roleInfo.color}`}>
                        {roleInfo.label}
                      </span>
                    </div>
                    <Link
                      to={`/${role}/settings`}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition min-h-[44px]"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Settings size={16} /> Settings
                    </Link>
                    <Link
                      to="/"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition min-h-[44px]"
                      onClick={() => setProfileOpen(false)}
                    >
                      <LogOut size={16} /> Sign Out
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <Outlet />
        </main>

        {/* ── Mobile Bottom Navigation ── */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 safe-area-bottom">
          <div className="flex items-center justify-around px-2 py-1">
            {bottomNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl transition min-w-[56px] min-h-[56px] justify-center ${
                  isActive(link.path)
                    ? "text-green-600"
                    : "text-gray-400 active:text-gray-600"
                }`}
              >
                <link.icon size={20} />
                <span className="text-[10px] font-medium leading-tight truncate max-w-[64px]">
                  {link.name.split(" ").pop()}
                </span>
                {isActive(link.path) && (
                  <div className="w-1 h-1 bg-green-600 rounded-full mt-0.5" />
                )}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
