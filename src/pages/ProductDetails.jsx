import {
  useEffect,
  useState,
  useRef,
}
from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import api from "../api/axios";
import "../styles/productDetails.css";
import toast from "react-hot-toast";

import { useCart }
from "../store/cartStore";

function ProductDetails() {

  const { id } = useParams();

  const reviewFormRef =
    useRef(null);

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [quantity, setQuantity] =
    useState(1);

  const [wishlistAdded,
    setWishlistAdded] =
    useState(false);

  const [cartAdded,
    setCartAdded] =
    useState(false);

  const [recentProducts,
    setRecentProducts] =
    useState([]);

  const [rating, setRating] =
    useState(0);

  const [comment, setComment] =
    useState("");

  const [relatedProducts,
    setRelatedProducts] =
    useState([]);

  const [mainImage,
    setMainImage] =
    useState("");

  const [currentIndex,
    setCurrentIndex] =
    useState(0);

  const [fade,
    setFade] =
    useState(false);

  const [imageLoading,
    setImageLoading] =
    useState(true);

  const [fullscreen,
    setFullscreen] =
    useState(false);

  const [touchStart,
    setTouchStart] =
    useState(0);

  const [touchEnd,
    setTouchEnd] =
    useState(0);

  const [zoomed,
    setZoomed] =
    useState(false);

  const [editingReview,
    setEditingReview] =
    useState(false);

  const [reviewFilter,
    setReviewFilter] =
    useState("All");

  const [reviewSearch,
    setReviewSearch] =
    useState("");

  const [currentReviewPage,
    setCurrentReviewPage] =
    useState(1);

  const reviewsPerPage = 3;

  const {
    cartCount,
    setCartCount,
  } = useCart();
const [reviewSort,
  setReviewSort] =
  useState("helpful");


  // fetch product
  const getProduct = async () => {

    try {

      const res = await api.get(
        `/products/${id}`
      );

      setProduct(
        res.data.product
      );
      setMainImage(
        res.data.product.images?.[0]
        || res.data.product.image
      );



      // recently viewed
    

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

const checkWishlist = async () => {

  try {

    const res =
      await api.get("/wishlist");

    const exists =
      res.data.wishlist.some(

        (item) =>

          item.product?._id === id ||

          item._id === id

      );

    setWishlistAdded(exists);

  } catch (error) {

    console.log(error);

  }

};
  // next image
  const nextImage = () => {

    if (
      !product.images ||
      product.images.length === 0
    ) {

      return;

    }

    setImageLoading(true);

    setZoomed(false);

    setFade(true);

    setTimeout(() => {

      const newIndex =

        currentIndex ===
        product.images.length - 1

        ? 0

        : currentIndex + 1;

      setCurrentIndex(newIndex);

      setMainImage(
        product.images[newIndex]
      );

      setFade(false);

    }, 200);

  };


  // previous image
  const prevImage = () => {

    if (
      !product.images ||
      product.images.length === 0
    ) {

      return;

    }

    setImageLoading(true);

    setZoomed(false);

    setFade(true);

    setTimeout(() => {

      const newIndex =

        currentIndex === 0

        ? product.images.length - 1

        : currentIndex - 1;

      setCurrentIndex(newIndex);

      setMainImage(
        product.images[newIndex]
      );

      setFade(false);

    }, 200);

  };


  // auto slider
  useEffect(() => {

    if (
      !product?.images ||
      product.images.length === 0
    ) {

      return;

    }

    const interval =
      setInterval(() => {

        setCurrentIndex((prev) => {

          const nextIndex =

            prev ===
            product.images.length - 1

            ? 0

            : prev + 1;

          setMainImage(
            product.images[nextIndex]
          );

          return nextIndex;

        });

      }, 3000);

    return () =>
      clearInterval(interval);

  }, [product]);


  // keyboard controls
  useEffect(() => {

    const handleKeyDown =
      (e) => {

        if (
          e.key ===
          "ArrowRight"
        ) {

          nextImage();

        }

        if (
          e.key ===
          "ArrowLeft"
        ) {

          prevImage();

        }

        if (
          e.key === "Escape"
        ) {

          setFullscreen(false);

        }

      };

    window.addEventListener(

      "keydown",

      handleKeyDown

    );

    return () => {

      window.removeEventListener(

        "keydown",

        handleKeyDown

      );

    };

  }, [

    currentIndex,

    product,

  ]);


  // swipe
  const handleTouchStart =
    (e) => {

      setTouchStart(
        e.targetTouches[0]
        .clientX
      );

    };

  const handleTouchMove =
    (e) => {

      setTouchEnd(
        e.targetTouches[0]
        .clientX
      );

    };

  const handleTouchEnd =
    () => {

      if (
        touchStart -
        touchEnd > 50
      ) {

        nextImage();

      }

      if (
        touchStart -
        touchEnd < -50
      ) {

        prevImage();

      }

    };


  // add cart
  const addToCart = async () => {

    try {

      await api.post("/cart/add", {

        productId:
          product._id,

        quantity,

      });

      setCartAdded(true);
await getCartCount();

      toast.success(
        "Added to cart"
      );

    } catch (error) {

      toast.error(
        "Cart failed"
      );

    }

  };


  // wishlist
  const addToWishlist = async () => {

    try {

      if (wishlistAdded) {

        await api.delete(
          `/wishlist/remove/${product._id}`
        );

        setWishlistAdded(false);

        toast.success(
          "Removed from wishlist"
        );

        return;

      }

     const res = await api.post(
  `/wishlist/add/${product._id}`
);

console.log("Wishlist Response:", res.data);

const check = await api.get("/wishlist");

console.log("Current Wishlist:", check.data);

      setWishlistAdded(true);

      toast.success(
        res.data.message
      );

    } catch (error) {

      toast.error(
        "Wishlist failed"
      );

    }

  };


  // like product
 

     
  // like review
  const likeReview =
    async (reviewId) => {

      try {

        const res =
          await api.put(

            `/reviews/like/${product._id}/${reviewId}`

          );

        toast.success(
          res.data.message
        );

        getProduct();

      } catch (error) {

        toast.error(
          "Like failed"
        );

      }

    };


  // delete review
  const deleteReview =
    async () => {

      try {

        const res =
          await api.delete(

            `/reviews/delete/${product._id}`

          );

        toast.success(
          res.data.message
        );

        getProduct();

      } catch (error) {

        toast.error(
          "Delete failed"
        );

      }

    };


  // update review
  const updateReview =
    async () => {

      try {

        const res =
          await api.put(

            `/reviews/update/${product._id}`,

            {
              rating,
              comment,
            }

          );

        toast.success(
          res.data.message
        );

        setEditingReview(false);

        setComment("");

        setRating(0);

        getProduct();

      } catch (error) {

        toast.error(
          "Update failed"
        );

      }

    };


  // submit review
  const submitReview = async () => {

    try {

      const res = await api.post(
        "/reviews/add",
        {

          productId:
            product._id,

          rating,

          comment,

        }
      );

      toast.success(
        res.data.message
      );

      setComment("");

      setRating(0);

      getProduct();

    } catch (error) {

  console.log(
    error.response?.data
  );

  toast.error(
    error.response?.data?.message ||
    "Review failed"
  );

}

  };

const getCartCount = async () => {

  try {

    const res =
      await api.get("/cart");

    setCartCount(

      res.data.cartItems.length

    );

  } catch (error) {

    console.log(error);

  }

};
  // share
  const shareProduct = async () => {

    try {

      await navigator.share({

        title: product.title,

        text: product.description,

        url: window.location.href,

      });

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    getProduct();
checkWishlist();

  }, [id]);


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

  // already reviewed
  const alreadyReviewed =

    product.reviews?.find(

      (review) =>

        review.user?._id ===
        JSON.parse(
          localStorage.getItem("user")
        )?._id

    );


  // filtered reviews
  const filteredReviews =

    [...product.reviews]

    .filter((review) =>

      (
        reviewFilter === "All"

        ||

        review.rating ===
        Number(reviewFilter)
      )

      &&

      review.comment
      .toLowerCase()

      .includes(
        reviewSearch
        .toLowerCase()
      )

    )

    .sort((a, b) => {

  if (
    reviewSort === "high"
  ) {

    return b.rating - a.rating;

  }

  if (
    reviewSort === "low"
  ) {

    return a.rating - b.rating;

  }

  if (
    reviewSort === "new"
  ) {

    return (
      new Date(b.createdAt)

      -

      new Date(a.createdAt)
    );

  }

  // helpful
  return (

    (b.likes?.length || 0)

    -

    (a.likes?.length || 0)

  );

});

  // pagination
  const lastReviewIndex =

    currentReviewPage *
    reviewsPerPage;

  const firstReviewIndex =

    lastReviewIndex -
    reviewsPerPage;

  const currentReviews =

    filteredReviews.slice(

      firstReviewIndex,

      lastReviewIndex

    );

  const totalReviewPages =

    Math.ceil(

      filteredReviews.length /

      reviewsPerPage

    );

// review statistics
const fiveStar =

  product.reviews.filter(
    (r) => r.rating === 5
  ).length;

const fourStar =

  product.reviews.filter(
    (r) => r.rating === 4
  ).length;

const threeStar =

  product.reviews.filter(
    (r) => r.rating === 3
  ).length;

const twoStar =

  product.reviews.filter(
    (r) => r.rating === 2
  ).length;

const oneStar =

  product.reviews.filter(
    (r) => r.rating === 1
  ).length;

  return (

    <>
      <div className="details-page">

        {/* image */}
        <div className="image-gallery">

          <div
            className="details-image"

            onTouchStart={
              handleTouchStart
            }

            onTouchMove={
              handleTouchMove
            }

            onTouchEnd={
              handleTouchEnd
            }
          >

            <button
              className="slider-btn left-btn"

              onClick={prevImage}
            >

              ❮

            </button>

            <div className="zoom-container">

              {
                imageLoading && (

                  <div className="image-skeleton">

                  </div>

                )
              }

              <img
                src={mainImage}

                alt={product.title}

                onLoad={() =>
                  setImageLoading(false)
                }

                onClick={() =>
                  setFullscreen(true)
                }

                onDoubleClick={() =>
                  setZoomed(!zoomed)
                }

                className={

                  zoomed

                  ? "zoom-image deep-zoom"

                  : fade

                  ? "zoom-image fade-image"

                  : "zoom-image"

                }
              />

            </div>

            <button
              className="slider-btn right-btn"

              onClick={nextImage}
            >

              ❯

            </button>

          </div>


          {/* thumbnails */}
          <div className="thumbnail-container">

            {
              product.images?.map(
                (img, index) => (

                  <img
                    key={index}

                    src={img}

                    alt="thumbnail"

                    className={
                      mainImage === img
                      ? "active-thumb"
                      : ""
                    }

                    onClick={() => {

                      setImageLoading(true);

                      setCurrentIndex(
                        index
                      );

                      setZoomed(false);

                      setMainImage(img);

                    }}
                  />

                )
              )
            }

          </div>

        </div>


        {/* content */}
        <div className="details-content">

          <h1>
            {product.title}
          </h1>

          <p>
            {product.description}
          </p>

          <h2>
            ₹ {product.price}
          </h2>

          <p>
            Category:
            {product.category}
          </p>

          <p className="rating">

            ⭐
            {
              product.rating
              ?.toFixed(1)
            }

          </p>

          <p className="views">

            👀
            {product.views || 0}
            views

          </p>


          {/* quantity */}
          <div className="quantity-box">
<button
  onClick={() => {

    if (quantity > 1) {

      setQuantity(quantity - 1);

      setCartAdded(false);

    }

  }}
>
              -
            </button>

            <span>
              {quantity}
            </span>
<button
  onClick={() => {

    setQuantity(quantity + 1);

    setCartAdded(false);

  }}
>
              +
            </button>

          </div>


          <button
            onClick={addToCart}
          >

            {
              cartAdded

              ? "Added To Cart"

              : "Add To Cart"
            }

          </button>


          <button
            className="wishlist-btn"

            onClick={addToWishlist}
          >

           {
  wishlistAdded
  ? "❤️ added to wishlist"
  : "🤍 wishlist"
}

          </button>


          <button
            className="share-btn"

            onClick={shareProduct}
          >

            Share Product

          </button>

        </div>

      </div>

      {/* review form */}
      <div className="add-review-wrapper">

        {
          alreadyReviewed
          && !editingReview ? (

            <div className="already-reviewed">

              ✅ You already reviewed
              this product

            </div>

          ) : (

            <div
              className="add-review-section"

              ref={reviewFormRef}
            >

              <h2>

                {
                  editingReview

                  ? "Edit Your Review"

                  : "Write A Review"
                }

              </h2>

              <select
                value={rating}

                onChange={(e) =>
                  setRating(
                    Number(
                      e.target.value
                    )
                  )
                }
              >

                <option value={0}>
                  Select Rating
                </option>

                <option value={1}>
                  1 Star
                </option>

                <option value={2}>
                  2 Stars
                </option>

                <option value={3}>
                  3 Stars
                </option>

                <option value={4}>
                  4 Stars
                </option>

                <option value={5}>
                  5 Stars
                </option>

              </select>


              <textarea
                placeholder="Write review..."

                value={comment}

                onChange={(e) =>
                  setComment(
                    e.target.value
                  )
                }
              >

              </textarea>

<div className="review-form-actions">

  <button
    className="update-review-btn"

    onClick={

      editingReview

      ? updateReview

      : submitReview

    }
  >

    {
      editingReview

      ? "Update Review"

      : "Submit Review"
    }

  </button>

  {
    editingReview && (

      <button
        className="cancel-edit-btn"

        onClick={() => {

          setEditingReview(false);

          setRating(0);

          setComment("");

        }}
      >

        Cancel Edit

      </button>

    )
  }

</div>

            </div>

          )
        }

      </div>
{/* review statistics */}
<div className="review-stats">

  <h2>
    Review Summary
  </h2>

  <div className="stats-grid">

    <div className="stats-card">

      <h3>
        ⭐
        {
          product.rating?.toFixed(1)
        }
      </h3>

      <p>
        Average Rating
      </p>

    </div>


    <div className="stats-card">

      <h3>
        {
          product.numReviews
        }
      </h3>

      <p>
        Total Reviews
      </p>

    </div>

  </div>

<div className="rating-breakdown">

  {/* 5 */}
  <div className="rating-row">

    <span>
      5 ⭐
    </span>

    <div className="progress-bar">

      <div
        className="progress-fill"

        style={{

          width: `${
            product.numReviews

            ? (fiveStar /
              product.numReviews) * 100

            : 0
          }%`,
        }}
      >

      </div>

    </div>

    <span>
      {fiveStar}
    </span>

  </div>


  {/* 4 */}
  <div className="rating-row">

    <span>
      4 ⭐
    </span>

    <div className="progress-bar">

      <div
        className="progress-fill"

        style={{

          width: `${
            product.numReviews

            ? (fourStar /
              product.numReviews) * 100

            : 0
          }%`,
        }}
      >

      </div>

    </div>

    <span>
      {fourStar}
    </span>

  </div>


  {/* 3 */}
  <div className="rating-row">

    <span>
      3 ⭐
    </span>

    <div className="progress-bar">

      <div
        className="progress-fill"

        style={{

          width: `${
            product.numReviews

            ? (threeStar /
              product.numReviews) * 100

            : 0
          }%`,
        }}
      >

      </div>

    </div>

    <span>
      {threeStar}
    </span>

  </div>


  {/* 2 */}
  <div className="rating-row">

    <span>
      2 ⭐
    </span>

    <div className="progress-bar">

      <div
        className="progress-fill"

        style={{

          width: `${
            product.numReviews

            ? (twoStar /
              product.numReviews) * 100

            : 0
          }%`,
        }}
      >

      </div>

    </div>

    <span>
      {twoStar}
    </span>

  </div>


  {/* 1 */}
  <div className="rating-row">

    <span>
      1 ⭐
    </span>

    <div className="progress-bar">

      <div
        className="progress-fill"

        style={{

          width: `${
            product.numReviews

            ? (oneStar /
              product.numReviews) * 100

            : 0
          }%`,
        }}
      >

      </div>

    </div>

    <span>
      {oneStar}
    </span>

  </div>

</div>
</div>

      {/* reviews */}
      <div className="reviews-section">

        <h2>
          Customer Reviews
        </h2>


        <div className="review-filter">

          <select
            value={reviewFilter}

            onChange={(e) =>
              setReviewFilter(
                e.target.value
              )
            }
          >

            <option value="All">
              All Reviews
            </option>

            <option value="5">
              5 Stars
            </option>

            <option value="4">
              4 Stars
            </option>

            <option value="3">
              3 Stars
            </option>

            <option value="2">
              2 Stars
            </option>

            <option value="1">
              1 Star
            </option>

          </select>


          <input
            type="text"

            placeholder="Search reviews..."

            value={reviewSearch}

            onChange={(e) =>
              setReviewSearch(
                e.target.value
              )
            }

            className="review-search"
          />

<select
  value={reviewSort}

  onChange={(e) =>
    setReviewSort(
      e.target.value
    )
  }
>

  <option value="helpful">
    Most Helpful
  </option>

  <option value="high">
    Highest Rating
  </option>

  <option value="low">
    Lowest Rating
  </option>

  <option value="new">
    Newest First
  </option>

</select>

        </div>


        {
          currentReviews.length === 0
          ? (

            <p>
              No reviews found
            </p>

          ) : (

            currentReviews.map(
              (review) => (

                <div
                  key={review._id}

                  className="review-card"
                >

                  <h3>

                    {
                      review.user?.name
                      || "User"
                    }

                  </h3>

                  <p className="review-rating">

                    {"⭐".repeat(
                      review.rating
                    )}

                  </p>

                  <p>
                    {review.comment}
                  </p>


                  <span className="review-date">

                    {
                      new Date(
                        review.createdAt
                      ).toLocaleDateString()
                    }

                    {" • "}

                    {
                      new Date(
                        review.createdAt
                      ).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    }

                  </span>


                  <button
                    className="review-like-btn"

                    onClick={() =>
                      likeReview(
                        review._id
                      )
                    }
                  >

                    👍 Helpful

                    (
                    {
                      review.likes?.length || 0
                    }
                    )

                  </button>


                  {
                    review.user?._id ===

                    JSON.parse(
                      localStorage.getItem("user")
                    )?._id

                    && (

                      <div className="review-actions">

                        <button
                          className="delete-review-btn"

                          onClick={deleteReview}
                        >

                          Delete Review

                        </button>


                        <button
                          className="edit-review-btn"

                          onClick={() => {

                            setEditingReview(
                              true
                            );

                            setRating(
                              review.rating
                            );

                            setComment(
                              review.comment
                            );

                            reviewFormRef.current
                            ?.scrollIntoView({

                              behavior:
                                "smooth",

                              block:
                                "center",

                            });

                          }}
                        >

                          Edit Review

                        </button>

                      </div>

                    )
                  }

                </div>

              )
            )

          )
        }


        {/* pagination */}
        <div className="review-pagination">

          <button
            disabled={
              currentReviewPage === 1
            }

            onClick={() =>
              setCurrentReviewPage(

                currentReviewPage - 1

              )
            }
          >

            Prev

          </button>


          <span>

            Page
            {currentReviewPage}

            of

            {totalReviewPages || 1}

          </span>


          <button
            disabled={

              currentReviewPage ===
              totalReviewPages

              ||

              totalReviewPages === 0
            }

            onClick={() =>
              setCurrentReviewPage(

                currentReviewPage + 1

              )
            }
          >

            Next

          </button>

        </div>

      </div>


      {/* fullscreen */}
      {
        fullscreen && (

          <div
            className="fullscreen-overlay"

            onClick={() =>
              setFullscreen(false)
            }
          >

            <img
              src={mainImage}

              alt="fullscreen"

              className="fullscreen-image"
            />

          </div>

        )
      }

    </>

  );

}

export default ProductDetails;