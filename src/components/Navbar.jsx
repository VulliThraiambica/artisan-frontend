import {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../api/axios";

import { useAuth }
from "../store/authStore";

import { useCart }
from "../store/cartStore";
import "../styles/navbar.css";
function Navbar() {

  const navigate =
    useNavigate();

  const { user, setUser } =
    useAuth();

  const {
    cartCount,
    setCartCount,
  } = useCart();

  const [menuOpen,
    setMenuOpen] =
    useState(false);

const [darkMode,
  setDarkMode] =
  useState(false);


  // fetch cart count
  const getCartCount =
    async () => {

      try {

        const res =
          await api.get(
            "/cart"
          );

        setCartCount(

          res.data.cartItems
          .length

        );

      } catch (error) {

        console.log(error);

      }

    };

useEffect(() => {

  if (darkMode) {

    document.body.classList.add(
      "dark"
    );

  } else {

    document.body.classList.remove(
      "dark"
    );

  }

}, [darkMode]);
  // get cart count
  useEffect(() => {

    if (user) {

      getCartCount();

    }

  }, [user]);


  // close menu on resize
  useEffect(() => {

    const handleResize =
      () => {

        if (
          window.innerWidth > 768
        ) {

          setMenuOpen(false);

        }

      };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>

      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);


  // logout
  const handleLogout =
    async () => {

      try {

        await api.post(
          "/auth/logout"
        );

        setUser(null);

        navigate("/login");

      } catch (error) {

        console.log(error);

      }

    };


  // close mobile menu
  const closeMenu = () => {

    setMenuOpen(false);

  };


  return (

    <nav className="navbar">

      {/* logo */}
      <Link
        to="/"

        className="logo"

        onClick={closeMenu}
      >

        Artisan Market

      </Link>


      {/* hamburger */}
      <div
        className="menu-icon"

        onClick={() =>

          setMenuOpen(
            !menuOpen
          )
        }
      >

        {
          menuOpen
          ? "✕"
          : "☰"
        }

      </div>


      {/* nav links */}
      <div
        className={`nav-links

          ${menuOpen
            ? "active"
            : ""
          }`
        }
      >

        <Link
          to="/"

          onClick={closeMenu}
        >
          Home
        </Link>


        <Link
          to="/products"

          onClick={closeMenu}
        >
          Products
        </Link>


       <Link
  to="/cart"
  onClick={closeMenu}
>

  Cart

  {
    cartCount > 0 && (

      <span className="cart-badge">

        {cartCount}

      </span>

    )
  }

</Link>


        {
  user ? (
    <>

      <span className="nav-user">

        Hi, {user.name}

      </span>

              <Link
                to="/wishlist"

                onClick={closeMenu}
              >
                Wishlist
              </Link>


              <Link
                to="/orders"

                onClick={closeMenu}
              >
                Orders
              </Link>


              <Link
                to="/profile"

                onClick={closeMenu}
              >
                Profile
              </Link>


              {
  user?.role === "admin" && (

    <Link
      to="/admin"
      onClick={closeMenu}
    >
      Admin
    </Link>

  )
}

<button
  className="dark-btn"

  onClick={() =>

    setDarkMode(
      !darkMode
    )
  }
>

  {
    darkMode
    ? "☀️"
    : "🌙"
  }

</button>

              <button
                onClick={
                  handleLogout
                }

                className="logout-btn"
              >

                Logout

              </button>

            </>

          ) : (

            <>

              <Link
                to="/login"

                onClick={closeMenu}
              >
                Login
              </Link>


              <Link
                to="/register"

                onClick={closeMenu}
              >
                Register
              </Link>

            </>

          )
        }

      </div>

    </nav>

  );

}

export default Navbar;