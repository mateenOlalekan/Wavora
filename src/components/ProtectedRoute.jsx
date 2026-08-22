import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Route guard component that protects routes based on authentication and role.
 *
 * Usage:
 *   <ProtectedRoute>                    → requires any authenticated user
 *   <ProtectedRoute role="admin">       → requires admin role
 *   <ProtectedRoute roles={["admin","staff"]}> → requires one of the listed roles
 *   <ProtectedRoute guestOnly>          → only for unauthenticated users (redirects authenticated users)
 */
export default function ProtectedRoute({
  children,
  role,
  roles,
  guestOnly = false,
  redirectTo = "/login",
}) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Guest-only routes: redirect authenticated users to their dashboard
  if (guestOnly && user) {
    const redirectPath = getDashboardPath(user.role);
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Protected routes: redirect unauthenticated users to login
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Role-based access control
  if (role && user.role !== role) {
    const redirectPath = getDashboardPath(user.role);
    return <Navigate to={redirectPath} state={{ from: location, error: "insufficient_permissions" }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    const redirectPath = getDashboardPath(user.role);
    return <Navigate to={redirectPath} state={{ from: location, error: "insufficient_permissions" }} replace />;
  }

  return children;
}

function getDashboardPath(role) {
  switch (role) {
    case "admin":
      return "/admin";
    case "member":
      return "/member";
    case "staff":
      return "/staff";
    case "organization":
      return "/organization";
    default:
      return "/";
  }
}
