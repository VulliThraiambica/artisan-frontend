import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import api from "../api/axios";
import "../styles/wishlist.css";
import toast from "react-hot-toast";

function Wishlist() {

  const [wishlist, setWishlist] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // fetch wishlist
  const getWishlist = async () => {

    try {

      const res = await api.get(
        "/wishlist"
      );

      setWishlist(
        res.data.wishlist
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  // remove wishlist
  const removeWishlist = async (
    id
  ) => {

    try {

      await api.delete(
        `/wishlist/remove/${id}`
      );

      setWishlist(
        wishlist.filter(
          (item) =>
            item._id !== id
        )
      );

      toast.success(
        "Removed from wishlist"
      );

    } catch (error) {

      toast.error(
        "Remove failed"
      );

    }

  };


  useEffect(() => {

    getWishlist();

  }, []);


  if (loading) {

    return <h2>Loading...</h2>;

  }


  return (

  <div className="page-fade">

    <div className="wishlist-page">

      <h1>
        My Wishlist
      </h1>

      {
        wishlist.length === 0 ? (

          <h2>
            Wishlist is empty
          </h2>

        ) : (

        <div className="wishlist-grid">

  {
    wishlist.map((item) => (

      <div
        key={item._id}
        className="wishlist-card"
      >

        <img
          src={item.image}
          alt={item.title}
        />

        <div className="wishlist-content">

          <h3>
            {item.title}
          </h3>

          <p className="category">
            {item.category}
          </p>

<p className="wishlist-price">
              ₹ {item.price}
          </p>

<div className="wishlist-actions">
            <Link
              to={`/products/${item._id}`}
              className="view-btn"
            >
              View Details
            </Link>

            <button
              className="remove-btn"
              onClick={() =>
                removeWishlist(
                  item._id
                )
              }
            >
              Remove
            </button>

          </div>

        </div>

      </div>

    ))
  }

</div>

        )
      }

    </div>
</div>
  );

}

export default Wishlist;