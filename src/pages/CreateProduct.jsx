import { useState }
from "react";

import { useNavigate }
from "react-router-dom";

import api from "../api/axios";
import "../styles/createProduct.css";
import toast from "react-hot-toast";

function CreateProduct() {

  const navigate = useNavigate();

  // multiple previews
  const [preview, setPreview] =
    useState([]);

  const [formData, setFormData] =
    useState({

      title: "",

      price: "",

      category: "",

      description: "",

      images: [],

      stock: "",

    });


  // handle input
  const handleChange = (e) => {

    // multiple images
    if (
      e.target.name === "images"
    ) {

      const files =
        Array.from(
          e.target.files
        );

      setFormData({

        ...formData,

        images: files,

      });

      // preview images
      const imagePreviews =
        files.map((file) =>

          URL.createObjectURL(file)

        );

      setPreview(
        imagePreviews
      );

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

      // text fields
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

      data.append(
        "stock",
        formData.stock
      );


      // multiple images
      formData.images.forEach(
        (image) => {

          data.append(
            "images",
            image
          );

        }
      );


      const res =
        await api.post(

          "/admin/products",

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
        "Create failed"
      );

    }

  };


  return (

<div className="create-product-page">
     <form
  className="create-product-form"

        onSubmit={handleSubmit}
      >

        <h1>
          Create Product
        </h1>


        {/* title */}
        <input
          type="text"

          name="title"

          placeholder="Product title"

          value={formData.title}

          onChange={handleChange}

          required
        />


        {/* price */}
        <input
          type="number"

          name="price"

          placeholder="Price"

          value={formData.price}

          onChange={handleChange}

          required
        />


        {/* category */}
        <input
          type="text"

          name="category"

          placeholder="Category"

          value={formData.category}

          onChange={handleChange}

          required
        />


        {/* description */}
        <textarea
          name="description"

          placeholder="Description"

          value={
            formData.description
          }

          onChange={handleChange}

          required
        />


        {/* stock */}
        <input
          type="number"

          name="stock"

          placeholder="Stock Quantity"

          value={formData.stock}

          onChange={handleChange}

          required
        />


        {/* multiple image upload */}
        <input
          type="file"

          name="images"

          accept="image/*"

          multiple

          onChange={handleChange}

          required
        />


        {/* image previews */}
        <div className="preview-grid">

          {
            preview.map(
              (img, index) => (

                <img
                  key={index}

                  src={img}

                  alt="preview"

                  className="preview-image"
                />

              )
            )
          }

        </div>


        {/* submit */}
<button
  type="submit"
  className="create-product-btn"
>
          Create Product

        </button>

      </form>

    </div>

  );

}

export default CreateProduct;