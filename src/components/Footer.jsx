import "../styles/footer.css";

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

        <div className="footer-left">

          <h2>
            Artisan Marketplace
          </h2>

          <p>
            Discover unique handmade products
            crafted by talented artisans across India.
          </p>

        </div>

        <div className="footer-links">

          <a href="/">
            Home
          </a>

          <a href="/products">
            Products
          </a>

          <a href="/contact">
            Contact
          </a>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 Artisan Marketplace. All Rights Reserved.

      </div>

    </footer>

  );

}

export default Footer;