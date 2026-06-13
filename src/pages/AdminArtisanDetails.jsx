import { useEffect, useState }
from "react";

import { useParams }
from "react-router-dom";

import api from "../api/axios";

function AdminArtisanDetails() {

  const { id } =
    useParams();

  const [data,
    setData] =
    useState(null);

  useEffect(() => {

    const getDetails =
      async () => {

        const res =
          await api.get(
            `/admin/artisans/${id}`
          );

        setData(res.data);

      };

    getDetails();

  }, [id]);

  if (!data)
    return <h2>Loading...</h2>;

  return (

    <div className="admin-page">

      <h1>
        {data.artisan.name}
      </h1>

      <p>
        {data.artisan.email}
      </p>

      <h3>
        Products:
        {data.totalProducts}
      </h3>

      <h3>
        Sold:
        {data.totalSold}
      </h3>

      <h3>
        Revenue:
        ₹{data.totalRevenue}
      </h3>

      <hr />

      {
        data.products.map(
          (product) => (

            <div
              key={product._id}
              className="admin-card"
            >

              <img
                src={
                  product.image
                }
                alt={
                  product.title
                }
                width="80"
              />

              <h3>
                {product.title}
              </h3>

              <p>
                Price:
                ₹{product.price}
              </p>

              <p>
                Stock:
                {product.stock}
              </p>

              <p>
                Sold:
                {
                  product.totalSold || 0
                }
              </p>

            </div>

          )
        )
      }

    </div>

  );

}

export default AdminArtisanDetails;