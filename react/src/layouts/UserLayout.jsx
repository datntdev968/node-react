import React from "react";
import { Outlet, Link } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <Link to="/">Home</Link> | <Link to="/user/profile">Profile</Link>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
      <footer className="bg-blue-200 p-4 text-center">User Footer</footer>
    </div>
  );
};

export default UserLayout;
