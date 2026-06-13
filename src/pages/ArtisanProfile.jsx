import { useAuth } from "../store/authStore";
import "../styles/artisanProfile.css";

function ArtisanProfile() {

  const { user } = useAuth();

  return (

    <div className="artisan-page">

      <div className="artisan-card">

        <div className="artisan-avatar">

          {user?.name?.charAt(0)}

        </div>

        <h1>{user?.name}</h1>

        <p>{user?.email}</p>

        <span className="artisan-role">
          Artisan
        </span>

      </div>

      <div className="artisan-stats">

        <div className="stat-box">
          <h3>Products</h3>
          <p>0</p>
        </div>

        <div className="stat-box">
          <h3>Orders</h3>
          <p>0</p>
        </div>

        <div className="stat-box">
          <h3>Status</h3>
          <p>Active</p>
        </div>

      </div>

    </div>

  );

}

export default ArtisanProfile;