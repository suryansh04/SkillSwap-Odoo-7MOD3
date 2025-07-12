import React, { useState } from "react";
import "./recommender.css";
// @ts-expect-error: Importing JSX file without type declaration
import AdminLogin from "../admin/AdminLogin";
// @ts-expect-error: Importing JSX file without type declaration
import AdminDashboard from "../admin/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

type Match = {
  name: string;
  email: string;
  similarity: number;
  availability: string;
  skillsOffered: string[];
  error?: string;
} | null;

const RecommenderApp = () => {
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState<Match>(null);

  const findMatch = async () => {
    setLoading(true);
    setMatch(null);
    try {
      const response = await fetch("http://localhost:8000/find-match");
      const data = await response.json();
      setMatch(data);
    } catch (error) {
      setMatch({
        name: "",
        email: "",
        similarity: 0,
        availability: "",
        skillsOffered: [],
        error: "Failed to fetch match.",
      });
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (match && !match.error) {
    return <div>Match found: {match.name}</div>;
  }

  if (match?.error) {
    return <div>Error: {match.error}</div>;
  }

  // Initial state
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/"
          element={
            <div>
              <h1>SkillMatch</h1>
              <button onClick={findMatch}>Find My Collaboration Partner</button>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default RecommenderApp;
