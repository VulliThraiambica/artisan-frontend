import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../store/authStore";
import api from "../api/axios";
import "../styles/profile.css";

function Profile() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [ordersCount, setOrdersCount] =
    useState(0);

  const [wishlistCount, setWishlistCount] =
    useState(0);

const [sales, setSales] =
  useState(null);


const [productDetails,
  setProductDetails] =
  useState([]);

  const [cartCount, setCartCount] =
    useState(0);

  const getProfileStats = async () => {

    try {

      const orderRes =
        await api.get(
          "/orders/my-orders"
        );

      setOrdersCount(
        orderRes.data.orders.length
      );

      const wishlistRes =
        await api.get(
          "/wishlist"
        );

      setWishlistCount(
        wishlistRes.data.wishlist.length
      );

      const cartRes =
        await api.get(
          "/cart"
        );

      setCartCount(
        cartRes.data.cartItems.length
      );

    } catch (error) {

      console.log(error);

    }

  };

useEffect(() => {

  getProfileStats();

  const getSales = async () => {

    try {

      const res =
        await api.get(
          "/admin/artisan-sales"
        );

      setSales(res.data);

      const productRes =
  await api.get(
    "/admin/artisan-product-details"
  );

setProductDetails(
  productRes.data.products
);

    } catch (error) {

      console.log(error);

    }

  };

  if (user?.role === "artisan") {

    getSales();

  }

}, []);
  return (

    <div className="profile-page">

      <div className="profile-card">

        {/* Header */}
        <div className="profile-header">

          <div className="profile-avatar">

            {
              user?.name
                ?.charAt(0)
                .toUpperCase() || "U"
            }

          </div>

          <div>

            <h1>{user?.name}</h1>

            <span className="role-badge">

              {
                user?.role === "artisan"
                  ? "Artisan"
                  : "Customer"
              }

            </span>

          </div>

        </div>

        {/* User Info */}
        <div className="profile-info">

          <div className="info-item">

            <label>
              Full Name
            </label>

            <p>{user?.name}</p>

          </div>

          <div className="info-item">

            <label>
              Email
            </label>

            <p>{user?.email}</p>

          </div>

          <div className="info-item">

            <label>
              Account Type
            </label>

            <p>{user?.role}</p>

          </div>

        </div>

        {/* Stats */}
        <div className="profile-stats">

          <div
            className="stat-card"
            onClick={() =>
              navigate("/orders")
            }
          >

            <h3>Orders</h3>

            <p>{ordersCount}</p>

          </div>

          <div
            className="stat-card"
            onClick={() =>
              navigate("/wishlist")
            }
          >

            <h3>Wishlist</h3>

            <p>{wishlistCount}</p>

          </div>

          <div
            className="stat-card"
            onClick={() =>
              navigate("/cart")
            }
          >

            <h3>Cart</h3>

            <p>{cartCount}</p>

          </div>

        </div>
{
  user?.role === "artisan" && (

    <div className="artisan-panel">
<div className="artisan-actions">

  <Link
    to="/admin/products/create"
    className="artisan-action-card"
  >
    <span className="action-icon">
      ➕
    </span>

    <h3>Add Product</h3>

    <p>
      Create and publish
      new handmade products
    </p>
  </Link>

  <Link
    to="/admin/products"
    className="artisan-action-card"
  >
    <span className="action-icon">
      📦
    </span>

    <h3>Manage Products</h3>

    <p>
      Edit, update stock
      and manage listings
    </p>
  </Link>

</div>


<div className="artisan-sales">

  <div className="profile-stat-card">

    <h4>Products</h4>

    <p>
      {sales?.totalProducts || 0}
    </p>

  </div>

  <div className="profile-stat-card">

    <h4>Sold</h4>

    <p>
      {sales?.totalSold || 0}
    </p>

  </div>

  <div className="profile-stat-card">

    <h4>Revenue</h4>

    <p>
      ₹{sales?.totalRevenue || 0}
    </p>

  </div>

</div>

<div className="artisan-products-list">

  <h3>
    Product Performance
  </h3>

  {productDetails.map(
    (product) => (

      <div
        key={product._id}
        className="product-performance-card"
      >

        <img
          src={product.image}
          alt={product.title}
        />

        <div>

          <h4>
            {product.title}
          </h4>

          <p>
            Sold:
            {product.sold}
          </p>

          <p>
            Revenue:
            ₹{product.revenue}
          </p>

          <p>
            Stock:
            {product.stock}
          </p>

        </div>

      </div>

    )
  )}

</div>

    </div>

  )
}
        {/* Quick Actions */}
        <div className="profile-actions">

          <button
            onClick={() =>
              navigate("/orders")
            }
          >
            My Orders
          </button>

          <button
            onClick={() =>
              navigate("/wishlist")
            }
          >
            My Wishlist
          </button>

          <button
            onClick={() =>
              navigate("/cart")
            }
          >
            My Cart
          </button>

        </div>

      </div>

    </div>

  );

}

export default Profile;