import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import {
  useSearchParams
}
from "react-router-dom";
import api from "../api/axios";
import "../styles/products.css";
function Products() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
    
const [searchParams,
  setSearchParams] =

  useSearchParams();

  const [keyword,
  setKeyword] =
  useState(

    searchParams.get(
      "keyword"
    ) || ""
  );;

  const [category,
  setCategory] =
  useState(

    searchParams.get(
      "category"
    ) || ""
  );

  const [minPrice,
  setMinPrice] =
  useState(

    searchParams.get(
      "minPrice"
    ) || ""
  );

 const [maxPrice,
  setMaxPrice] =
  useState(

    searchParams.get(
      "maxPrice"
    ) || ""
  );
  const [sort, setSort] =
    useState("");

const [showTop,
  setShowTop] =
  useState(false);

  const [page, setPage] =
    useState(1);

  const [pages, setPages] =
    useState(1);

    const [filterLoading,
  setFilterLoading] =
  useState(false);

  // fetch products
const getProducts = async () => {

  setFilterLoading(true);

  try {

    let url = "/products?";


      // search
      if (keyword) {

        url +=
          `keyword=${keyword}&`;

      }


      // category
      if (category) {

        url +=
          `category=${category}&`;

      }


      // min price
      if (minPrice) {

        url +=
          `minPrice=${minPrice}&`;

      }


      // max price
      if (maxPrice) {

        url +=
          `maxPrice=${maxPrice}&`;

      }


      // sorting
      if (sort) {

        url +=
          `sort=${sort}&`;

      }


      // pagination
      url += `page=${page}`;


      const res =
        await api.get(url);

      setProducts(
        res.data.products
      );

console.log(
  res.data.products
);
      setPages(
        res.data.pages
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
      setFilterLoading(false);
    }

  };
useEffect(() => {

  const handleScroll =
    () => {

      if (
        window.scrollY > 400
      ) {

        setShowTop(true);

      } else {

        setShowTop(false);

      }

    };

  window.addEventListener(
    "scroll",
    handleScroll
  );

  return () =>

    window.removeEventListener(
      "scroll",
      handleScroll
    );

}, []);

  // fetch products
useEffect(() => {

  const loadProducts = async () => {

    await getProducts();

    setLoading(false);

  };

  loadProducts();

}, []);
useEffect(() => {

  if (!loading) {

    getProducts();

  }

}, [page]);
  // loading skeleton
  if (loading) {

    return (

      <div className="page-fade">

        <div className="products-page">

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

      </div>

    );

  }


  return (

    <div className="page-fade">

      <div className="products-page">

        <h1>
          All Products
        </h1>


        {/* filters */}
        <div className="filters">

          {/* search */}
        <input
  type="text"

  placeholder="Search products..."

  value={keyword}

  onChange={(e) => {

    setKeyword(
      e.target.value
    );

    setPage(1);

  }}

 onKeyDown={(e) => {

  if (e.key === "Enter") {

    getProducts();

  }

}}
/>


          {/* category */}
          <select
            value={category}

            onChange={(e) => {

              setCategory(
                e.target.value
              );

              setPage(1);

            }}
          >

            <option value="">
              All Categories
            </option>

            <option value="Bamboo Crafts">
              Bamboo Crafts
            </option>

            <option value="Handmade Jewelry">
              Handmade Jewelry
            </option>

            <option value="Pottery">
              Pottery
            </option>

            <option value="Handmade Bags">
              Handmade Bags
            </option>

          </select>


          {/* min price */}
          <input
            type="number"

            placeholder="Min Price"

            value={minPrice}

            onChange={(e) => {

              setMinPrice(
                e.target.value
              );

              setPage(1);

            }}
          />


          {/* max price */}
          <input
            type="number"

            placeholder="Max Price"

            value={maxPrice}

            onChange={(e) => {

              setMaxPrice(
                e.target.value
              );

              setPage(1);

            }}
          />


          {/* sort */}
          <select
            value={sort}

            onChange={(e) => {

              setSort(
                e.target.value
              );

              setPage(1);

            }}
          >

            <option value="">
              Sort Products
            </option>

            <option value="latest">
              Latest
            </option>

            <option value="lowToHigh">
              Price: Low to High
            </option>

            <option value="highToLow">
              Price: High to Low
            </option>

          </select>

         <button
  className="filter-btn"

  disabled={filterLoading}

  onClick={() => {

    setPage(1);
setSearchParams({

  keyword,

  category,

  minPrice,

  maxPrice,

  sort,

});
    getProducts();

  }}
>

  {
    filterLoading
    ? "Searching..."
    : "Apply Filters"
  }

</button>

<button
  className="clear-btn"

 onClick={() => {

  setKeyword("");
  setCategory("");
  setMinPrice("");
  setMaxPrice("");
  setSort("");
  setPage(1);

  setSearchParams({});

  setTimeout(() => {

    getProducts();

  }, 0);

}}
>

  Clear

</button>


        </div>

<p className="results-count">


  Showing
  {" "}

  {products.length}

  {" "}

  product(s)

</p>

<div className="active-filters">

  {
    keyword && (

      <span>

        Search:
        {" "}
        {keyword}

        <button
          onClick={() =>

            setKeyword("")
          }
        >

          ✕

        </button>

      </span>

    )
  }


  {
    category && (

      <span>

        Category:
        {" "}
        {category}

        <button
          onClick={() =>

            setCategory("")
          }
        >

          ✕

        </button>

      </span>

    )
  }


  {
    minPrice && (

      <span>

        Min:
        {" "}
        ₹{minPrice}

        <button
          onClick={() =>

            setMinPrice("")
          }
        >

          ✕

        </button>

      </span>

    )
  }


  {
    maxPrice && (

      <span>

        Max:
        {" "}
        ₹{maxPrice}

        <button
          onClick={() =>

            setMaxPrice("")
          }
        >

          ✕

        </button>

      </span>

    )
  }

</div>

        {/* products */}
       <div className="products-grid">

  {
    products.length === 0 ? (

      <div className="empty-products">

        <div className="empty-icon">
          🛍️
        </div>

        <h2>
          No Products Found
        </h2>

        <p>
          Try changing filters or search keyword ✨
        </p>

      </div>

    ) : (

      products.map((product) => (

        <Link
          key={product._id}
          to={`/products/${product._id}`}
          className="product-card"
        >

          <img
            src={
              product.images?.[0]?.url ||
              product.images?.[0] ||
              product.image ||
              "/placeholder.png"
            }
            alt={product.title}
          />

          <div className="product-info">

            <h3>
              {product.title}
            </h3>

            <p>
              {product.category}
            </p>

            <p className="price">
              ₹ {product.price}
            </p>

            <div className="product-actions">

              <button className="cart-btn">
                Add to Cart
              </button>

              <button className="wish-btn">
                ❤️
              </button>

            </div>

            {
              product.stock === 0 ? (

                <span className="stock out-stock">
                  Out of Stock
                </span>

              ) : product.stock < 5 ? (

                <span className="stock low-stock">
                  Only {product.stock} left
                </span>

              ) : (

                <span className="stock in-stock">
                  In Stock
                </span>

              )
            }

            <div className="rating-row">

              <span className="stars">
                ⭐
              </span>

              <span>
                {product.rating?.toFixed(1) || "0.0"}
              </span>

              <span className="review-count">
                ({product.numReviews || 0} reviews)
              </span>

            </div>

          </div>

        </Link>

      ))

    )
  }

</div>


        {/* pagination */}
        <div className="pagination">

          {
            [...Array(pages).keys()]
            .map((x) => (

              <button
                key={x + 1}

                onClick={() => {

  setPage(x + 1);

  window.scrollTo({

    top: 0,

    behavior: "smooth",

  });

}}

                className={
                  page === x + 1
                  ? "active-page"
                  : ""
                }
              >

                {x + 1}

              </button>

            ))
          }

        </div>

      </div>
{
  showTop && (

    <button
      className="top-btn"

      onClick={() =>

        window.scrollTo({

          top: 0,

          behavior: "smooth",

        })
      }
    >

      ↑

    </button>

  )
}
    </div>

  );

}

export default Products;