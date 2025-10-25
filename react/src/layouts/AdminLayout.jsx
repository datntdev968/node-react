import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <header className="bg-gray-800 text-white p-4">
        <h1>Admin Panel</h1>
      </header>
      <div className="flex">
        <aside className="w-60 bg-gray-200 p-4">
          <nav>
            <Link to="/admin/dashboard">Dashboard</Link>
            <br />
            <Link to="/admin/users">Users</Link>
          </nav>
        </aside>

        <main className="flex-1 p-4">
          <Outlet />
        </main>
        
      </div>
      <footer className="bg-gray-300 p-4 text-center">Admin Footer</footer>
    </div>
  );
};

export default AdminLayout;
