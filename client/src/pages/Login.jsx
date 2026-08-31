import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../redux/authSlice";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(result)) {
      navigate("/chat");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>ChatApp</h1>

        <p>Login to start chatting</p>

        <form onSubmit={onSubmit}>
          <label>Email</label>

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />

          <label>Password</label>

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}