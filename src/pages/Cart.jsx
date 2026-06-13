import { useEffect, useState } from "react";

import api from "../api/axios";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/cart.css";
function Cart() {

  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

  // fetch cart
  const getCartItems = async () => {

    try {

      const res = await api.get("/cart");

      setCartItems(res.data.cartItems);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  // remove cart item
  const removeCartItem = async (id) => {

    try {

      await api.delete(`/cart/remove/${id}`);

      getCartItems();

    } catch (error) {

      console.log(error);

    }

  };

const updateQuantity = async (
  cartId,
  quantity
) => {

  try {

    await api.put(
      `/cart/update/${cartId}`,
      { quantity }
    );

    getCartItems();

  } catch (error) {

    console.log(error);

    toast.error(
      "Failed to update quantity"
    );

  }

};
  useEffect(() => {

    getCartItems();

  }, []);


  // total price
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );


  if (loading) {

    return <h2>Loading...</h2>;

  }

const placeOrder = async () => {

  try {

    const res = await api.post(
      "/orders/place",
      {
        shippingAddress: {
          address: "Street 1",
          city: "Hyderabad",
          state: "Telangana",
          pincode: "500001",
        },

        totalPrice,
      }
    );

    toast.success(res.data.message);

    navigate("/orders");

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Order failed"
    );

  }

};
  return (

    <div className="cart-page">

      <h1>My Cart</h1>

     {
  cartItems.length === 0 ? (

    <div className="empty-cart">

      <div className="empty-cart-icon">
        🛒
      </div>

      <h2>
        Your Cart is Empty
      </h2>

      <p>
        Looks like you haven't added
        any products yet.
      </p>

      <button
        className="shop-btn"
        onClick={() =>
          navigate("/products")
        }
      >
        Continue Shopping
      </button>

    </div>

  ) : (

         <div className="cart-layout">

  <div className="cart-products">

    {cartItems.map((item) => (

      <div
        className="cart-item"
        key={item._id}
      >

        <div className="cart-left">

          <img
            src={item.product.image}
            alt={item.product.title}
          />

          <div className="cart-info">

            <h3>
              {item.product.title}
            </h3>

            <p className="cart-price">
              ₹ {item.product.price}
            </p>

          <div className="cart-quantity">

  <button
    onClick={() =>
      updateQuantity(
        item._id,
        item.quantity - 1
      )
    }
    disabled={item.quantity <= 1}
  >
    -
  </button>

  <span>{item.quantity}</span>

  <button
    onClick={() =>
      updateQuantity(
        item._id,
        item.quantity + 1
      )
    }
  >
    +
  </button>

</div>

          </div>

        </div>

        <button
          onClick={() =>
            removeCartItem(item._id)
          }
        >
          Remove
        </button>

      </div>

    ))}

  </div>

  <div className="cart-summary">

    <h2>Order Summary</h2>

    <div className="summary-row">

      <span>Items</span>

      <span>{cartItems.length}</span>

    </div>

    <div className="summary-row">

      <span>Total</span>

      <span>₹ {totalPrice}</span>

    </div>

   <button
  className="checkout-btn"
  onClick={() => navigate("/checkout")}
>
  Proceed To Order
</button>

  </div>

</div>

        )
      }

    </div>

  );

}

export default Cart;