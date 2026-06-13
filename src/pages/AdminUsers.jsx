import { useEffect, useState }
from "react";

import api from "../api/axios";

import toast from "react-hot-toast";
import "../styles/admin.css";
function AdminUsers() {

  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

const [currentPage, setCurrentPage] =
  useState(1);

const usersPerPage = 6;

  const [loading, setLoading] =
    useState(true);


  // fetch users
  const getUsers = async () => {

    try {

      const res = await api.get(
        "/admin/users"
      );

      setUsers(
        res.data.users
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load users"
      );

    } finally {

      setLoading(false);

    }

  };


  // delete user
  const deleteUser = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this user?"
      );

    if (!confirmDelete) {

      return;

    }

    try {

      const res =
        await api.delete(
          `/admin/users/${id}`
        );

      toast.success(
        res.data.message
      );

      getUsers();

    } catch (error) {

      console.log(error);

      toast.error(
        "Delete failed"
      );

    }

  };


  useEffect(() => {

    getUsers();

  }, []);


  // search filter
  const filteredUsers =
    users.filter((user) =>

      user.name
        ?.toLowerCase()

        .includes(
          search.toLowerCase()
        )

      ||

      user.email
        ?.toLowerCase()

        .includes(
          search.toLowerCase()
        )

    );

const lastIndex =
  currentPage * usersPerPage;

const firstIndex =
  lastIndex - usersPerPage;

const currentUsers =
  filteredUsers.slice(
    firstIndex,
    lastIndex
  );

const totalPages =
  Math.ceil(

    filteredUsers.length /
    usersPerPage

  );
  if (loading) {

    return <h2>Loading...</h2>;

  }


  return (

    <div className="admin-page">

      <h1>
        Manage Users
      </h1>


      {/* search */}
      <input
        type="text"

        placeholder="Search users..."

        value={search}

        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }

        className="admin-search"
      />


      {/* users */}
      <div className="admin-grid">

        {
          filteredUsers.length === 0 ? (

            <h2>
              No users found
            </h2>

          ) : (

            currentUsers.map((user) => (

              <div
                key={user._id}

                className="admin-card"
              >

                <h3>
                  {user.name}
                </h3>

                <p>
                  {user.email}
                </p>

                <p>

                  Role:
                  {user.role}

                </p>

                <button
                  className="delete-btn"

                  onClick={() =>
                    deleteUser(
                      user._id
                    )
                  }
                >

                  Delete User

                </button>

              </div>

            ))

          )
        }

      </div>
<div className="pagination">

  <button
    disabled={currentPage === 1}

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
      currentPage === totalPages
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
    </div>

  );

}

export default AdminUsers;