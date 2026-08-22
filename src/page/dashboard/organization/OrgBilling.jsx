import { useState } from "react";
import {
  CreditCard,
  DollarSign,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Search,
  Building,
} from "lucide-react";

const invoices = [
  { id: "INV-3001", member: "Sarah Johnson", plan: "Premium", location: "Downtown Hub", amount: "$299", date: "Aug 1, 2026", status: "paid" },
  { id: "INV-3002", member: "Michael Chen", plan: "Standard", location: "Midtown Office", amount: "$99", date: "Aug 1, 2026", status: "paid" },
  { id: "INV-3003", member: "Emma Wilson", plan: "Enterprise", location: "Downtown Hub", amount: "$599", date: "Aug 1, 2026", status: "paid" },
  { id: "INV-3004", member: "James Rodriguez", plan: "Basic", location: "Uptown Studio", amount: "$79", date: "Aug 5, 2026", status: "overdue" },
  { id: "INV-3005", member: "Lisa Park", plan: "Premium", location: "Midtown Office", amount: "$299", date: "Aug 5, 2026", status: "pending" },
  { id: "INV-3006", member: "David Kim", plan: "Standard", location: "Downtown Hub", amount: "$99", date: "Aug 10, 2026", status: "paid" },
];

const summary = [
  { label: "Total Revenue (Aug)", value: "$68,400", icon: DollarSign, color: "bg-green-50" },
  { label: "Paid", value: "$52,100", icon: CheckCircle, color: "bg-green-50" },
  { label: "Pending", value: "$8,900", icon: Clock, color: "bg-yellow-50" },
  { label: "Overdue", value: "$1,200", icon: AlertCircle, color: "bg-red-50" },
];

export default function OrganizationBilling() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = invoices.filter((inv) => {
    const matchSearch = inv.member.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || inv.status === filter;
    return matchSearch && matchFilter;
  });

  const statusColor = (s) => {
    switch (s) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-600 mt-1">Manage invoices and track payments across your organization.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium flex items-center gap-2">
          <Download className="w-4 h-4" /> Export Invoices
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-0.5">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search invoices..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
          <div className="flex gap-2">
            {["all", "paid", "pending", "overdue"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition ${filter === f ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Invoice</th>
                <th className="pb-3 font-medium">Member</th>
                <th className="pb-3 font-medium">Plan</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 font-medium text-green-600">{inv.id}</td>
                  <td className="py-4 font-medium text-gray-900">{inv.member}</td>
                  <td className="py-4 text-gray-600">{inv.plan}</td>
                  <td className="py-4 text-gray-500">{inv.location}</td>
                  <td className="py-4 font-semibold text-gray-900">{inv.amount}</td>
                  <td className="py-4 text-gray-500">{inv.date}</td>
                  <td className="py-4"><span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColor(inv.status)}`}>{inv.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
