import { useEffect, useState }
from "react";

import api from "../api/axios";
import "../styles/admin.css";
import {

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

  PieChart,

  Pie,

  Cell,

} from "recharts";

import toast from "react-hot-toast";

function AdminDashboard() {

  const [stats, setStats] =
    useState(null);
const [activity, setActivity] =
  useState(null);
  const [loading, setLoading] =
    useState(true);


  // fetch stats
  const getStats = async () => {

    try {

      const res = await api.get(
        "/admin/stats"
      );

      setStats(
        res.data.stats
      );
const activityRes =
  await api.get(
    "/admin/recent-activity"
  );

setActivity({

  latestUsers:
    activityRes.data.latestUsers,

  latestOrders:
    activityRes.data.latestOrders,

});
    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load dashboard"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getStats();

  }, []);


  // download report
  const downloadReport = async () => {

    try {

      const res = await api.get(

        "/admin/sales-report",

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

        "sales-report.pdf"
      );

      document.body.appendChild(
        link
      );

      link.click();

      toast.success(
        "Report downloaded"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Download failed"
      );

    }

  };


 if (loading) {

  return <h2>Loading...</h2>;

}

if (!stats) {
  return <h2>No stats received</h2>;
}

  // chart data
  const chartData = [

  {
    name: "Users",
    value: stats.totalUsers,
  },

  {
    name: "Artisans",
    value: stats.totalArtisans,
  },

  {
    name: "Products",
    value: stats.totalProducts,
  },

  {
    name: "Orders",
    value: stats.totalOrders,
  },

];

  // pie chart data
  const revenueData = [

    {
      name: "Revenue",

      value:
        stats.totalRevenue,
    },

    {
      name: "Remaining",

      value:
        Math.max(
          100000 -
          stats.totalRevenue,
          0
        ),
    },

  ];


  return (

    <div className="admin-page">

      <h1>
        Admin Dashboard
      </h1>


      {/* stats cards */}
      <div className="admin-grid">
<div
  className="admin-card"
  onClick={() =>
    window.location.href =
    "/admin/artisans"
  }
>

  <h2>
    Artisans
  </h2>

  <p>
    View Seller Details
  </p>

</div>
        {/* users */}
        <div className="admin-card">

          <h2>
            Users
          </h2>

          <p>
            {
              stats.totalUsers
            }
          </p>

        </div>

<div className="admin-card">

  <h2>
    Artisans
  </h2>

  <p>
    {stats.totalArtisans}
  </p>

</div>


        {/* products */}
        <div className="admin-card">

          <h2>
            Products
          </h2>

          <p>
            {
              stats.totalProducts
            }
          </p>

        </div>


        {/* orders */}
        <div className="admin-card">

          <h2>
            Orders
          </h2>

          <p>
            {
              stats.totalOrders
            }
          </p>

        </div>

<div className="admin-card">

  <h2>
    Delivered
  </h2>

  <p>
    {stats.deliveredOrders}
  </p>

</div>

<div className="admin-card">

  <h2>
    Pending
  </h2>

  <p>
    {stats.pendingOrders}
  </p>

</div>

        {/* revenue */}
        <div className="admin-card">

          <h2>
            Revenue
          </h2>

          <p>

            ₹
            {
              stats.totalRevenue
            }

          </p>

        </div>

      </div>

<div className="admin-grid">

  <div
    className="admin-card"
    onClick={() =>
      window.location.href =
      "/admin/products"
    }
  >
    <h2>Manage Products</h2>
    <p>View / Edit / Delete</p>
  </div>

  <div
    className="admin-card"
    onClick={() =>
      window.location.href =
      "/admin/orders"
    }
  >
    <h2>Manage Orders</h2>
    <p>Track & Update</p>
  </div>

  <div
    className="admin-card"
    onClick={() =>
      window.location.href =
      "/admin/users"
    }
  >
    <h2>Manage Users</h2>
    <p>View & Delete</p>
  </div>

</div>

      {/* charts */}
      <div className="charts-container">

        {/* bar chart */}
        <div className="chart-box">

          <h2>
            Marketplace Overview
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={chartData}
            >

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


        {/* pie chart */}
        <div className="chart-box">

          <h2>
            Revenue Progress
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={revenueData}

                dataKey="value"

                outerRadius={100}

                label
              >

                <Cell />

                <Cell />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* report button */}
      <button
        className="report-btn"

        onClick={downloadReport}
      >

        Download Sales Report

      </button>
{/* recent activity */}
{
  activity && (

    <div className="activity-container">

      {/* recent users */}
      <div className="activity-box">

        <h2>
          Recent Users
        </h2>

        {
          activity.latestUsers.map(
            (user) => (

              <div
                key={user._id}

                className="activity-item"
              >

                <p>
                  {user.name}
                </p>

                <span>
                  {user.email}
                </span>

              </div>

            )
          )
        }

      </div>


      {/* recent orders */}
      <div className="activity-box">

        <h2>
          Recent Orders
        </h2>

        {
          activity.latestOrders.map(
            (order) => (

              <div
                key={order._id}

                className="activity-item"
              >

                <p>

                  {
                    order.user?.name
                  }

                </p>

                <span>

                  ₹
                  {
                    order.totalPrice
                  }

                </span>

              </div>

            )
          )
        }

      </div>

    </div>

  )
}
    </div>

  );

}

export default AdminDashboard;