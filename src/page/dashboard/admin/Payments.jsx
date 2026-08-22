import { useState } from "react";
import {
  CreditCard, Search, Filter, Download, Plus, Eye, CheckCircle,
  XCircle, Clock, ArrowUpRight, ArrowDownRight, DollarSign, Receipt,
  RefreshCw, MoreHorizontal, ChevronDown, FileText,
} from "lucide-react";

const payments = [
  { id: "INV-2025-001", member: "Sarah Chen", plan: "Monthly Pro", amount: 20000, method: "Visa •••• 4242", status: "paid", date: "Aug 22, 2025", type: "Membership" },
  { id: "INV-2025-002", member: "Marcus Rodriguez", plan: "Meeting Room B", amount: 7500, method: "Mastercard •••• 5555", status: "paid", date: "Aug 22, 2025", type: "Booking" },
  { id: "INV-2025-003", member: "Lisa Thompson", plan: "Yearly Elite", amount: 240500, method: "Bank Transfer", status: "paid", date: "Aug 21, 2025", type: "Membership" },
  { id: "INV-2025-004", member: "Dr. Aisha Bello", plan: "Conference Hall", amount: 45000, method: "Visa •••• 1234", status: "pending", date: "Aug 21, 2025", type: "Event" },
  { id: "INV-2025-005", member: "James Kim", plan: "Weekly Pass", amount: 5000, method: "PayPal", status: "paid", date: "Aug 20, 2025", type: "Membership" },
  { id: "INV-2025-006", member: "Emily Watson", plan: "Media Studio", amount: 12000, method: "Visa •••• 4242", status: "refunded", date: "Aug 20, 2025", type: "Booking" },
  { id: "INV-2025-007", member: "David Park", plan: "Private Office A", amount: 29900, method: "Mastercard •••• 8888", status: "paid", date: "Aug 19, 2025", type: "Booking" },
  { id: "INV-2025-008", member: "Rachel Green", plan: "Hot Desk", amount: 4000, method: "Visa •••• 4242", status: "paid", date: "Aug 19, 2025", type: "Booking" },
  { id: "INV-2025-009", member: "Omar Hassan", plan: "Monthly Pro", amount: 20000, method: "Bank Transfer", status: "overdue", date: "Aug 15, 2025", type: "Membership" },
  { id: "INV-2025-010", member: "Sophia Garcia", plan: "Weekly Pass", amount: 5000, method: "Apple Pay", status: "paid", date: "Aug 18, 2025", type: "Membership" },
];

const statusColors = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
  refunded: "bg-gray-100 text-gray-600",
};

const statusIcons = {
  paid: CheckCircle,
  pending: Clock,
  overdue: XCircle,
  refunded: RefreshCw,
};

export default function AdminPayments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = payments.filter(
    (p) =>
      (p.member.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "all" || p.status === statusFilter)
  );

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter((p) => p.status === "overdue").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payments & Invoices</h2>
          <p className="text-gray-500 mt-1">Track all payments, invoices, and refunds.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
            <Download size={16} /> Export
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm">
            <Plus size={16} /> Create Invoice
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Collected", value: `$${totalPaid.toLocaleString()}`, icon: DollarSign, color: "bg-green-50 text-green-600", change: "+15.3%", up: true },
          { label: "Pending", value: `$${totalPending.toLocaleString()}`, icon: Clock, color: "bg-amber-50 text-amber-600", change: "-5.2%", up: false },
          { label: "Overdue", value: `$${totalOverdue.toLocaleString()}`, icon: XCircle, color: "bg-red-50 text-red-600", change: "+2.1%", up: true },
          { label: "Refunds", value: "$12,000", icon: RefreshCw, color: "bg-gray-50 text-gray-600", change: "-10%", up: false },
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{m.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{m.value}</p>
              </div>
              <div className={`w-10 h-10 ${m.color} rounded-xl flex items-center justify-center`}>
                <m.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {m.up ? <ArrowUpRight size={14} className="text-green-500" /> : <ArrowDownRight size={14} className="text-red-500" />}
              <span className={`text-xs font-semibold ${m.up ? "text-green-500" : "text-red-500"}`}>{m.change}</span>
              <span className="text-xs text-gray-400 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 border-b border-gray-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search payments..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none w-56" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-500 outline-none">
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Invoice</th>
                <th className="px-6 py-3">Member</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Payment Method</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((payment) => {
                const StatusIcon = statusIcons[payment.status];
                return (
                  <tr key={payment.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{payment.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">{payment.member.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{payment.member}</p>
                          <p className="text-xs text-gray-500">{payment.plan}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{payment.type}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">${payment.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{payment.method}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{payment.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[payment.status]}`}>
                        <StatusIcon size={12} /> {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><Eye size={14} className="text-gray-500" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><FileText size={14} className="text-gray-500" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition"><MoreHorizontal size={14} className="text-gray-500" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Showing {filtered.length} of {payments.length} payments</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium">1</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
