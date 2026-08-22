import { useState } from "react";
import {
  User, Building, Bell, Shield, Globe, Palette, Save, Camera,
  Mail, Phone, MapPin, Lock, Eye, EyeOff, CheckCircle, AlertCircle,
  Upload, Trash2, Key, Smartphone, Clock,
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "workspace", label: "Workspace", icon: Building },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    emailBookings: true, emailPayments: true, emailMembers: false,
    pushBookings: true, pushPayments: false, pushAlerts: true,
    smsCritical: true, smsPayments: false,
  });

  const toggleNotif = (key) => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 mt-1">Manage your admin account and workspace configuration.</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id ? "border-green-500 text-green-600 bg-green-50/50" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}>
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <div className="max-w-2xl space-y-8">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">A</div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-50 transition">
                    <Camera size={14} className="text-gray-600" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Admin User</h3>
                  <p className="text-sm text-gray-500">admin@wavora.com</p>
                  <button className="mt-2 text-sm text-green-600 font-medium hover:text-green-700 transition">Change Photo</button>
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "First Name", value: "Admin", placeholder: "First name" },
                  { label: "Last Name", value: "User", placeholder: "Last name" },
                  { label: "Email", value: "admin@wavora.com", placeholder: "Email", icon: Mail },
                  { label: "Phone", value: "+1 555-0100", placeholder: "Phone", icon: Phone },
                  { label: "Company", value: "Wavora", placeholder: "Company" },
                  { label: "Role", value: "Super Admin", placeholder: "Role" },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                    <input type="text" defaultValue={field.value} placeholder={field.placeholder}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none transition" />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                  <textarea rows={3} defaultValue="System administrator for Wavora workspace platform."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none transition resize-none" />
                </div>
              </div>
              <button className="px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm">
                <Save size={16} /> Save Changes
              </button>
            </div>
          )}

          {activeTab === "workspace" && (
            <div className="max-w-2xl space-y-8">
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">General Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Workspace Name</label>
                    <input type="text" defaultValue="Wavora HQ"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label>
                    <select defaultValue="WAT" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none">
                      <option>West Africa Time (WAT)</option>
                      <option>UTC</option>
                      <option>EST</option>
                      <option>PST</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                    <input type="text" defaultValue="Suite 5B, Olive Grove Plaza, Victoria Island, Lagos"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">Operating Hours</h3>
                <div className="space-y-3">
                  {["Monday - Friday", "Saturday", "Sunday"].map((day, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm font-medium text-gray-700">{day}</span>
                      <div className="flex items-center gap-2">
                        <input type="text" defaultValue={i === 2 ? "Closed" : "8:00 AM"}
                          className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-green-500 outline-none" disabled={i === 2} />
                        {i !== 2 && <span className="text-gray-400">to</span>}
                        {i !== 2 && <input type="text" defaultValue="10:00 PM"
                          className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-green-500 outline-none" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Currencies</h3>
                <div className="flex items-center gap-4">
                  {["NGN (₦)", "USD ($)", "EUR (€)", "GBP (£)"].map((currency, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked={i < 2} className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      <span className="text-sm text-gray-700">{currency}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm">
                <Save size={16} /> Save Changes
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="max-w-2xl space-y-8">
              {[
                { title: "Email Notifications", items: [
                  { key: "emailBookings", label: "New bookings and cancellations" },
                  { key: "emailPayments", label: "Payment received or failed" },
                  { key: "emailMembers", label: "New member registrations" },
                ]},
                { title: "Push Notifications", items: [
                  { key: "pushBookings", label: "Booking reminders" },
                  { key: "pushPayments", label: "Payment alerts" },
                  { key: "pushAlerts", label: "System alerts and errors" },
                ]},
                { title: "SMS Notifications", items: [
                  { key: "smsCritical", label: "Critical system issues" },
                  { key: "smsPayments", label: "Large payment confirmations" },
                ]},
              ].map((section, si) => (
                <div key={si} className="space-y-4">
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <button onClick={() => toggleNotif(item.key)}
                          className={`w-11 h-6 rounded-full transition-colors duration-200 ${notifications[item.key] ? "bg-green-500" : "bg-gray-300"}`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${notifications[item.key] ? "translate-x-5.5" : "translate-x-0.5"}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button className="px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm">
                <Save size={16} /> Save Preferences
              </button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="max-w-2xl space-y-8">
              {/* Change Password */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} defaultValue="currentpass"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none pr-10" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                        {showPassword ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                    <input type="password" placeholder="Enter new password"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                    <input type="password" placeholder="Confirm new password"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>
                  <button className="px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm">
                    <Lock size={16} /> Update Password
                  </button>
                </div>
              </div>

              {/* Two-Factor Auth */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center"><Smartphone size={20} className="text-green-600" /></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition">Enable 2FA</button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Active Sessions</h3>
                <div className="space-y-3">
                  {[
                    { device: "Chrome on MacOS", ip: "192.168.1.100", time: "Active now", current: true },
                    { device: "Safari on iPhone", ip: "10.0.0.55", time: "2 hours ago", current: false },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${session.current ? "bg-green-100" : "bg-gray-200"}`}>
                          <Key size={14} className={session.current ? "text-green-600" : "text-gray-500"} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{session.device}</p>
                          <p className="text-xs text-gray-500">IP: {session.ip} • {session.time}</p>
                        </div>
                      </div>
                      {session.current ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Current</span>
                      ) : (
                        <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition">Revoke</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-4 border border-red-200 rounded-xl bg-red-50/50">
                <h3 className="font-semibold text-red-700 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-600 mb-3">Permanently delete your admin account and all associated data.</p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition flex items-center gap-2">
                  <Trash2 size={14} /> Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
