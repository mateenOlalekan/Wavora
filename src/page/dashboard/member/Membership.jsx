import { useState } from "react";
import {
  CreditCard, CheckCircle, ArrowUpRight, Clock, Calendar, Download,
  Star, Zap, Coffee, Wifi, Users, Printer, Shield, Gift, ChevronRight,
  ArrowRight, TrendingUp,
} from "lucide-react";

const plans = [
  {
    name: "Weekly Pass",
    price: "₦5,000",
    period: "/week",
    features: ["High-speed WiFi", "Common areas access", "50 pages printing", "Community events"],
    current: false,
  },
  {
    name: "Monthly Pro",
    price: "₦20,000",
    period: "/month",
    features: ["All Weekly features", "Unlimited printing", "2hr meeting room", "Priority support", "2 guest passes"],
    current: true,
    popular: true,
  },
  {
    name: "Yearly Elite",
    price: "₦240,500",
    period: "/year",
    features: ["All Monthly features", "Dedicated desk", "10hr meeting room", "4 guest passes", "24/7 access", "Partner discounts"],
    current: false,
  },
];

const usageData = [
  { label: "Meeting Room Hours", used: 8, total: 12, unit: "hrs", icon: Clock },
  { label: "Guest Passes", used: 1, total: 2, unit: "passes", icon: Users },
  { label: "Printing Pages", used: 340, total: 500, unit: "pages", icon: Printer },
];

const billingHistory = [
  { id: 1, date: "Aug 1, 2025", description: "Monthly Pro - August", amount: "₦20,000", status: "paid" },
  { id: 2, date: "Jul 1, 2025", description: "Monthly Pro - July", amount: "₦20,000", status: "paid" },
  { id: 3, date: "Jun 1, 2025", description: "Monthly Pro - June", amount: "₦20,000", status: "paid" },
  { id: 4, date: "May 1, 2025", description: "Monthly Pro - May", amount: "₦20,000", status: "paid" },
];

const statusColors = { paid: "bg-green-100 text-green-700", pending: "bg-amber-100 text-amber-700" };

export default function MemberMembership() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Membership</h2>
        <p className="text-gray-500 mt-1">Manage your plan, usage, and billing.</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-semibold">Current Plan</span>
            <h3 className="text-2xl font-bold mt-2">Monthly Pro</h3>
            <p className="text-green-100 mt-1">Valid until September 22, 2025 • Auto-renewal on</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">₦20,000</p>
            <p className="text-green-100 text-sm">/month</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
          {usageData.map((item, i) => {
            const pct = Math.round((item.used / item.total) * 100);
            return (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-green-100">{item.label}</span>
                  <span className="text-xs font-semibold">{item.used}/{item.total} {item.unit}</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Plans */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div key={i} className={`bg-white rounded-2xl border-2 p-6 transition-all duration-300 ${
              plan.current ? "border-green-500 shadow-lg" : plan.popular ? "border-green-200 hover:border-green-400" : "border-gray-100 hover:border-gray-300"
            }`}>
              {plan.popular && <span className="inline-block px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-3">Current Plan</span>}
              {plan.current && !plan.popular && <span className="inline-block px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-3">Active</span>}
              <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
              <div className="flex items-baseline gap-1 mt-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-sm text-gray-500">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-green-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2.5 rounded-xl text-sm font-medium transition ${
                plan.current ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
              }`}>
                {plan.current ? "Current Plan" : "Switch Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Billing History</h3>
          <button className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
            <Download size={14} /> Download All
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {billingHistory.map((item) => (
            <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center"><CreditCard size={18} className="text-green-600" /></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.description}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-900">{item.amount}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[item.status]}`}>{item.status}</span>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Download size={14} className="text-gray-500" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
