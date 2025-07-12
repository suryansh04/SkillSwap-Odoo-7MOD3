import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import RecommenderApp from "./components/recommender/RecommenderApp";
// @ts-expect-error: Importing JSX file without type declaration
import AdminLogin from "./components/admin/AdminLogin";
// @ts-expect-error: Importing JSX file without type declaration
import AdminDashboard from "./components/admin/AdminDashboard";

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="/recommender/*" element={<RecommenderApp />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
