
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";


function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="contact-section">

      {/* PAGE HEADING */}
      <div className="contact-heading">
        <span>Happy to serve you!</span>
        <h1>Contact Us</h1>
        <p>
          Have a question or a special request?
          We'd love to hear from you!
        </p>
      </div>

      <div className="contact-container">

        <div className="contact-info">

          <h2>Let's Talk!</h2>

          <p className="contact-intro">
            Whether you're ordering a cake, planning
            an event, or simply saying hello, our team
            is always happy to help.
          </p>

         {/* <div className="contact-item">
            <div className="contact-icon">
              <MapPin />
            </div>
            <div>
              <h3>Our Location</h3>
              <p>Loca</p>
            </div>
          </div>*/}

          <div className="contact-item">
            <div className="contact-icon">
              <Phone />
            </div>
            <div>
              <h3>Phone Number</h3>
              <p>+1 (123) 456-7890</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <Mail />
            </div>
            <div>
              <h3>Email Address</h3>
              <p>BakerzBites@email.com</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <Clock />
            </div>
            <div>
              <h3>Opening Hours</h3>
              <p>Monday - Saturday: 7 AM - 8 PM</p>
              <p>Sunday: 8 AM - 5 PM</p>
            </div>
          </div>

        </div>

        <div className="contact-form-container">

          <h2>Send Us a Message</h2>
          <p>Fill in the form below and get in touch with us.</p>

          <form className="contact-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                placeholder="What is your message about?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Your Message</label>
              <textarea
                id="contact-message"
                rows="5"
                placeholder="Write your message here..."
                required
              />
            </div>

            <button type="submit" className="send-button">
              Send Message <Send size={18} />
            </button>

            {submitted && (
              <p className="form-notice" role="status">
                Your form has been submitted locally.
                Connect a backend or email service to
                receive messages.
              </p>
            )}

          </form>

        </div>

      </div>

    </section>
  );
}

export default Contact;
