import { useEffect, useState }
from "react";

import api from "../api/axios";

import toast from "react-hot-toast";
import "../styles/admin.css";
function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const ordersPerPage = 5;


  // fetch orders
  const getOrders = async () => {

    try {

      const res = await api.get(
        "/admin/orders"
      );

      setOrders(
        res.data.orders
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load orders"
      );

    } finally {

      setLoading(false);

    }

  };


  // update status
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      const res = await api.put(

        `/admin/orders/${id}`,

        { status }

      );

      toast.success(
        res.data.message
      );

      getOrders();

    } catch (error) {

      console.log(error);

      toast.error(
        "Update failed"
      );

    }

  };


  useEffect(() => {

    getOrders();

  }, []);


  // search filter
  const filteredOrders =
    orders.filter((order) =>

      order.user?.name
        ?.toLowerCase()

        .includes(
          search.toLowerCase()
        )

      ||

      order.user?.email
        ?.toLowerCase()

        .includes(
          search.toLowerCase()
        )

    );


  // pagination
  const lastIndex =
    currentPage *
    ordersPerPage;

  const firstIndex =
    lastIndex -
    ordersPerPage;

  const currentOrders =
    filteredOrders.slice(
      firstIndex,
      lastIndex
    );

  const totalPages =
    Math.ceil(

      filteredOrders.length /
      ordersPerPage

    );


  if (loading) {

    return <h2>Loading...</h2>;

  }


  return (

    <div className="admin-page">

      <h1>
        Manage Orders
      </h1>


      {/* search */}
      <input
        type="text"

        placeholder="Search orders..."

        value={search}

        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }

        className="admin-search"
      />


      {/* orders */}
      {
        currentOrders.length === 0 ? (

          <h2>
            No orders found
          </h2>

        ) : (

          currentOrders.map((order) => (

            <div
              key={order._id}

              className="order-card"
            >

              {/* user */}
              <h3>
                {
                  order.user?.name
                }
              </h3>

              <p>
                {
                  order.user?.email
                }
              </p>


              {/* total */}
              <p>
                ₹ {order.totalPrice}
              </p>


              {/* status */}
              <p>

                Current:
                {order.orderStatus}

              </p>


              {/* products */}
              {
                order.orderItems.map(
                  (item) => (

                    <p key={item._id}>

                      {
                        item.product?.title
                      }

                      {" "}x{" "}

                      {item.quantity}

                    </p>

                  )
                )
              }


              {/* dropdown */}
              <select
                value={
                  order.orderStatus
                }

                onChange={(e) =>
                  updateStatus(

                    order._id,

                    e.target.value

                  )
                }
              >

              <option value="Placed">Placed</option>

<option value="Shipped">Shipped</option>

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

          ))

        )
      }


      {/* pagination */}
      {
        totalPages > 1 && (

          <div className="pagination">

            <button
              disabled={
                currentPage === 1
              }

              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
            >

              Prev

            </button>


            <span>

              Page {currentPage}
              of {totalPages}

            </span>


            <button
              disabled={
                currentPage ===
                totalPages
              }

              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
            >

              Next

            </button>

          </div>

        )
      }

    </div>

  );

}

export default AdminOrders;