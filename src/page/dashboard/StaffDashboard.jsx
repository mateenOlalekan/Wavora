import {
  Calendar,
  UserCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  Wrench,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  ClipboardList,
  Bell,
  MapPin,
  Users,
  BookOpen,
} from "lucide-react";

// Mock data
const todayCheckins = [
  {
    id: 1,
    name: "Sarah Chen",
    space: "Private Office A",
    time: "8:45 AM",
    type: "Member",
    status: "checked-in",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    space: "Meeting Room B",
    time: "9:15 AM",
    type: "Guest",
    status: "checked-in",
  },
  {
    id: 3,
    name: "Dr. Aisha Bello",
    space: "Conference Hall",
    time: "10:00 AM",
    type: "Member",
    status: "expected",
  },
  {
    id: 4,
    name: "Emily Watson",
    space: "Media Studio",
    time: "11:30 AM",
    type: "Guest",
    status: "expected",
  },
  {
    id: 5,
    name: "James Kim",
    space: "Shared Desk",
    time: "12:00 PM",
    type: "Member",
    status: "checked-in",
  },
];

const maintenanceTasks = [
  {
    id: 1,
    task: "AC filter replacement",
    space: "Floor 2",
    priority: "high",
    status: "pending",
    assignedTo: "John D.",
  },
  {
    id: 2,
    task: "Printer maintenance",
    space: "Lobby",
    priority: "medium",
    status: "in-progress",
    assignedTo: "You",
  },
  {
    id: 3,
    task: "Light bulb replacement",
    space: "Meeting Room C",
    priority: "low",
    status: "completed",
    assignedTo: "Maria S.",
  },
  {
    id: 4,
    task: "WiFi router check",
    space: "Floor 3",
    priority: "medium",
    status: "pending",
    assignedTo: "Tech Team",
  },
];

const todaySchedule = [
  {
    id: 1,
    event: "Morning briefing",
    time: "8:30 AM",
    location: "Staff Room",
  },
  {
    id: 2,
    event: "Space inspection - Floor 2",
    time: "10:00 AM",
    location: "Floor 2",
  },
  {
    id: 3,
    event: "Event setup - Networking Mixer",
    time: "4:00 PM",
    location: "Main Lounge",
  },
  {
    id: 4,
    event: "End of day walkthrough",
    time: "5:30 PM",
    location: "All Floors",
  },
];

const statusColors = {
  "checked-in": "bg-green-100 text-green-700",
  expected: "bg-blue-100 text-blue-700",
  absent: "bg-red-100 text-red-700",
};

const priorityColors = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

const taskStatusColors = {
  pending: "bg-amber-100 text-amber-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, Staff
          </h2>
          <p className="text-gray-500 mt-1">
            Here's today's overview for your shift.
          </p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2 shadow-sm w-fit">
          <UserCheck size={16} />
          Check-in Guest
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: UserCheck,
            label: "Check-ins Today",
            value: "3",
            color: "bg-green-50 text-green-600",
          },
          {
            icon: Clock,
            label: "Expected",
            value: "2",
            color: "bg-blue-50 text-blue-600",
          },
          {
            icon: AlertCircle,
            label: "Open Issues",
            value: "4",
            color: "bg-amber-50 text-amber-600",
          },
          {
            icon: Calendar,
            label: "Events Today",
            value: "1",
            color: "bg-purple-50 text-purple-600",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Check-ins (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">
              Today's Check-ins
            </h3>
            <button className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-medium hover:bg-green-100 transition flex items-center gap-1">
              <UserCheck size={14} />
              New Check-in
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {todayCheckins.map((checkin) => (
              <div
                key={checkin.id}
                className="px-6 py-3 flex items-center justify-between hover:bg-gray-50/50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {checkin.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {checkin.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {checkin.space} • {checkin.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{checkin.time}</span>
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      statusColors[checkin.status]
                    }`}
                  >
                    {checkin.status}
                  </span>
                  {checkin.status === "expected" && (
                    <button className="px-2 py-1 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition">
                      Check In
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">
              Today's Schedule
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {todaySchedule.map((item) => (
              <div key={item.id} className="px-6 py-3 hover:bg-gray-50/50 transition">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.event}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {item.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={10} />
                        {item.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance Tasks */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Wrench size={18} className="text-gray-500" />
            Maintenance Tasks
          </h3>
          <button className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-medium hover:bg-green-100 transition flex items-center gap-1">
            <ClipboardList size={14} />
            Add Task
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Task</th>
                <th className="px-6 py-3">Space</th>
                <th className="px-6 py-3">Priority</th>
                <th className="px-6 py-3">Assigned</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {maintenanceTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">
                    {task.task}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {task.space}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        priorityColors[task.priority]
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {task.assignedTo}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        taskStatusColors[task.status]
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
