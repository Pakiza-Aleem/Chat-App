import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../redux/authSlice";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
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

    if (form.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    const result = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(result)) {
      navigate("/chat");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>

        <p>Register to start chatting</p>

        <form onSubmit={onSubmit}>
          <label>Name</label>

          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />

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
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}