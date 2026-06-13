import { useEffect, useState } from "react";
import "../styles/createProduct.css";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../api/axios";
import toast from "react-hot-toast";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [preview, setPreview] =
    useState("");

  const [formData, setFormData] =
    useState({
      title: "",
      price: "",
      category: "",
      description: "",
      images: [],
    });

  // fetch product
  const getProduct = async () => {

    try {

      const res = await api.get(
        `/products/${id}`
      );

      setFormData({
        title:
          res.data.product.title,

        price:
          res.data.product.price,

        category:
          res.data.product.category,

        description:
          res.data.product.description,

        images: [],
      });

      setPreview(
        res.data.product.image
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load product"
      );

    } finally {

      setLoading(false);

    }

  };

  // handle input
 const handleChange = (e) => {

  if (e.target.name === "images") {

    const files = Array.from(
      e.target.files
    );

    setFormData({
      ...formData,
      images: files,
    });

    if (files.length > 0) {

      setPreview(
        URL.createObjectURL(
          files[0]
        )
      );

    }

  } else {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  }

};


  // submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data =
        new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "description",
        formData.description
      );
if (formData.images?.length > 0) {

    formData.images.forEach(
  (image) => {

    data.append(
      "images",
      image
    );
  
  }
);
}
      const res = await api.put(
        `/admin/products/${id}`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        res.data.message
      );

      navigate(
        "/admin/products"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Update failed"
      );

    }

  };

  useEffect(() => {

    getProduct();

  }, []);

  if (loading) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="create-product-page">

      <form
        className="create-product-form"
        onSubmit={handleSubmit}
      >

        <h1>
          Edit Product
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={
            formData.description
          }
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleChange}
        />  

        {preview && (

          <div className="preview-grid">

            <img
              src={preview}
              alt="preview"
              className="preview-image"
            />

          </div>

        )}

        <button
          type="submit"
          className="create-product-btn"
        >

          Update Product

        </button>

      </form>

    </div>

  );

}

export default EditProduct;