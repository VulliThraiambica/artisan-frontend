import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/checkout.css";
import api from "../api/axios";

function Checkout() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // COD Order
  const placeCODOrder = async () => {

    try {

      const totalPrice =
        Number(
          localStorage.getItem("cartTotal")
        ) || 100;

      await api.post(
        "/orders/place",
        {
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
          totalPrice,
        }
      );

      toast.success(
        "COD Order Placed Successfully"
      );

      localStorage.removeItem(
        "cartTotal"
      );

      navigate("/orders");

    } catch (error) {

      console.log(error);
console.log(
  "ERROR:",
  error.response?.data
);     

alert(
  error.response?.data?.message
);

toast.error(
        "COD Order Failed"
      );

    }

  };

  // Online Payment
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const totalPrice =
        Number(
          localStorage.getItem("cartTotal")
        ) || 100;

      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(formData)
      );

      const res = await api.post(
        "/orders/create-payment",
        {
          amount: totalPrice,
        }
      );

      const options = {

        key:
          "rzp_test_SzDRjqff5jF4nO",

        amount:
          res.data.order.amount,

        currency:
          res.data.order.currency,

        name:
          "Artisan Marketplace",

        description:
          "Order Payment",

        order_id:
          res.data.order.id,

        prefill: {

          name:
            formData.name,

          contact:
            formData.phone,

        },

        theme: {
          color: "#000000",
        },

        handler: async function () {

          try {

            await api.post(
              "/orders/place",
              {
                shippingAddress: {
                  address: formData.address,
                  city: formData.city,
                  state: formData.state,
                  pincode: formData.pincode,
                },
                totalPrice,
              }
            );

            toast.success(
              "Payment Successful & Order Placed"
            );

            localStorage.removeItem(
              "cartTotal"
            );

            navigate("/orders");

          } catch (error) {

            console.log(error);

            toast.error(
              "Order creation failed"
            );

          }

        },

      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    } catch (error) {

      console.log(error);

      toast.error(
        "Payment Failed"
      );

    }

  };

  return (

    <div className="checkout-page">

      <h1>
        Checkout
      </h1>

      <form
        className="checkout-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Mobile Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Pay online
        </button>

        <button
          type="button"
          className="cod-btn"
          onClick={placeCODOrder}
        >
          Cash On Delivery
        </button>

      </form>

    </div>

  );

}

export default Checkout;