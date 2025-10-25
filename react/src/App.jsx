import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import BlankLayout from "./layouts/BlankLayout";

import NotFound from "./pages/NotFound";

import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Media from "./pages/admin/Media";

import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang không cần header/footer */}
        <Route element={<BlankLayout />}>
          <Route path="/admin/media" element={<Media />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>

        {/* User routes */}
        <Route element={<UserLayout />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/settings" element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
