import { useEffect, useState }
from "react";
import { Link }
from "react-router-dom";
import api from "../api/axios";
import "../styles/admin.css";
import toast from "react-hot-toast";

function AdminProducts() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const productsPerPage = 6;
useEffect(() => {

  setCurrentPage(1);

}, [search]);

  // fetch products
  const getProducts = async () => {

    try {

      const res = await api.get(
        "/admin/products"
      );

      setProducts(
        res.data.products
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load products"
      );

    } finally {

      setLoading(false);

    }

  };


  // search filter
  const filteredProducts =
    products.filter((product) =>

    product.title
  ?.toLowerCase()
  .includes(
    search
      .trim()
      .toLowerCase()
  )

    );


  // pagination
  const lastIndex =
    currentPage *
    productsPerPage;

  const firstIndex =
    lastIndex -
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      firstIndex,
      lastIndex
    );

  const totalPages =
    Math.ceil(

      filteredProducts.length /
      productsPerPage

    );


  // delete product
  const deleteProduct = async (id) => {

    const confirmDelete =
      window.confirm(

        "Delete this product?"
      );

    if (!confirmDelete) {

      return;

    }

    try {

      const res =
        await api.delete(

          `/admin/products/${id}`

        );

      toast.success(
        res.data.message
      );

      getProducts();

    } catch (error) {

      console.log(error);

      toast.error(
        "Delete failed"
      );

    }

  };


  useEffect(() => {

    getProducts();

  }, []);


  if (loading) {

    return <h2>Loading...</h2>;

  }


  return (

    <div className="admin-page">

      <h1>
        Manage Products
      </h1>


      {/* search */}
      <input
        type="text"

        placeholder="Search products..."

        value={search}

        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }

        className="admin-search"
      />


      {/* products */}
      <div className="products-grid">

        {
          currentProducts.length === 0 ? (

            <h2>
              No products found
            </h2>

          ) : (

            currentProducts.map(
              (product) => (

               <div
  key={product._id}
  className="product-card"
>

  <img
    src={
      product.images?.[0] ||
      product.image ||
      "/placeholder.png"
    }
    alt={product.title}
  />

  <div className="product-card-body">

    <h3>{product.title}</h3>

    <p className="product-price">
      ₹ {product.price}
    </p>

    <p className="product-detail">
      Stock: {product.stock}
    </p>

    <p className="product-detail">
      {product.category}
    </p>

    <p className="product-detail">
      Artisan:
      {product.artisan?.name}
    </p>

    <div className="product-actions">

      <button
        className="delete-btn"
        onClick={() =>
          deleteProduct(product._id)
        }
      >
        Delete
      </button>

      <Link
        to={`/admin/products/edit/${product._id}`}
      >
        <button
          className="edit-btn"
        >
          Edit
        </button>
      </Link>

    </div>

  </div>

</div>

              )
            )

          )
        }

      </div>


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

export default AdminProducts;