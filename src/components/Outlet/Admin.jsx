import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Outlet />
    </div>
  );
}

export default AdminLayout;
