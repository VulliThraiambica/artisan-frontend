import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../store/authStore";
import api from "../api/axios";
import toast from "react-hot-toast";
import "../styles/auth.css";

function Login() {

  const navigate = useNavigate();
const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);


  // handle input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // handle login
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post(
  "/auth/login",
  formData,
 
);

console.log("LOGIN RESPONSE:", res.data);

localStorage.setItem(
  "token",
  res.data.token
);

console.log(
  "Saved Token:",
  res.data.token
);

console.log(res.data);

   localStorage.setItem(
  "token",
  res.data.token
);

setUser(res.data.user);

toast.success(
  res.data.message
);

navigate("/products");

    } catch (error) {

    toast.error(
  error.response?.data?.message ||
  "Login failed"
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
  Welcome Back
</h1>

<p className="auth-subtitle">
  Login to continue shopping
</p>
        <h1>Login</h1>
<p className="auth-subtitle">
  Sign in to continue shopping
</p>
<p className="auth-switch">

  Don't have an account?

  <Link to="/register">
    Register
  </Link>

</p>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">

          {
            loading
            ? "Loading..."
            : "Login"
          }

        </button>

      </form>

    </div>

  );

}

export default Login;