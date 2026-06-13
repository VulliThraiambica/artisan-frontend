import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            ✨ Authentic Handmade Collection
          </span>

          <h1>
            Handcrafted With Tradition,
            <br />
            Designed For Modern Living
          </h1>

          <p>
            Discover unique handmade creations crafted by talented artisans
            across India. Every purchase supports local talent and preserves
            traditional craftsmanship.
          </p>

          <div className="hero-buttons">

            <Link to="/products">
              <button className="primary-btn">
                Explore Collection
              </button>
            </Link>

            <Link to="/register">
              <button className="secondary-btn">
                Become an Artisan
              </button>
            </Link>

          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://www.shutterstock.com/image-photo/collection-various-handcrafted-woven-goods-600nw-2703314975.jpg"
            alt="Handmade Crafts"
          />

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="categories">

        <h2>Browse Categories</h2>

        <div className="category-grid">

          <div className="category-card">

            <img
              src="https://images.unsplash.com/photo-1511497584788-876760111969?w=500"
              alt="Bamboo Crafts"
            />

            <h3>Bamboo Crafts</h3>

          </div>

          <div className="category-card">

            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500"
              alt="Jewelry"
            />

            <h3>Handmade Jewelry</h3>

          </div>

          <div className="category-card">

            <img
              src="https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=500"
              alt="Pottery"
            />

            <h3>Pottery</h3>

          </div>

          <div className="category-card">

            <img
              src="https://brownliving.in/cdn/shop/files/brown-orchid-crochet-sling-bag-handmade-shoulder-bag-am-mac-orchidbrown-artistic-mess-5422005.jpg?v=1769545569"
              alt="Bags"
            />

            <h3>Handmade Bags</h3>

          </div>

        </div>

      </section>

      {/* WHY CHOOSE US */}
      <section className="features">

        <h2>Why Choose Us</h2>

        <div className="feature-grid">

          <div className="feature-card">

            <span>🌟</span>

            <h3>Authentic Handmade</h3>

            <p>
              Every product is carefully crafted
              by skilled artisans.
            </p>

          </div>

          <div className="feature-card">

            <span>🚚</span>

            <h3>Fast Delivery</h3>

            <p>
              Secure packaging and reliable
              delivery across India.
            </p>

          </div>

          <div className="feature-card">

            <span>🤝</span>

            <h3>Support Artisans</h3>

            <p>
              Help local creators grow their
              businesses and reach customers.
            </p>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="stats-section">

        <div className="stat-box">

          <h2>500+</h2>

          <p>Products</p>

        </div>

        <div className="stat-box">

          <h2>120+</h2>

          <p>Artisans</p>

        </div>

        <div className="stat-box">

          <h2>1500+</h2>

          <p>Orders</p>

        </div>

        <div className="stat-box">

          <h2>4.8★</h2>

          <p>Customer Rating</p>

        </div>

      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">

        <h2>What Customers Say</h2>

        <div className="testimonial-grid">

          <div className="testimonial-card">

            <p>
              "Amazing quality and beautiful craftsmanship.
              Highly recommended!"
            </p>

            <h4>
              ★★★★★
            </h4>

            <span>
              - Aditi Sharma
            </span>

          </div>

          <div className="testimonial-card">

            <p>
              "The products feel unique and authentic.
              Worth every rupee."
            </p>

            <h4>
              ★★★★★
            </h4>

            <span>
              - Rahul Verma
            </span>

          </div>

          <div className="testimonial-card">

            <p>
              "Fast delivery and excellent quality.
              Will definitely buy again."
            </p>

            <h4>
              ★★★★★
            </h4>

            <span>
              - Sneha Reddy
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;