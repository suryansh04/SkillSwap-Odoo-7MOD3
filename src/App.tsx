import React from "react";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import MainPage from "./components/mainPage";

const App = () => {
  return (
    <Routes>
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};

export default App;
