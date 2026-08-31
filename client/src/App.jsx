import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

import { fetchMe } from "./redux/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const { booted, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  if (!booted) {
    return <p className="loading">Starting ChatApp...</p>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? "/chat" : "/login"}
            replace
          />
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/chat"
        element={
          isAuthenticated ? (
            <Chat />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}