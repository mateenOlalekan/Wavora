import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  Camera,
  Globe,
  Moon,
  Sun,
} from "lucide-react";

export default function MemberSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 234-5678",
    company: "Design Studio Co.",
    bio: "Product designer passionate about creating beautiful and functional workspaces.",
    timezone: "America/New_York",
    language: "English",
  });

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailEvents: true,
    emailCommunity: false,
    emailNewsletter: true,
    pushBookings: true,
    pushMessages: true,
    pushEvents: false,
    smsAlerts: false,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const Toggle = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? "bg-green-600" : "bg-gray-300"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and settings.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg">
            <CheckCircle className="w-4 h-4" /> Saved successfully
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabs */}
        <div className="lg:w-56 shrink-0">
          <nav className="bg-white rounded-xl border border-gray-200 p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">SJ</span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50">
                    <Camera className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                </div>
                <div>
                  <button className="px-4 py-2 text-sm font-medium text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition">
                    Change Photo
                  </button>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email</span>
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Phone</span>
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> Timezone</span>
                  </label>
                  <select
                    value={profile.timezone}
                    onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    value={profile.language}
                    onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { key: "emailBookings", label: "Booking confirmations & reminders", desc: "Receive emails about your upcoming bookings" },
                      { key: "emailEvents", label: "Community events", desc: "Get notified about new events and workshops" },
                      { key: "emailCommunity", label: "Community updates", desc: "News from community posts and discussions" },
                      { key: "emailNewsletter", label: "Newsletter", desc: "Weekly digest of coworking tips and updates" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <Toggle enabled={notifications[item.key]} onToggle={() => toggleNotification(item.key)} />
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { key: "pushBookings", label: "Booking alerts", desc: "Reminders for upcoming reservations" },
                      { key: "pushMessages", label: "Direct messages", desc: "When someone sends you a message" },
                      { key: "pushEvents", label: "Event reminders", desc: "Push alerts for registered events" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <Toggle enabled={notifications[item.key]} onToggle={() => toggleNotification(item.key)} />
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">SMS</h3>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">SMS alerts</p>
                      <p className="text-xs text-gray-500">Critical booking updates via text message</p>
                    </div>
                    <Toggle enabled={notifications.smsAlerts} onToggle={() => toggleNotification("smsAlerts")} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              {/* Change Password */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" /> Update Password
                  </button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h2>
                <div className="space-y-3">
                  {[
                    { device: "MacBook Pro — Chrome", location: "New York, US", current: true, time: "Active now" },
                    { device: "iPhone 15 — Safari", location: "New York, US", current: false, time: "2 hours ago" },
                    { device: "iPad Pro — Safari", location: "Boston, US", current: false, time: "3 days ago" },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${session.current ? "bg-green-500" : "bg-gray-300"}`} />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{session.device}</p>
                          <p className="text-xs text-gray-500">{session.location} · {session.time}</p>
                        </div>
                      </div>
                      {!session.current && (
                        <button className="text-xs text-red-600 hover:text-red-700 font-medium">Revoke</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Two-Factor */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h2>
                    <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account.</p>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h2>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-green-900">Premium Membership</h3>
                      <p className="text-green-700 mt-1">$299/month · Renews on Sept 1, 2026</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {["Unlimited hot desks", "10 meeting room hours", "5 guest passes", "24/7 access"].map((f) => (
                          <span key={f} className="text-xs bg-green-100 text-green-800 px-2.5 py-1 rounded-full">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-100 transition text-sm font-medium">
                      Manage Plan
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Visa ending in 4242</p>
                      <p className="text-xs text-gray-500">Expires 12/2027</p>
                    </div>
                  </div>
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium">Update</button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-gray-100">
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Description</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        { date: "Aug 1, 2026", desc: "Premium Membership — Monthly", amount: "$299.00", status: "Paid" },
                        { date: "Jul 1, 2026", desc: "Premium Membership — Monthly", amount: "$299.00", status: "Paid" },
                        { date: "Jun 1, 2026", desc: "Premium Membership — Monthly", amount: "$299.00", status: "Paid" },
                        { date: "May 15, 2026", desc: "Extra Meeting Room Hours (5h)", amount: "$75.00", status: "Paid" },
                        { date: "May 1, 2026", desc: "Premium Membership — Monthly", amount: "$299.00", status: "Paid" },
                      ].map((inv, i) => (
                        <tr key={i} className="text-gray-700">
                          <td className="py-3">{inv.date}</td>
                          <td className="py-3">{inv.desc}</td>
                          <td className="py-3 font-medium">{inv.amount}</td>
                          <td className="py-3">
                            <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full font-medium">
                              {inv.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
