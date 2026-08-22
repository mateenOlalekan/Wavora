import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../components/Layout/Loading";
import Main from "../components/Outlet/Main";
import AuthLayout from "../components/Outlet/Auth";
import DashboardLayout from "../components/Outlet/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

// Public pages
const Home = lazy(() => import("../page/Home"));
const About = lazy(() => import("../page/About"));
const Contact = lazy(() => import("../page/Contact"));
const Other = lazy(() => import("../page/Other"));
const Login = lazy(() => import("../page/Auth/Login"));
const Register = lazy(() => import("../page/Auth/Register"));
const Blog = lazy(() => import("../page/Blog"));
const Careers = lazy(() => import("../page/Careers"));
const PrivacyPolicy = lazy(() => import("../page/PrivacyPolicy"));
const TermsOfService = lazy(() => import("../page/TermsOfService"));
const CookiesPage = lazy(() => import("../page/Cookies"));

// Admin dashboard pages
const AdminDashboard = lazy(() => import("../page/dashboard/AdminDashboard"));
const AdminUsers = lazy(() => import("../page/dashboard/admin/Users"));
const AdminBookings = lazy(() => import("../page/dashboard/admin/Bookings"));
const AdminRevenue = lazy(() => import("../page/dashboard/admin/Revenue"));
const AdminSpaces = lazy(() => import("../page/dashboard/admin/Spaces"));
const AdminPayments = lazy(() => import("../page/dashboard/admin/Payments"));
const AdminSupport = lazy(() => import("../page/dashboard/admin/Support"));
const AdminSettings = lazy(() => import("../page/dashboard/admin/Settings"));

// Member dashboard pages
const MemberDashboard = lazy(() => import("../page/dashboard/MemberDashboard"));
const MemberBookings = lazy(() => import("../page/dashboard/member/Bookings"));
const MemberMembership = lazy(() => import("../page/dashboard/member/Membership"));
const MemberEvents = lazy(() => import("../page/dashboard/member/Events"));
const MemberCommunity = lazy(() => import("../page/dashboard/member/Community"));
const MemberMessages = lazy(() => import("../page/dashboard/member/Messages"));
const MemberHelp = lazy(() => import("../page/dashboard/member/Help"));
const MemberSettings = lazy(() => import("../page/dashboard/member/Settings"));

// Staff dashboard pages
const StaffDashboard = lazy(() => import("../page/dashboard/StaffDashboard"));
const StaffCheckin = lazy(() => import("../page/dashboard/staff/CheckIn"));
const StaffBookings = lazy(() => import("../page/dashboard/staff/Bookings"));
const StaffMaintenance = lazy(() => import("../page/dashboard/staff/Maintenance"));
const StaffEvents = lazy(() => import("../page/dashboard/staff/Events"));
const StaffMessages = lazy(() => import("../page/dashboard/staff/Messages"));
const StaffSettings = lazy(() => import("../page/dashboard/staff/Settings"));

// Organization dashboard pages
const OrgDashboard = lazy(() => import("../page/dashboard/organization/OrgDashboard"));
const OrgMembers = lazy(() => import("../page/dashboard/organization/OrgMembers"));
const OrgBookings = lazy(() => import("../page/dashboard/organization/OrgBookings"));
const OrgAnalytics = lazy(() => import("../page/dashboard/organization/OrgAnalytics"));
const OrgBilling = lazy(() => import("../page/dashboard/organization/OrgBilling"));
const OrgTeam = lazy(() => import("../page/dashboard/organization/OrgTeam"));
const OrgSettings = lazy(() => import("../page/dashboard/organization/OrgSettings"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/other" element={<Other />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiesPage />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<ProtectedRoute guestOnly><Login /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute guestOnly><Register /></ProtectedRoute>} />
        </Route>

        {/* Dashboard routes (protected) */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/revenue" element={<AdminRevenue />} />
          <Route path="/admin/spaces" element={<AdminSpaces />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/support" element={<AdminSupport />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* Member Dashboard */}
          <Route path="/member" element={<MemberDashboard />} />
          <Route path="/member/bookings" element={<MemberBookings />} />
          <Route path="/member/membership" element={<MemberMembership />} />
          <Route path="/member/events" element={<MemberEvents />} />
          <Route path="/member/community" element={<MemberCommunity />} />
          <Route path="/member/messages" element={<MemberMessages />} />
          <Route path="/member/help" element={<MemberHelp />} />
          <Route path="/member/settings" element={<MemberSettings />} />

          {/* Staff Dashboard */}
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/staff/checkin" element={<StaffCheckin />} />
          <Route path="/staff/bookings" element={<StaffBookings />} />
          <Route path="/staff/maintenance" element={<StaffMaintenance />} />
          <Route path="/staff/events" element={<StaffEvents />} />
          <Route path="/staff/messages" element={<StaffMessages />} />
          <Route path="/staff/settings" element={<StaffSettings />} />

          {/* Organization Dashboard */}
          <Route path="/organization" element={<OrgDashboard />} />
          <Route path="/organization/members" element={<OrgMembers />} />
          <Route path="/organization/bookings" element={<OrgBookings />} />
          <Route path="/organization/analytics" element={<OrgAnalytics />} />
          <Route path="/organization/billing" element={<OrgBilling />} />
          <Route path="/organization/team" element={<OrgTeam />} />
          <Route path="/organization/settings" element={<OrgSettings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}