import { useEffect, useState }
from "react";

import api from "../api/axios";

import { Link }
from "react-router-dom";

function AdminArtisans() {

  const [artisans,
    setArtisans] =
    useState([]);

  useEffect(() => {

    const getArtisans =
      async () => {

        const res =
          await api.get(
            "/admin/artisans"
          );

        setArtisans(
          res.data.artisans
        );

      };

    getArtisans();

  }, []);

  return (

    <div className="admin-page">

      <h1>
        All Artisans
      </h1>

      {
        artisans.map(
          (artisan) => (

            <div
              key={artisan._id}
              className="admin-card"
            >

              <h3>
                {artisan.name}
              </h3>

              <p>
                {artisan.email}
              </p>


            </div>

          )
        )
      }

    </div>

  );

}

export default AdminArtisans;