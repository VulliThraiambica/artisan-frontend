import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import "../styles/auth.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post(
        "/auth/register",
        formData
      );

      toast.success(
        res.data.message
      );

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-page">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <div className="auth-logo">
          Artisan Market
        </div>

        <h1>
          Create Account
        </h1>

        <p className="auth-subtitle">
          Join Artisan Marketplace today
        </p>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >

          <option value="buyer">
            Customer
          </option>

          <option value="artisan">
            Artisan
          </option>

        </select>

        <button type="submit">

          {
            loading
              ? "Creating Account..."
              : "Create Account"
          }

        </button>

        <p className="auth-switch">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </form>

    </div>

  );

}

export default Register;