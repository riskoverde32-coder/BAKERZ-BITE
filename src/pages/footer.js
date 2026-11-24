import {
    MapPin,
    Clock,
    ArrowRight
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF
} from "react-icons/fa";
import {useState} from "react";
import "../App.css";
import Gelocation from "../gelocation";

function Footer({ setActivePage }) {

  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">
          <h2>BAKERZ BITE</h2>

          <p>
            Freshly baked happiness, made with love.
            Bringing sweetness and delicious moments
            to your everyday life.
          </p>

          <div className="footer-socials">
            <a href="#instagram" aria-label="Instagram">
              <FaInstagram size={19} />
            </a>

            <a href="#facebook" aria-label="Facebook">
              <FaFacebookF size={19} />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <button onClick={() => setActivePage("Home")}>Home</button>
          <button onClick={() => setActivePage("Menu")}>Menu</button>
          <button onClick={() => setActivePage("Gallery")}>Gallery</button>
          <button onClick={() => setActivePage("About")}>About</button>
          <button onClick={() => setActivePage("Feedback")}>Feedback</button>
          <button onClick={() => setActivePage("Contact")}>Contact</button>
          <button onClick={() => setActivePage("FAQ")}>FAQ</button>
        </div>
        <div className="footer-contact">
          <h3>Visit Us</h3>

          <p>
            <MapPin size={17} />
            Your local bakery
          </p>

          <p>
            <Clock size={17} />
            Monday – Saturday: 7 AM – 8 PM
          </p>

          <p className="footer-hours">
            Sunday: 8 AM – 5 PM
          </p>
        </div>

        <div className="footer-newsletter">
          <h3>A Sweeter Inbox</h3>

          <p>
            Get updates about fresh bakes,
            special offers and bakery news.
          </p>

          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              required
            />

            <button type="submit" aria-label="Subscribe">
              <ArrowRight size={21} />
            </button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Bakerz Bite.
          Made with love.
        </p>

        <p>Freshly baked. Always delicious.</p>
      </div>
      <Gelocation />
    </footer>
  );
}
export default Footer;