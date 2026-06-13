import { useEffect, useState }
from "react";

import api from "../api/axios";
import "../styles/orders.css";
import toast from "react-hot-toast";

import OrderTimeline
from "../components/OrderTimeline";
import {
  Link,
  useNavigate
} from "react-router-dom";

function Orders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
const [search,
  setSearch] =
  useState("");

const [filter,
  setFilter] =
  useState("All");

const navigate = useNavigate();
const [orderRating,
  setOrderRating] =
  useState({});

const [showRatingBox,
  setShowRatingBox] =
  useState(null);

  // fetch orders
  const getOrders = async () => {

    try {

      const res = await api.get(
        "/orders/my-orders"
      );

      setOrders(
        res.data.orders
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  // invoice
  const downloadInvoice = async (id) => {

    try {

      const res = await api.get(

        `/orders/invoice/${id}`,

        {
          responseType: "blob",
        }

      );

      const url =
        window.URL.createObjectURL(
          new Blob([res.data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",

        `invoice-${id}.pdf`
      );

      document.body.appendChild(
        link
      );

      link.click();

    } catch (error) {

      toast.error(
        "Invoice download failed"
      );

    }

  };


  // cancel order
  const cancelOrder = async (id) => {

    try {

      const res = await api.put(
        `/orders/cancel/${id}`
      );

      toast.success(
        res.data.message
      );

      getOrders();

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Cancel failed"

      );

    }

  };


  // request return
 // request return
const requestReturn = async (id) => {

  try {

    const res = await api.put(
      `/orders/return/${id}`
    );

    toast.success(
      res.data.message
    );

    getOrders();

  } catch (error) {

    toast.error(

      error.response?.data?.message ||

      "Return failed"

    );

  }

};

// request exchange
const requestExchange =
  async (id) => {

    try {

      const res =
        await api.put(
          `/orders/exchange/${id}`
        );

      toast.success(
        res.data.message
      );

      getOrders();

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Exchange failed"

      );

    }

  };


  // status icon
  const getStatusIcon =
    (status) => {

      switch (status) {

        case "Placed":

          return "🛒";

        case "Shipped":

          return "📦";

        case "Out For Delivery":

          return "🚚";

        case "Delivered":

          return "✅";

        case "Cancelled":

          return "❌";

        default:

          return "📦";

      }

    };


  // progress
  const getProgress =
    (status) => {

      switch (status) {

        case "Placed":

          return 25;

        case "Shipped":

          return 50;

        case "Out For Delivery":

          return 75;

        case "Delivered":

          return 100;

        default:

          return 0;

      }

    };

// reorder
const reorderItems = async (order) => {

  try {

    for (const item of order.orderItems) {

      if (!item.product) continue;

      await api.post(
        "/cart/add",
        {
          productId: item.product._id,
          quantity: item.quantity,
        }
      );

    }
toast.success(
  "Items added to cart"
);

navigate("/cart");

  } catch (error) {

    console.log(error);

    console.log(
      error.response?.data
    );

    toast.error(
      error.response?.data?.message ||
      "Reorder failed"
    );

  }

};

  useEffect(() => {

    getOrders();

  }, []);


  if (loading) {

  return (

  <div className="page-fade">

    <div className="skeleton-container">

      {
        [...Array(6)].map(
          (_, index) => (

            <div
              key={index}

              className="skeleton-card"
            >

              <div className="skeleton-image">

              </div>

              <div className="skeleton-line">

              </div>

              <div className="skeleton-line short">

              </div>

            </div>

          )
        )
      }

    </div>
</div>
  );

}

const filteredOrders =

  orders.filter((order) => {

    const matchesSearch =

      order.orderItems.some(
        (item) =>

          item.product?.title
          ?.toLowerCase()

          .includes(
            search.toLowerCase()
          )
      );

    const matchesFilter =

      filter === "All"

      ||

      order.orderStatus ===
      filter;

    return (
      matchesSearch
      &&
      matchesFilter
    );

  });

  return (

    <div className="orders-page">

      <h1>
        My Orders
      </h1>

<div className="orders-controls">

  <input
    type="text"

    placeholder="Search orders..."

    value={search}

    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
  />


  <select
    value={filter}

    onChange={(e) =>
      setFilter(
        e.target.value
      )
    }
  >

    <option value="All">
      All Orders
    </option>

    <option value="Placed">
      Placed
    </option>

    <option value="Shipped">
      Shipped
    </option>

    <option value="Out For Delivery">
      Out For Delivery
    </option>

    <option value="Delivered">
      Delivered
    </option>

    <option value="Cancelled">
      Cancelled
    </option>

  </select>

</div>

      {
        orders.length === 0 ? (
<div className="empty-orders">

  <div className="empty-icon">

    📦

  </div>

  <h2>
    No Orders Yet
  </h2>

  <p>

    Your future handcrafted treasures
    will appear here ✨

  </p>


  <Link
    to="/products"

    className="shop-btn"
  >

    Explore Products

  </Link>

</div>

        ) : (

          filteredOrders.map((order) => (

            <div
              key={order._id}

              className="order-card"
            >

              {/* order id */}
            <h3 className="order-number">
  Order #{order._id.slice(-6)}
</h3>

<p className="order-date">
  Ordered On:
  {
    new Date(
      order.createdAt
    ).toLocaleDateString()
  }
</p>


              {/* total */}
              <p>

                Total:
                ₹ {order.totalPrice}

              </p>


              {/* estimated delivery */}
              <p>

                Estimated Delivery:

                {
                  new Date(
                    order.estimatedDelivery
                  ).toDateString()
                }

              </p>


              {/* order status */}
           <div
  className={`order-status
  ${order.orderStatus
    .toLowerCase()
    .replaceAll(" ", "-")}`}
>

  <span className="status-icon">

    {
      getStatusIcon(
        order.orderStatus
      )
    }

  </span>

  <span className="status-text">

    {
      order.orderStatus
    }

  </span>

</div>
{
  order.orderStatus ===
  "Delivered"

  && (

    <>
      <div className="delivery-success">

        🎉 Order delivered successfully!
        Thank you for shopping with us.

      </div>

      <button
        className="rate-order-btn"

        onClick={() =>
          setShowRatingBox(
            order._id
          )
        }
      >

        ⭐ Rate Experience

      </button>

      {
        showRatingBox ===
        order._id

        && (

          <div className="order-rating-box">

            <select
              value={
                orderRating[
                  order._id
                ] || ""
              }

              onChange={(e) =>

                setOrderRating({

                  ...orderRating,

                  [order._id]:
                    e.target.value,

                })
              }
            >

              <option value="">
                Select Rating
              </option>

              <option value="5">
                ⭐⭐⭐⭐⭐
              </option>

              <option value="4">
                ⭐⭐⭐⭐
              </option>

              <option value="3">
                ⭐⭐⭐
              </option>

              <option value="2">
                ⭐⭐
              </option>

              <option value="1">
                ⭐
              </option>

            </select>

            <button
              className="submit-rating-btn"

              onClick={async () => {

                try {

                  const res =
                    await api.put(

                      `/orders/rate/${order._id}`,

                      {
                        rating:
                          orderRating[
                            order._id
                          ],
                      }

                    );

                  toast.success(
                    res.data.message
                  );

                  setShowRatingBox(
                    null
                  );

                  getOrders();

                } catch (error) {

                  toast.error(
                    "Rating failed"
                  );

                }

              }}
            >

              Submit

            </button>

          </div>

        )
      }

    </>

  )
}

              {/* return status */}
              {
                order.returnRequested && (

                  <p className="return-text">

                    Return Requested

                  </p>

                )
                
              }


{
  order.exchangeRequested && (

    <p className="return-text">

      Exchange Requested

    </p>

  )
}

              {/* order timeline */}
              {
                order.orderStatus !==
                "Cancelled"

                && (

                  <OrderTimeline
                    status={
                      order.orderStatus
                    }
                  />

                )
              }


              {/* progress */}
    

              {/* products */}
              <div className="order-products">

                {
                  order.orderItems.map(
                    (item) => (

                      <div
                        key={item._id}

                        className="order-product"
                      >

                        <img
                          src={
                            item.product?.images?.[0]

                            ||

                            item.product?.image
                          }

                          alt={
                            item.product?.title
                          }
                        />

                        <div>

                          <h4>

                            {
                              item.product?.title
                            }

                          </h4>

                          <p>

                            Qty:
                            {item.quantity}

                          </p>

                          <p>

                            ₹
                            {item.price}

                          </p>

                        </div>

                      </div>

                    )
                  )
                }

              </div>


              {/* buttons */}
              <div className="order-buttons">

<button
  className="reorder-btn"

  onClick={() =>
    reorderItems(order)
  }
>

  Reorder

</button>



                {/* invoice */}
              <button
  className="invoice-btn"
  onClick={() =>
    downloadInvoice(order._id)
  }
>
  Download Invoice
</button>


                {/* cancel */}
                {
                  order.orderStatus ===
                  "Placed"

                  && (

                    <button
                      className="cancel-btn"

                      onClick={() =>
                        cancelOrder(
                          order._id
                        )
                      }
                    >

                      Cancel Order

                    </button>

                  )
                }


                {/* return */}
                {
                  order.orderStatus ===
                  "Delivered"

                  &&

                  !order.returnRequested

                  && (

                    <button
                      className="return-btn"

                      onClick={() =>
                        requestReturn(
                          order._id
                        )
                      }
                    >

                      Request Return

                    </button>

                  )
                }

{
  order.orderStatus ===
  "Delivered"

  &&

  !order.exchangeRequested

  && (

    <button
      className="return-btn"

      onClick={() =>
        requestExchange(
          order._id
        )
      }
    >

      Request Exchange

    </button>

  )
}

              </div>

            </div>

          ))
        )
      }

    </div>

  );

}

export default Orders;